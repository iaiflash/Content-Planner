# UI/UX Design System & Component Guidelines
## Proyek: CraftAI Studio — Content OS & Production Pipeline

| Token / Elemen | Spesifikasi & Nilai | Catatan & Rujukan (Folder Baru) |
| :--- | :--- | :--- |
| **Gaya Utama** | Japanese Minimalist Kawaii & Clean Bento Studio | Ref: *1000304758* (Design System Board), *1000304566* (Mobile APK), *1000304560* (Game Story Bento) |
| **Latar Belakang (Canvas)** | `#f6f8fb` (Warm Porcelain) | Bersih, sejuk di mata, kontras tinggi |
| **Permukaan Kartu** | `#ffffff` (Pure White) + Border `#eaedf2` | Radius 20px–28px, Shadow `0 4px 16px rgba(15,23,42,0.03)` |
| **Warna Utama (Primary)** | `#4f46e5` (Royal Indigo) | Elegan, berwibawa, modern tech |
| **Aksen Aktif (Highlight)** | `#ff5b79` (Sweet Vibrant Coral) | Cute, playful, memikat perhatian pada tombol aktif |
| **Pilar Fondasi** | `#10b981` (Fresh Mint) / Bg `#ecfdf5` | Hijau segar untuk konten fundamental |
| **Pilar Konsep** | `#8b5cf6` (Electric Violet) / Bg `#f5f3ff` | Ungu elegan untuk konsep & teori |
| **Pilar Update** | `#f59e0b` (Sunshine Amber) / Bg `#fffbeb` | Kuning hangat untuk berita & update |
| **Tipografi Heading** | Google Fonts **Outfit** (Weight 600, 700, 800) | Modern, squircle, ramah |
| **Tipografi Body** | Google Fonts **Plus Jakarta Sans** (400, 500, 600, 700) | Sangat terbaca di desktop & HP |
| **Tipografi Angka/Kode**| Google Fonts **JetBrains Mono** (500, 700) | Metrik waktu, persentase, kode |
| **Ikonografi** | 100% Crisp Vector SVG (Lucide/Feather, stroke 2.2px) | Zero emoji, tajam di semua layar, bebas double plus |
| **Navigasi Laptop** | Top Pill Bar + Custom Squircle Dropdown | Navigasi atas yang luas dan responsif |
| **Navigasi HP (APK)** | Floating Bottom Navigation Capsule Bar | Navigasi melayang di bawah layar ramah satu jempol |
| **Slot Footage Naskah** | Interactive Asset Selector + Quick Upload | Pasang footage dari Riset langsung ke segmen naskah |
| **Sistem Notifikasi** | Toast Melayang + Modal Form Kustom | Bebas alert(), prompt(), dan confirm() bawaan browser |
| **Mobile Card View (HP/APK)** | `.mobile-data-card` + `.mobile-only-view` | Mengganti tabel 9-kolom menjadi kartu squircle tanpa geser kanan-kiri |
| **Grid Responsif Mobile** | Stacking 1-Kolom (`.review-split-grid`, `.packaging-split-grid`) | Pratinjau video, checklist QC, thumbnail & judul tersusun rapi vertikal |
| **Stepper & Tab Kompak** | Label responsif (`.step-label-full` vs `.step-label-short`) | Pipeline 5 tahap & tab sub-script muat 100% di layar HP tanpa kepotong |
| **Zero Overflow Control** | `overflow-x: hidden !important` & `width: 100vw` | Layar terkunci presisi, bebas goyang/wobble horizontal |
