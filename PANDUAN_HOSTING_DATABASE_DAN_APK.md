# 📘 Panduan Lengkap: Hosting, Database, Perbaikan HP & Pembuatan APK
**CraftAI Studio — Content OS & Production Pipeline**  
*Akun GitHub: `iaiflash` | Email: `iaiflash0.0@gmail.com`*

---

## 🎨 1. Audit Visual & Revisi Icon Premium SVG

Semua elemen visual, badge, dan tombol yang sebelumnya menggunakan emoji atau karakter unicode mentah telah direvisi secara menyeluruh menjadi **SVG Vector Premium (gaya Lucide)** yang tajam di semua resolusi layar:

| Komponen | Status Sebelum | Revisi SVG Premium | Lokasi |
| :--- | :--- | :--- | :--- |
| **Salin Panduan Edit** | Teks `📋 Salin...` | Inline SVG Clipboard + Clean Text | Menu Script (Naskah) |
| **Catat Revisi Detik Ini** | Teks `⏱️ Catat...` | SVG Lucide Clock Circle | Menu Review Video |
| **Tanda Take Utama Edit** | Emoji `⭐ TAKE UTAMA` | SVG Gold Star Fill + Amber Badge | Menu Rekaman Suara |
| **Pilihan Take Utama** | Teks `★ Utama` / `☆ Pilih` | SVG Vector Star dinamis (Fill on active) | Tabel Audio & Kartu Mobile |
| **Durasi & Kualitas Audio** | Emoji `⏱️` & `🎚️` | SVG Clock + SVG Equalizer Sliders | Kartu Mobile Audio |
| **Tombol Lompat Detik** | Karakter `▶` | SVG Clean Play Polygon | Daftar Catatan Revisi |
| **Banner Output Final** | Emoji `✨ TAHAP 6` | SVG 4-Point Golden Sparkle Star | Menu Output & Rilis |
| **Tombol Unduh Paket** | Karakter `↓` | SVG Lucide Arrow Down Vector Badge | Tombol Download Master |
| **Modal Catat Revisi** | Emoji header `⏱️` | Lingkaran Coral + SVG Clock 20px | Dialog Catat Revisi |
| **Modal Panduan Edit** | Emoji header `📋` | Lingkaran Mint + SVG Clipboard 20px | Dialog CapCut/Premiere |
| **Modal Cloud Sync** | Emoji `📋` & `⚡` | SVG Clipboard + SVG Zap Energy | Dialog Cloud Sync |
| **Floating Quickbar** | Emoji di label tombol | Teks bersih + SVG Dinamis 1-Jempol | Kapsul Mengambang Bawah |

---

## 📱 2. Perbaikan Tampilan HP (Mobile Layout Optimization)

Tampilan HP dioptimalkan secara presisi untuk kenyamanan penggunaan satu jempol:

1. **Pemisahan Kapsul Mengambang (Zero Overlap):**
   - Sebelumnya: `#floatingQuickBar` dan `.mobile-bottom-nav` saling bertumpuk di bagian bawah layar.
   - **Solusi Baru:** `.mobile-bottom-nav` berada di `bottom: 10px`, sedangkan `.floating-quickbar` ditempatkan tepat di atasnya pada `bottom: 70px`. Kedua navigasi kini terlihat jelas, tidak bertabrakan, dan mudah dijangkau dengan jempol.
2. **Padding Bawah yang Lega (`padding-bottom: 148px !important`):**
   - Konten paling bawah (tabel, tombol simpan, checklist QC) tidak akan pernah tertutup oleh bilah navigasi mengambang saat di-scroll sampai ujung.
3. **Pencegahan Layar Loncat / Auto-Zoom:**
   - Semua input form, dropdown, dan textarea di HP diatur berukuran minimal `16px`. Ini mencegah browser Chrome dan Safari melakukan zoom-in otomatis yang biasanya merusak proporsi tata letak.
4. **Teleprompter Responsif di HP:**
   - Ketinggian teleprompter di HP dibatasi maksimal `175px` dengan scroll vertikal halus dan kontrol ukuran font (`A-` / `A+`).

---

## 🗄️ 3. Arsitektur Database 3 Tingkat

Aplikasi ini kini dilengkapi dengan arsitektur database berlapis:

```
┌─────────────────────────────────────────────────────────────┐
│                      CRAFTAI STUDIO                         │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
       [ Tingkat 1: Client ]          [ Tingkat 2: Server ]
       • IndexedDB (Unlimited)        • server.js (Node.js)
       • LocalStorage Fallback        • REST API (/api/projects)
       • Backup / Restore (.json)     • database.json / SQLite
               │                              │
               └──────────────┬───────────────┘
                              │
                    [ Tingkat 3: Cloud ]
                    • Google Sheets (8 Tab)
                    • Google Drive Media Vault
                    • iaiflash0.0@gmail.com
```

