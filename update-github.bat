@echo off
echo ========================================
echo Update Code to GitHub
echo Repository: https://github.com/hungmenvadong147/CODE-WED.git
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git chua duoc cai dat!
    pause
    exit /b 1
)

REM Check if git repository exists
if not exist ".git" (
    echo [ERROR] Chua khoi tao Git repository!
    echo Vui long chay file: push-to-github.bat truoc
    pause
    exit /b 1
)

echo [1/4] Kiem tra trang thai...
git status

echo.
echo [2/4] Them tat ca thay doi...
git add .
if errorlevel 1 (
    echo [ERROR] Git add that bai!
    pause
    exit /b 1
)

echo.
set /p commit_message="Nhap mo ta thay doi (Enter de dung mac dinh): "
if "%commit_message%"=="" set commit_message=Update code

echo.
echo [3/4] Tao commit: %commit_message%
git commit -m "%commit_message%"
if errorlevel 1 (
    echo [WARNING] Khong co thay doi de commit
    echo.
    pause
    exit /b 0
)

echo.
echo [4/4] Push len GitHub...
git push
if errorlevel 1 (
    echo.
    echo [ERROR] Push that bai!
    echo Thu pull code moi nhat truoc:
    echo   git pull origin main --rebase
    echo   git push
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Cap nhat thanh cong!
echo ========================================
echo.
echo Xem tai: https://github.com/hungmenvadong147/CODE-WED
echo.
pause
