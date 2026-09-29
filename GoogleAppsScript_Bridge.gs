/**
 * ============================================================================
 * CRAFTAI STUDIO — GOOGLE SHEETS & GOOGLE DRIVE CLOUD BRIDGE
 * Khusus Akun: iaiflash0.0@gmail.com (GitHub: iaiflash)
 * ============================================================================
 * 
 * FUNGSI UTAMA:
 * 1. Database Relasional: Menyimpan semua data proyek, riset, naskah script,
 *    daftar rekaman audio, checklist QC, serta judul sosmed langsung ke GOOGLE SHEETS.
 * 2. Media Vault (Foto/Video/Audio/Thumbnail): Mengunggah dan menyimpan file fisik
 *    (footage video, screenshot foto, audio wav, meme, thumbnail) langsung ke GOOGLE DRIVE.
 * 
 * CARA PASANG / DEPLOY (Hanya 1 Menit!):
 * 1. Buka browser dengan akun Google Anda: iaiflash0.0@gmail.com
 * 2. Kunjungi: https://script.google.com/home/start
 * 3. Klik tombol "New project" (Proyek baru).
 * 4. Beri nama proyek: "CraftAI Studio Cloud Bridge"
 * 5. Hapus kode default, lalu salin dan tempel (PASTE) SELURUH isi file ini.
 * 6. Klik tombol "Deploy" (di pojok kanan atas) -> pilih "New deployment".
 * 7. Pada ikon gear (Select type), pilih "Web app".
 * 8. Konfigurasi:
 *    - Description: "v1 Production Bridge"
 *    - Execute as: "Me (iaiflash0.0@gmail.com)"
 *    - Who has access: "Anyone" (Siapa saja, agar web app bisa POST tanpa login pop-up)
 * 9. Klik "Deploy" -> Berikan izin otorisasi (Authorize access) -> Pilih akun iaiflash0.0@gmail.com.
 * 10. Salin "Web app URL" (akhiran /exec) dan tempelkan ke aplikasi CraftAI Studio di menu Cloud Sync!
 */

const CONFIG = {
  SPREADSHEET_NAME: "CraftAI Studio — Content Planner Database (iaiflash)",
  DRIVE_FOLDER_NAME: "CraftAI Studio Media Vault (iaiflash)",
  TARGET_EMAIL: "iaiflash0.0@gmail.com"
};

// ============================================================================
// HTTP GET HANDLER (Untuk Ping & Health Check)
// ============================================================================
function doGet(e) {
  const result = {
    status: "online",
    service: "CraftAI Studio Cloud Bridge",
    targetAccount: CONFIG.TARGET_EMAIL,
    timestamp: new Date().toISOString(),
    message: "Bridge Google Sheets & Google Drive aktif dan siap menerima data!"
  };
  return createJsonResponse(result);
}

// ============================================================================
// HTTP POST HANDLER (Sync Database & Upload Media)
// ============================================================================
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const action = payload.action || 'syncDatabase';

    // 1. Action: PING
    if (action === 'ping') {
      return createJsonResponse({
        status: "success",
        account: CONFIG.TARGET_EMAIL,
        message: "Koneksi berhasil terhubung dengan akun iaiflash0.0@gmail.com!"
      });
    }

    // 2. Action: SYNC DATABASE TO GOOGLE SHEETS
    if (action === 'syncDatabase') {
      const projects = payload.projects || {};
      const syncResult = syncProjectsToGoogleSheets(projects);
      return createJsonResponse({
        status: "success",
        action: "syncDatabase",
        account: CONFIG.TARGET_EMAIL,
        sheetUrl: syncResult.sheetUrl,
        sheetId: syncResult.sheetId,
        syncedCount: syncResult.count,
        timestamp: new Date().toISOString(),
        message: "Data seluruh proyek berhasil disimpan ke Google Sheets!"
      });
    }

    // 3. Action: UPLOAD MEDIA FILE TO GOOGLE DRIVE
    if (action === 'uploadMedia') {
      const fileName = payload.fileName || ("Asset_" + Date.now());
      const mimeType = payload.mimeType || "application/octet-stream";
      const base64Data = payload.base64Data || "";
      const category = payload.category || "Footage";
      const projectTitle = payload.projectTitle || "Umum";

      if (!base64Data) {
        return createJsonResponse({ status: "error", message: "Data file base64 kosong!" });
      }

      const uploadResult = uploadFileToGoogleDrive(fileName, mimeType, base64Data, category, projectTitle);
      return createJsonResponse({
        status: "success",
        action: "uploadMedia",
        account: CONFIG.TARGET_EMAIL,
        fileId: uploadResult.fileId,
        fileName: uploadResult.fileName,
        fileUrl: uploadResult.fileUrl,
        downloadUrl: uploadResult.downloadUrl,
        folderUrl: uploadResult.folderUrl,
        message: `File ${fileName} berhasil diunggah ke Google Drive (${CONFIG.DRIVE_FOLDER_NAME})!`
      });
    }

    // 4. Action: LOAD DATABASE (Tarik data dari Google Sheets)
    if (action === 'loadDatabase') {
      const loadedData = loadProjectsFromGoogleSheets();
      return createJsonResponse({
        status: "success",
        action: "loadDatabase",
        account: CONFIG.TARGET_EMAIL,
        data: loadedData
      });
    }

    return createJsonResponse({ status: "error", message: "Aksi tidak dikenal: " + action });

  } catch (error) {
    return createJsonResponse({
      status: "error",
      account: CONFIG.TARGET_EMAIL,
      message: error.toString(),
      stack: error.stack
    });
  }
}

