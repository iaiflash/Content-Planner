# CraftAI Studio — Content OS & Production Pipeline

![CraftAI Studio Banner](https://img.shields.io/badge/Platform-Desktop%20%26%20Mobile%20APK-ffe59a?style=for-the-badge&logoColor=18181b)
![License](https://img.shields.io/badge/License-MIT-a9d3ff?style=for-the-badge)
![Cloud](https://img.shields.io/badge/Cloud%20Database-Google%20Sheets%20%26%20Drive-b7e1d1?style=for-the-badge&logo=google-drive&logoColor=18181b)

> Sistem Operasi Produksi Konten Kreator AI & Edukasi Modern dengan Estetika **Japanese Minimalist Bento & Kawaii Design System (Miyama Graphics Style)**.

---

## 🌟 Fitur Utama (6-Stage Pipeline)

1. **Tahap 1: Riset & Aset**
   - CRUD Catatan Rangkuman Temuan Riset & Fakta.
   - Manajemen Tautan / Rujukan Paper (arXiv, LMSYS, Benchmark).
   - Media Library Multi-Format: Video (16:9 / 9:16), Foto/Screenshot, Meme, GIF Animasi, dan Diagram Excalidraw.
   - **Tersinkronisasi langsung ke Google Drive Media Vault.**

2. **Tahap 2: Susun Script / Naskah**
   - Dual-Track View: Naskah Narasi bersanding langsung dengan Slot Footage & Arahan Visual.
   - Subtab Naskah Longform (YouTube) & Shorts/Reels/TikTok.
   - Slot footage terhubung langsung dengan aset riset yang ada di database.
   - Export naskah ke format Markdown & Word Count / Estimasi Durasi otomatis.

3. **Tahap 3: Rekaman Suara (Audio Voiceover)**
   - Manajemen Take Vokal per segmen naskah.
   - Audio recorder & visualizer player terintegrasi.
   - **Upload & simpan master file audio WAV 48kHz langsung ke Google Drive.**

4. **Tahap 4: Review Video & QC Checklist**
   - Video Player Canvas lokal dengan drag & drop video master.
   - Dynamic Quality Control (QC) Checklist interaktif yang dapat disesuaikan per proyek.
   - Status kesiapan platform (YouTube, TikTok, Instagram Reels).

5. **Tahap 5: Packaging (Thumbnail & Judul Multichannel)**
   - Preview visual thumbnail 16:9 (YouTube) & 9:16 (Shorts/Reels).
   - Pemisah tab judul & caption khusus per sosmed (YouTube SEO, TikTok Hook, Instagram Reels).
   - Copy caption & tagar 1-klik.

6. **Tahap 6: Output & Rilis**
   - Master video & voiceover player siap rilis.
   - Tombol download independen: Unduh Video Master, Unduh Voiceover Master WAV, dan Unduh Paket Lengkap.
   - Salin copy posting sosmed siap tayang.

---

## ☁️ Integrasi Cloud: Google Sheets & Google Drive (iaiflash0.0@gmail.com)

Aplikasi ini dilengkapi jembatan cloud **100% Gratis & Tanpa Server Eksternal** menggunakan Google Apps Script:
- **Google Sheets Database**: Menyimpan 8 tabel relasional (`PROYEK_MASTER`, `RISET_CATATAN`, `RISET_LINK`, `FOOTAGE_ASSETS`, `NASKAH_SCRIPT`, `AUDIO_VOICEOVER`, `REVIEW_QC`, `PACKAGING_JUDUL`).
- **Google Drive Media Vault**: Otomatis membuat folder `CraftAI Studio Media Vault (iaiflash)` untuk menampung file video, audio, screenshot, dan thumbnail.

### Cara Memasang Cloud Bridge:
1. Buka [Google Apps Script](https://script.google.com/home/start) dengan akun `iaiflash0.0@gmail.com`.
2. Buat proyek baru dan tempelkan kode dari file [`GoogleAppsScript_Bridge.gs`](./GoogleAppsScript_Bridge.gs).
3. Klik **Deploy** > **New deployment** > pilih jenis **Web app**.
4. Set **Execute as: Me** dan **Who has access: Anyone**.
5. Salin URL Web App yang dihasilkan dan tempelkan di modal **Cloud Sync** pada aplikasi.

---

## 🚀 Menjalankan Aplikasi

Aplikasi ini dibuat murni menggunakan standard web modern (HTML5, Vanilla CSS3, & Modern Vanilla JS).
Cukup buka file `index.html` langsung di browser Chrome / Edge, atau jalankan dengan ekstensi Live Server.

---

## 👤 Identitas Pengembang
- **GitHub:** [@iaiflash](https://github.com/iaiflash)
- **Email:** `iaiflash0.0@gmail.com`
