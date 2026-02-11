@echo off
chcp 65001 >nul
echo ========================================
echo 다솔물환경연구소 PWA 테스트 서버
echo ========================================
echo.
echo [1단계] Python 확인 중...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python이 설치되어 있지 않습니다.
    echo    https://www.python.org/downloads/ 에서 Python을 설치해주세요.
    pause
    exit
)
echo ✓ Python 설치 확인
echo.

echo [2단계] 서버 시작 중...
echo.
echo ========================================
echo 🌐 서버가 시작되었습니다!
echo ========================================
echo.
echo 📱 로컬 테스트: http://localhost:8000
echo 📱 모바일 테스트: http://[컴퓨터IP]:8000
echo.
echo ⚠️  PWA 기능 테스트를 위해서는 HTTPS가 필요합니다.
echo    로컬 테스트는 localhost에서만 가능합니다.
echo.
echo 💡 컴퓨터 IP 주소 확인:
ipconfig | findstr /i "IPv4"
echo.
echo 🛑 서버 종료: Ctrl + C
echo ========================================
echo.

cd dasol-approval
python -m http.server 8000

pause