// ============================================================================
// HELPER: SYNC SEMUA TAB KE GOOGLE SHEETS
// ============================================================================
function syncProjectsToGoogleSheets(projects) {
  const ss = getOrCreateSpreadsheet();
  
  // Format tab 1: PROYEK_MASTER
  syncMasterSheet(ss, projects);

  // Format tab 2: RISET_CATATAN
  syncNotesSheet(ss, projects);

  // Format tab 3: RISET_LINK
  syncLinksSheet(ss, projects);

  // Format tab 4: FOOTAGE_ASSETS
  syncAssetsSheet(ss, projects);

  // Format tab 5: NASKAH_SCRIPT
  syncScriptsSheet(ss, projects);

  // Format tab 6: AUDIO_VOICEOVER
  syncAudioSheet(ss, projects);

  // Format tab 7: REVIEW_QC
  syncQcSheet(ss, projects);

  // Format tab 8: PACKAGING_JUDUL
  syncPackagingSheet(ss, projects);

  const count = Object.keys(projects).length;
  return { sheetUrl: ss.getUrl(), sheetId: ss.getId(), count: count };
}

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty("CRAFTAI_SHEET_ID");
  
  if (savedId) {
    try {
      return SpreadsheetApp.openById(savedId);
    } catch (e) {
      console.warn("Sheet lama tidak ditemukan, membuat baru...");
    }
  }

  // Cek apakah sudah ada file di Google Drive dengan nama yang sama
  const files = DriveApp.getFilesByName(CONFIG.SPREADSHEET_NAME);
  if (files.hasNext()) {
    const file = files.next();
    props.setProperty("CRAFTAI_SHEET_ID", file.getId());
    return SpreadsheetApp.openById(file.getId());
  }

  // Buat spreadsheet baru di root Drive pengguna iaiflash0.0@gmail.com
  const newSs = SpreadsheetApp.create(CONFIG.SPREADSHEET_NAME);
  props.setProperty("CRAFTAI_SHEET_ID", newSs.getId());
  return newSs;
}

