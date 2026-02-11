#!/bin/bash

echo "========================================"
echo "다솔물환경연구소 PWA 테스트 서버"
echo "========================================"
echo ""

echo "[1단계] Python 확인 중..."
if ! command -v python3 &> /dev/null; then
    echo "❌ Python이 설치되어 있지 않습니다."
    echo "   설치: brew install python3 (Mac)"
    echo "   설치: sudo apt install python3 (Linux)"
    exit 1
fi
echo "✓ Python 설치 확인"
echo ""

echo "[2단계] 서버 시작 중..."
echo ""
echo "========================================"
echo "🌐 서버가 시작되었습니다!"
echo "========================================"
echo ""
echo "📱 로컬 테스트: http://localhost:8000"
echo "📱 모바일 테스트: http://[컴퓨터IP]:8000"
echo ""
echo "⚠️  PWA 기능 테스트를 위해서는 HTTPS가 필요합니다."
echo "    로컬 테스트는 localhost에서만 가능합니다."
echo ""
echo "💡 컴퓨터 IP 주소 확인:"
ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print "   " $2}'
echo ""
echo "🛑 서버 종료: Ctrl + C"
echo "========================================"
echo ""

cd dasol-approval
python3 -m http.server 8000