### A. Database Lokal Browser (IndexedDB)
- **Kapasitas:** Ratusan Megabyte (tanpa batasan 5MB kuota `localStorage`).
- **Fitur:** Otomatis menyimpan setiap kali Anda mengetik naskah, menambah riset, atau mencatat revisi video.
- **Backup & Restore:** Buka tombol **Cloud Sync** di pojok kanan atas, lalu klik:
  - **Backup DB (.json):** Mengunduh salinan lengkap database dalam format JSON.
  - **Restore DB (.json):** Memulihkan data dari file cadangan kapan saja.

### B. Database Server Lokal / VPS (`server.js`)
File [server.js](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/server.js) adalah backend REST API mandiri tanpa ketergantungan library luar (*zero dependencies*):
- **Cara Menjalankan:**
  ```bash
  node server.js
  # atau
  npm start
  ```
- **Akses:** Buka browser di `http://localhost:3000`.
- **Daftar Endpoint REST API:**
  - `GET /api/health` — Status server dan jumlah proyek.
  - `GET /api/projects` — Mengambil seluruh proyek konten.
  - `POST /api/projects` — Menambah atau memperbarui proyek.
  - `DELETE /api/projects/:id` — Menghapus proyek berdasarkan ID.
  - `POST /api/sync` — Sinkronisasi dua arah dari browser ke server.
  - `GET /api/export/capcut/:id` — Mengunduh dokumen panduan edit CapCut per proyek.

### C. Database Cloud Google Sheets & Drive
- Konfigurasi telah disiapkan pada file [GoogleAppsScript_Bridge.gs](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/GoogleAppsScript_Bridge.gs).
- Tersambung khusus dengan akun email Anda: `iaiflash0.0@gmail.com`.

---

## 🌐 4. Panduan Tempat Hosting (Live Online & Gratis)

### Opsi 1: GitHub Pages (Paling Direkomendasikan & Otomatis)
Workflow GitHub Actions telah dibuat di [.github/workflows/deploy.yml](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/.github/workflows/deploy.yml):
1. Jalankan [push_to_github.bat](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/push_to_github.bat) untuk push kode terbaru ke repository `https://github.com/iaiflash/Content-Planner.git`.
2. Buka repository Anda di GitHub -> Masuk ke tab **Settings** -> Pilih menu **Pages** di bilah sisi kiri.
3. Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.
4. Selesai! Web aplikasi Anda akan langsung aktif online di alamat:
   👉 **`https://iaiflash.github.io/Content-Planner/`**

### Opsi 2: Vercel (1-Klik Deploy)
File konfigurasi [vercel.json](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/vercel.json) telah disediakan:
1. Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub `iaiflash`.
2. Klik **Add New Project** -> Pilih repository `Content-Planner`.
3. Klik **Deploy**. Web aplikasi akan langsung online dengan domain gratis seperti `craftai-studio.vercel.app`.

### Opsi 3: Netlify
File konfigurasi [netlify.toml](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/netlify.toml) telah disediakan untuk deploy instan di Netlify.

---

## 📲 5. Panduan Pembuatan & Pemasangan APK Android

Anda memiliki 2 metode untuk memasang aplikasi ini di ponsel Android:

### Metode A: Install Instan Standalone PWA (Sangat Mudah — Tanpa Perlu Kompilasi)
Aplikasi ini sudah berstandar **Progressive Web App (PWA)** dengan [manifest.json](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/manifest.json) dan [sw.js](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/sw.js):
1. Buka link web hosting Anda (misal `https://iaiflash.github.io/Content-Planner/`) menggunakan browser **Google Chrome** di ponsel Android.
2. Ketuk ikon titik tiga (⋮) di kanan atas browser Chrome.
3. Pilih opsi **"Install aplikasi"** (atau **"Tambahkan ke Layar Utama"**).
4. Ikon CraftAI Studio akan langsung muncul di menu aplikasi HP Anda, dapat dibuka secara fullscreen tanpa bilah browser, dan dapat digunakan secara **offline**.

### Metode B: Build Native Android APK via Android Studio
Proyek wrapper Android lengkap telah dibuat di folder [android/](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/android):
1. Jalankan skrip [build_apk.bat](file:///c:/Users/Asep/OneDrive/Dokumen/App%20Craft/Content%20Planner/build_apk.bat) di folder workspace Anda. Skrip ini akan menyalin seluruh aset web offline ke dalam folder `android/app/src/main/assets/`.
2. Buka **Android Studio** di laptop/PC Anda.
3. Pilih menu **File > Open** lalu arahkan ke folder:
   `c:\Users\Asep\OneDrive\Dokumen\App Craft\Content Planner\android`
4. Tunggu beberapa saat hingga Android Studio selesai membaca Gradle.
5. Klik menu atas: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
6. File APK yang dihasilkan akan berada di:
   `android/app/build/outputs/apk/debug/app-debug.apk`
7. Kirim file APK tersebut ke HP Anda melalui WhatsApp/Telegram/Kabel USB, lalu install seperti aplikasi Android biasa!