// Tab 1: PROYEK_MASTER
function syncMasterSheet(ss, projects) {
  let sheet = ss.getSheetByName("PROYEK_MASTER");
  if (!sheet) {
    sheet = ss.insertSheet("PROYEK_MASTER");
  }
  sheet.clear();

  const headers = [["ID", "Judul Konten / Proyek", "Pilar Konten", "Tahapan Pipeline", "Progress (%)", "Target Durasi", "Status Terakhir", "Waktu Update"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    rows.push([
      p.id || id,
      p.title || "Tanpa Judul",
      p.pillar || "-",
      p.stage || "Riset",
      (p.progress || 0) + "%",
      p.targetDuration || "-",
      (p.stage === 'Output' ? 'Siap Rilis' : 'Dalam Pengerjaan'),
      new Date().toLocaleString("id-ID")
    ]);
  }

  formatSheetTable(sheet, headers, rows, "#18181b", "#ffffff");
}

// Tab 2: RISET_CATATAN
function syncNotesSheet(ss, projects) {
  let sheet = ss.getSheetByName("RISET_CATATAN");
  if (!sheet) sheet = ss.insertSheet("RISET_CATATAN");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Topik Temuan", "Isi Rangkuman Data & Fakta", "Waktu Ditambahkan"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const notes = (p.research && p.research.notes) ? p.research.notes : [];
    notes.forEach(n => {
      rows.push([
        p.id || id,
        p.title,
        n.title || "-",
        n.content || "-",
        new Date().toLocaleDateString("id-ID")
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#ff5b79", "#ffffff");
}

// Tab 3: RISET_LINK
function syncLinksSheet(ss, projects) {
  let sheet = ss.getSheetByName("RISET_LINK");
  if (!sheet) sheet = ss.insertSheet("RISET_LINK");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Nama Rujukan", "URL Tautan", "Kategori"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const links = (p.research && p.research.links) ? p.research.links : [];
    links.forEach(l => {
      rows.push([
        p.id || id,
        p.title,
        l.title || "-",
        l.url || "-",
        l.type || "Referensi"
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#0ea5e9", "#ffffff");
}

// Tab 4: FOOTAGE_ASSETS
function syncAssetsSheet(ss, projects) {
  let sheet = ss.getSheetByName("FOOTAGE_ASSETS");
  if (!sheet) sheet = ss.insertSheet("FOOTAGE_ASSETS");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Nama File Aset", "Tipe Format", "Rasio Visual", "Arahan Penggunaan", "Google Drive URL", "File ID Drive"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const assets = (p.research && p.research.assets) ? p.research.assets : [];
    assets.forEach(a => {
      rows.push([
        p.id || id,
        p.title,
        a.name || "-",
        (a.type || "video").toUpperCase(),
        a.format || "16:9",
        a.desc || "-",
        a.driveUrl || "-",
        a.driveId || "-"
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#10b981", "#ffffff");
}

// Tab 5: NASKAH_SCRIPT
function syncScriptsSheet(ss, projects) {
  let sheet = ss.getSheetByName("NASKAH_SCRIPT");
  if (!sheet) sheet = ss.insertSheet("NASKAH_SCRIPT");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Format", "Segmen / Hook", "Naskah Narasi Lengkap", "Arahan Visual / B-Roll", "Aset Terhubung"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const scripts = p.scripts || {};
    
    // Longform
    if (scripts.longform) {
      scripts.longform.forEach(s => {
        rows.push([
          p.id || id,
          p.title,
          "Longform Video",
          s.seg || "-",
          s.narr || "-",
          s.cue || "-",
          s.attachedAssetId || "-"
        ]);
      });
    }

    // Shorts / TikTok
    if (scripts.shorts) {
      scripts.shorts.forEach(sh => {
        rows.push([
          p.id || id,
          p.title,
          sh.platform || "Shorts/TikTok",
          sh.title || "-",
          sh.text || "-",
          "Vertikal Hook Cepat",
          "-"
        ]);
      });
    }
  }

  formatSheetTable(sheet, headers, rows, "#8b5cf6", "#ffffff");
}

// Tab 6: AUDIO_VOICEOVER
function syncAudioSheet(ss, projects) {
  let sheet = ss.getSheetByName("AUDIO_VOICEOVER");
  if (!sheet) sheet = ss.insertSheet("AUDIO_VOICEOVER");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Bagian Naskah", "Nama File Audio", "Durasi", "Kualitas", "Status Approval", "Google Drive URL"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const takes = p.audioTakes || [];
    takes.forEach(t => {
      rows.push([
        p.id || id,
        p.title,
        t.part || "-",
        t.file || "-",
        t.duration || "-",
        t.quality || "48kHz jernih",
        (t.status || "approved").toUpperCase(),
        t.driveUrl || "-"
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#f59e0b", "#ffffff");
}

// Tab 7: REVIEW_QC
function syncQcSheet(ss, projects) {
  let sheet = ss.getSheetByName("REVIEW_QC");
  if (!sheet) sheet = ss.insertSheet("REVIEW_QC");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "File Video Master", "Resolusi Video", "Ukuran File", "Item Checklist QC", "Status Lulus QC"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const r = p.review || {};
    const qc = r.qcList || [];
    qc.forEach(q => {
      rows.push([
        p.id || id,
        p.title,
        r.finalVideoFile || "-",
        r.resolution || "1080p 60fps",
        r.fileSize || "-",
        q.text || "-",
        q.checked ? "LULUS (CHECKED)" : "BELUM LULUS"
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#18181b", "#ffffff");
}

// Tab 8: PACKAGING_JUDUL
function syncPackagingSheet(ss, projects) {
  let sheet = ss.getSheetByName("PACKAGING_JUDUL");
  if (!sheet) sheet = ss.insertSheet("PACKAGING_JUDUL");
  sheet.clear();

  const headers = [["ID Proyek", "Judul Proyek", "Platform Sosmed", "Judul Utama Terpilih", "Opsi Judul Lainnya", "Caption & Hashtag Lengkap", "File Thumbnail"]];
  const rows = [];

  for (const id in projects) {
    const p = projects[id];
    const pack = p.packaging || {};
    const titles = pack.titles || {};
    const thumb = pack.thumbnailFile || "-";

    ['youtube', 'tiktok', 'reels'].forEach(plat => {
      const platData = titles[plat] || {};
      const mainTitle = platData.main || p.title;
      const opts = (platData.options || []).join(" | ");
      const cap = platData.caption || (p.scripts && p.scripts.socialCaptions && p.scripts.socialCaptions[plat]) || "-";

      rows.push([
        p.id || id,
        p.title,
        plat.toUpperCase(),
        mainTitle,
        opts,
        cap,
        thumb
      ]);
    });
  }

  formatSheetTable(sheet, headers, rows, "#ff5b79", "#ffffff");
}

// FORMAT TABEL SPREADSHEET CANTIK & PROFESIONAL
function formatSheetTable(sheet, headers, rows, headerBg, headerColor) {
  sheet.getRange(1, 1, 1, headers[0].length).setValues(headers)
    .setBackground(headerBg)
    .setFontColor(headerColor)
    .setFontWeight("bold")
    .setFontFamily("Plus Jakarta Sans")
    .setFontSize(10)
    .setHorizontalAlignment("center");

  sheet.setFrozenRows(1);

  if (rows.length > 0) {
    const dataRange = sheet.getRange(2, 1, rows.length, headers[0].length);
    dataRange.setValues(rows)
      .setFontFamily("Plus Jakarta Sans")
      .setFontSize(9.5)
      .setVerticalAlignment("middle");
    
    // Warna zebra baris selang-seling halus
    for (let r = 2; r <= rows.length + 1; r++) {
      if (r % 2 === 0) {
        sheet.getRange(r, 1, 1, headers[0].length).setBackground("#fcfbf9");
      }
    }
  }

  // Auto resize lebar kolom agar rapi
  for (let c = 1; c <= headers[0].length; c++) {
    sheet.autoResizeColumn(c);
  }
}

// ============================================================================
// HELPER: UPLOAD MEDIA FILE KE GOOGLE DRIVE
// ============================================================================
function uploadFileToGoogleDrive(fileName, mimeType, base64Data, category, projectTitle) {
  const folder = getOrCreateMediaVaultFolder();
  
  // Clean base64 header jika ada (misal: "data:video/mp4;base64,....")
  let cleanBase64 = base64Data;
  if (cleanBase64.indexOf("base64,") !== -1) {
    cleanBase64 = cleanBase64.split("base64,")[1];
  }

  const decodedBytes = Utilities.base64Decode(cleanBase64);
  const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

  const file = folder.createFile(blob);
  
  // Set sharing agar file bisa diakses/diputar langsung
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (e) {
    console.warn("Set sharing warning:", e);
  }

  // Catat juga ke sheet FOOTAGE_ASSETS jika file adalah footage/media
  try {
    const ss = getOrCreateSpreadsheet();
    let sheet = ss.getSheetByName("MEDIA_VAULT_LOG");
    if (!sheet) {
      sheet = ss.insertSheet("MEDIA_VAULT_LOG");
      sheet.appendRow(["Timestamp", "Nama File", "Kategori", "Proyek", "Google Drive View Link", "Direct Download Link", "File ID"]);
      sheet.getRange(1, 1, 1, 7).setBackground("#18181b").setFontColor("#ffffff").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    sheet.appendRow([
      new Date().toLocaleString("id-ID"),
      fileName,
      category,
      projectTitle,
      file.getUrl(),
      file.getDownloadUrl(),
      file.getId()
    ]);
  } catch (err) {
    console.warn("Log ke spreadsheet warning:", err);
  }

  return {
    fileId: file.getId(),
    fileName: fileName,
    fileUrl: file.getUrl(),
    downloadUrl: file.getDownloadUrl(),
    folderUrl: folder.getUrl()
  };
}

function getOrCreateMediaVaultFolder() {
  const folders = DriveApp.getFoldersByName(CONFIG.DRIVE_FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(CONFIG.DRIVE_FOLDER_NAME);
}

// ============================================================================
// HELPER: RESPONSE JSON DENGAN CORS AMAN
// ============================================================================
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
