@echo off
chcp 65001 >nul
echo ======================================================================
echo   CraftAI Studio - Push to GitHub (Account: iaiflash / iaiflash0.0@gmail.com)
echo ======================================================================

echo.
echo [1/4] Mengatur Identitas Git Lokal (iaiflash)...
git config user.name "iaiflash"
git config user.email "iaiflash0.0@gmail.com"

echo.
echo [2/4] Menambahkan files ke staging...
git add .
git commit -m "fix(android): add launcher icon resources and fix pages workflow" >nul 2>&1

echo.
echo [3/4] Mengatur branch ke main...
git branch -M main

echo.
echo [4/4] Mengatur remote ke akun iaiflash...
git remote remove origin >nul 2>&1
git remote add origin https://iaiflash@github.com/iaiflash/Content-Planner.git

echo.
echo Mendorong ke https://github.com/iaiflash/Content-Planner.git ...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ======================================================================
    echo PERHATIAN: Push ditolak (Error 403 / Permission Denied)!
    echo.
    echo PENYEBAB:
    echo Laptop Anda masih menyimpan akun GitHub lama (appcraft1) di
    echo Windows Credential Manager, sehingga ditolak saat push ke repo iaiflash.
    echo.
    echo CARA MENGATASI (PILIH SALAH SATU):
    echo.
    echo CARA 1 (PALING MUDAH - Hapus kredensial lama):
    echo 1. Tekan tombol Windows di keyboard, ketik: Credential Manager (atau Pengelola Kredensial)
    echo 2. Klik "Windows Credentials"
    echo 3. Di bagian "Generic Credentials", cari: git:https://github.com
    echo 4. Klik "Remove" (Hapus)
    echo 5. Jalankan script ini lagi, lalu klik "Sign in with your browser" untuk login ke iaiflash!
    echo.
    echo CARA 2 (Undang appcraft1 jadi Collaborator):
    echo 1. Buka browser: https://github.com/iaiflash/Content-Planner/settings/access
    echo 2. Klik "Add people" -> Undang username: appcraft1
    echo 3. Jalankan script ini lagi!
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo 🎉 BERHASIL! Repositori berhasil dipush ke GitHub iaiflash:
    echo https://github.com/iaiflash/Content-Planner
    echo.
    echo GitHub Actions sekarang sedang otomatis mem-build file APK Android
    echo dan men-deploy web ke GitHub Pages!
    echo ======================================================================
)

pause
