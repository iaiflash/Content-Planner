@echo off
echo ======================================================================
echo   CraftAI Studio - Push to GitHub (Account: iaiflash / iaiflash0.0@gmail.com)
echo ======================================================================

echo.
echo [1/5] Inisialisasi Git Lokal...
git init
git config user.name "iaiflash"
git config user.email "iaiflash0.0@gmail.com"

echo.
echo [2/5] Menambahkan files ke staging...
git add .

echo.
echo [3/5] Melakukan commit...
git commit -m "feat: Rasio 3 Pilar popup, Brand Vault, auto aspect ratio, notification center, Firebase sync, and cloud APK build"

echo.
echo [4/5] Mengatur branch ke main...
git branch -M main

echo.
echo [5/5] Menghubungkan remote dan push ke GitHub...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/iaiflash/Content-Planner.git

echo Mendorong ke https://github.com/iaiflash/Content-Planner.git ...
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ======================================================================
    echo PERHATIAN: Push gagal atau repositori belum dibuat di GitHub!
    echo.
    echo Silakan pastikan:
    echo 1. Anda sudah membuat repositori kosong di: https://github.com/new
    echo    Beri nama Repository name: Content-Planner
    echo 2. Pilih Public atau Private, lalu klik "Create repository"
    echo 3. Jalankan kembali script ini (push_to_github.bat)!
    echo ======================================================================
) else (
    echo.
    echo ======================================================================
    echo BERHASIL! Repositori berhasil dipush ke GitHub iaiflash:
    echo https://github.com/iaiflash/Content-Planner
    echo ======================================================================
)

pause
