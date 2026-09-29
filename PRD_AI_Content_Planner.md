# Product Requirement Document (PRD)
## Proyek: CraftAI Studio — Content OS & Production Pipeline

| Metadata | Detail |
| :--- | :--- |
| **Status** | Disetujui & Diterapkan Penuh (V3 - Hybrid APK & Laptop Ready) |
| **Konsep Desain** | Home Master Table + 5 Dedicated Pipeline Stages + Dual Navigation (Desktop & Mobile APK) |
| **Gaya Visual** | Japanese Minimalist Kawaii & Clean Bento Studio (Ref: *Folder Baru 1000304758 & 1000304566*) |
| **Aplikasi Siap Buka** | `index.html` (Local-First Web App dengan Custom Toast, Custom Modals & LocalStorage Auto-Save) |
| **Tanggal Pembaruan** | 29 September 2026 |

---

## 1. Arsitektur Navigasi Dual-Mode (Laptop & Mobile APK)

Aplikasi dirancang untuk berjalan optimal di dua lingkungan:
1. **Laptop / Desktop:** Navigasi tab kapsul horizontal di bagian atas dengan squircle dropdown dan stage stepper.
2. **Smartphone / Android APK:** **Floating Bottom Navigation Capsule Bar** melayang di bawah layar (`Home`, `Riset`, `Script`, `Audio`, `Review`, `Thumb`) yang memudahkan navigasi satu jempol khas aplikasi mobile native.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  LAYAR LAPTOP / DESKTOP                                                                │
│  [Logo CraftAI]   [Proyek: 1. Turing Test ▾ (Custom)]   [Pipeline Stepper + Konfirmasi]│
│  [Home/Rekap]  [1. Riset & Aset]  [2. Susun Script]  [3. Rekaman]  [4. Review]  [5. Judul]│
└────────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────┐
│  LAYAR HP / ANDROID APK    │
│  [Top: Brand & Dropdown]   │
│  [Stage Stepper Aktif]     │
│  [Konten Dinamis / Tabel]  │
│                            │
│ ╭────────────────────────╮ │
│ │ 🏠   🔍   ✍️   🎙️  🎬  🎨│ │ <- Floating Bottom Capsule Bar
│ ╰────────────────────────╯ │
└────────────────────────────┘
```

---

## 2. Fitur-Fitur Utama Terbaru

### 1. Ikonografi Vektor Premium (Zero Emoji)
- 100% menggunakan ikon vektor SVG kustom (gaya Lucide/Feather, stroke `2.2px`) dengan ujung membulat yang tajam dan seragam di seluruh resolusi layar. Tidak ada lagi emoji atau glif teks yang amatir.
- Komponen dan tombol dibersihkan dari kesalahan visual seperti ikon `+` dobel.

### 2. Penghapusan Data Proyek & Footage (Full Delete Capability)
- **Hapus Proyek Konten:** Dapat dilakukan melalui tabel master di Home Rekap maupun langsung dari custom dropdown popover, dilengkapi dialog konfirmasi kustom.
- **Hapus Footage & Media:** Aset di library media dapat dihapus dengan konfirmasi aman dan otomatis melepaskan referensi footage dari segmen naskah.

### 3. Slot Footage Interaktif pada Naskah Dual-Track (Menu 2)
- Menggantikan kotak teks arahan visual yang pasif dengan **Interactive Footage Slot**:
  - Dropdown pemilih langsung untuk memasang footage dari Menu 1 (Riset & Aset).
  - Kartu chip visual menampilkan format rasio (`16:9`, `9:16`, `1:1`), tipe aset, dan nama file.
  - Tombol cepat **`+ Media Baru`** untuk mengunggah atau mencatat footage baru langsung dari dalam naskah.
  - Textarea tambahan untuk instruksi timing/aksi visual spesifik.

### 4. Sistem Notifikasi Toast & Modal Kustom (Bebas Alert/Prompt Browser)
- **Toast Notifications:** Pop-up pesan melayang di pojok kanan atas dengan animasi halus, ikon status, dan auto-dismiss 3 detik.
- **Custom Modals:** Seluruh interaksi input (tambah proyek, tambah link, tambah catatan, tambah footage, tambah audio, ganti video, konfirmasi hapus) menggunakan modal form squircle berestetika tinggi.

### 5. Data Tables Rapi di Semua Tahapan
- Tabel Rekap Master di Home/Rekap
- Tabel Catatan Riset CRUD & Tabel Library Media Multi-Format
- Tabel Script Video Pendek (Shorts/Reels)
- Tabel Vault Rekaman Suara
- Tabel QC Checklist Kelayakan Upload

### 6. Pemutar Video Riil & Upload File Langsung (Menu 4)
- **Direct File Selection & Drag-and-Drop:** Kreator dapat langsung memilih file video hasil edit (`.mp4`, `.mov`, `.webm`) dari harddisk Laptop atau galeri file HP untuk ditonton langsung di dalam aplikasi studio.
- **Deteksi Metadata Otomatis:** Saat video dimasukkan, sistem otomatis membaca ukuran file (MB), resolusi (misal: `1080p 1920x1080 16:9 Landscape`), serta durasi video (`mm:ss`).
- **Mode Uji Coba Video Demo:** Tombol 1-klik untuk memuat sampel video demo bagi kreator yang ingin menguji player dan checklist QC sebelum merender video final.
- **File Picker Terintegrasi di Modal:** Pengunggahan file lokal juga disematkan pada dialog tambah footage (Menu 1), take audio rekaman (Menu 3), dan thumbnail (Menu 5).

### 7. Tata Letak Mobile HP / APK (Zero Horizontal Scroll & Tanpa Terpotong)
- **Transformasi Kartu Mobile Squircle:** Semua tabel data 4–9 kolom otomatis dikonversi menjadi kartu data mobile vertikal (`.mobile-data-card`) yang nyaman di-scroll satu jempol tanpa perlu digeser ke samping.
- **Single-Column Grid Stacking:** Grid ganda pada Review Video, Packaging/Thumbnail, dan Dual-Track Script otomatis bertransformasi menjadi 1 kolom yang tertata rapi.
- **Navigasi & Filter Kompak:** Stepper tahapan menggunakan label ringkas (`1. Riset`, `2. Script`, `3. Audio`, `4. Edit`, `5. Siap`), subtab naskah dibuat responsif, dan filter media membungkus dalam 2 baris teratur tanpa harus diswipe.
- **Anti-Cutoff & Overflow Guard:** Dikunci dengan `max-width: 100vw`, `overflow-x: hidden !important`, dan padding bawah 84px untuk floating capsule bottom bar, menjamin pengalaman yang presisi dan stabil saat dibungkus ke APK.

