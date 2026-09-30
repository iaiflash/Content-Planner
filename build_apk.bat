@echo off
chcp 65001 >nul
echo =======================================================================
echo          📱 CRAFTAI STUDIO — ANDROID APK BUILDER
echo =======================================================================
echo.

echo [1/3] Menyiapkan direktori aset offline Android...
if not exist "android\app\src\main\assets" (
    mkdir "android\app\src\main\assets"
)

echo [2/3] Menyalin file aplikasi ke dalam paket APK Android...
copy /Y "index.html" "android\app\src\main\assets\index.html" >nul
copy /Y "manifest.json" "android\app\src\main\assets\manifest.json" >nul
copy /Y "sw.js" "android\app\src\main\assets\sw.js" >nul
copy /Y "icon.svg" "android\app\src\main\assets\icon.svg" >nul
if exist "GoogleAppsScript_Bridge.gs" (
    copy /Y "GoogleAppsScript_Bridge.gs" "android\app\src\main\assets\GoogleAppsScript_Bridge.gs" >nul
)
echo      ✓ Aset web berhasil dikemas ke dalam folder assets Android.

echo.
echo [3/3] Memeriksa compiler Gradle / Android SDK...

where gradle >nul 2>nul
if %errorlevel% equ 0 (
    echo      ✓ Gradle terdeteksi pada sistem. Memulai kompilasi APK...
    cd android
    call gradle assembleDebug
    cd ..
    if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
        echo.
        echo =======================================================================
        echo  🎉 SUKSES! File APK telah selesai dibuat:
        echo  lokasi: android\app\build\outputs\apk\debug\app-debug.apk
        echo =======================================================================
        pause
        exit /b 0
    )
)

echo.
echo =======================================================================
echo  CARA MENGHASILKAN APK DENGAN MUDAH:
echo =======================================================================
echo.
echo  PILIHAN 1: INSTALL LANGSUNG (PWA STANDALONE - TANPA KOMPILASI)
echo  1. Buka file index.html di Google Chrome HP Android Anda (atau lewat link hosting).
echo  2. Klik titik tiga di kanan atas Chrome -> Pilih "Tambahkan ke Layar Utama"
echo     atau klik "Install Aplikasi".
echo  3. Aplikasi CraftAI Studio langsung terpasang di HP seperti APK asli!
echo.
echo  PILIHAN 2: BUILD APK VIA ANDROID STUDIO
echo  1. Buka Android Studio di Laptop Anda.
echo  2. Pilih "Open" -> Arahkan ke folder:
echo     "%~dp0android"
echo  3. Tunggu sinkronisasi Gradle selesai (otomatis).
echo  4. Klik menu: Build -> Build Bundle(s) / APK(s) -> Build APK(s)
echo  5. File APK siap dikirim dan diinstall di semua HP Android!
echo =======================================================================
echo.
pause
