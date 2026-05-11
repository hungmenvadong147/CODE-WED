@echo off
echo ========================================
echo Push Code to GitHub
echo Repository: https://github.com/hungmenvadong147/CODE-WED.git
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git chua duoc cai dat!
    echo Vui long tai Git tai: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/7] Khoi tao Git repository...
git init
if errorlevel 1 (
    echo [ERROR] Khoi tao Git that bai!
    pause
    exit /b 1
)

echo.
echo [2/7] Them tat ca files vao staging...
git add .
if errorlevel 1 (
    echo [ERROR] Git add that bai!
    pause
    exit /b 1
)

echo.
echo [3/7] Tao commit dau tien...
git commit -m "first commit: Personal Learning Website with TypeScript"
if errorlevel 1 (
    echo [WARNING] Commit that bai hoac khong co thay doi
)

echo.
echo [4/7] Doi ten branch thanh main...
git branch -M main
if errorlevel 1 (
    echo [ERROR] Doi ten branch that bai!
    pause
    exit /b 1
)

echo.
echo [5/7] Them remote repository...
git remote add origin https://github.com/hungmenvadong147/CODE-WED.git
if errorlevel 1 (
    echo [WARNING] Remote da ton tai, bo qua...
    git remote set-url origin https://github.com/hungmenvadong147/CODE-WED.git
)

echo.
echo [6/7] Cau hinh user...
git config user.name "hungmenvadong147"
git config user.email "huynhnhathunghhcl@gmail.com"

echo.
echo [7/7] Push code len GitHub...
echo.
echo Luu y: Ban co the can nhap username va password (hoac Personal Access Token)
echo.
git push -u origin main
if errorlevel 1 (
    echo.
    echo [ERROR] Push that bai!
    echo.
    echo Cac nguyen nhan co the:
    echo 1. Repository da co noi dung - Thu: git push -u origin main --force
    echo 2. Chua xac thuc - Can Personal Access Token
    echo 3. Khong co quyen truy cap repository
    echo.
    echo Xem huong dan chi tiet trong file GIT_SETUP.md
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Push code thanh cong!
echo ========================================
echo.
echo Repository: https://github.com/hungmenvadong147/CODE-WED
echo Branch: main
echo.
echo Cac lan cap nhat sau nay, chay file: update-github.bat
echo.
pause
