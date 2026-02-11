# 🚀 다솔시스템 PWA - 빠른 시작 가이드

## ⚡ 5분 안에 시작하기

### 1️⃣ 파일 압축 해제

```bash
# Windows: 마우스 우클릭 > "압축 풀기"
# Mac: 더블클릭
# Linux: unzip dasol-system-pwa.zip
```

### 2️⃣ 로컬 서버 실행

**Windows:**
```
start-server.bat 더블클릭
```

**Mac/Linux:**
```bash
chmod +x start-server.sh
./start-server.sh
```

### 3️⃣ 브라우저에서 접속

```
http://localhost:8000
```

### 4️⃣ PWA 설치 테스트

1. Chrome 브라우저로 접속
2. 주소창 오른쪽의 "설치" 아이콘 클릭
3. "설치" 버튼 클릭
4. 바탕화면/홈 화면에 아이콘 생성 확인

---

## 📱 모바일에서 테스트

### 준비사항
- 컴퓨터와 모바일이 같은 Wi-Fi에 연결되어 있어야 함

### 단계

1. **컴퓨터 IP 확인**
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
   - 예: `192.168.0.100`

2. **모바일 브라우저로 접속**
   ```
   http://192.168.0.100:8000
   ```

3. **PWA 설치**
   - Android: Chrome 메뉴 > "홈 화면에 추가"
   - iOS: Safari 공유 버튼 > "홈 화면에 추가"

---

## 🎯 테스트 체크리스트

### 기본 기능
- [ ] 로그인 (kamille@dasol.co.kr / password123)
- [ ] 대시보드 확인
- [ ] 메뉴 탐색
- [ ] 게시판 확인

### PWA 기능
- [ ] 설치 프롬프트 표시
- [ ] 앱 설치 완료
- [ ] 홈 화면 아이콘 확인
- [ ] 독립 실행 (브라우저 UI 없이)
- [ ] 오프라인 모드 (네트워크 끄고 테스트)
- [ ] 캐시된 페이지 확인

### Chrome DevTools 확인
- [ ] F12 > Application > Manifest 정보 표시
- [ ] Service Worker 등록됨 (Active)
- [ ] Cache Storage에 파일들 저장됨
- [ ] Lighthouse PWA 점수 90+ 

---

## 🐛 문제 해결

### ❌ "설치" 버튼이 안 보여요

**원인**: PWA 요구사항 미충족

**해결**:
1. HTTPS 필수 (localhost는 예외)
2. manifest.json 유효성 확인
3. Service Worker 등록 확인
4. 브라우저 콘솔에서 에러 확인

### ❌ Service Worker가 등록 안 돼요

**해결**:
```javascript
// Chrome DevTools Console에서 확인
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('등록된 Service Workers:', regs.length);
});

// 강제 재등록
navigator.serviceWorker.register('/service-worker.js', {
  updateViaCache: 'none'
});
```

### ❌ 캐시가 업데이트 안 돼요

**해결**:
1. Chrome DevTools > Application > Service Workers
2. "Update on reload" 체크
3. "Unregister" 클릭
4. 페이지 새로고침
5. Cache Storage에서 오래된 캐시 삭제

---

## 📚 다음 단계

### 프로덕션 배포

**Vercel 배포 (권장)**
```bash
# 1. Vercel CLI 설치
npm install -g vercel

# 2. 프로젝트 배포
cd dasol-approval
vercel

# 3. 프로덕션 배포
vercel --prod
```

**특징:**
- ✅ 자동 HTTPS
- ✅ 자동 배포
- ✅ CDN 가속
- ✅ 무료 (개인 프로젝트)

### 기타 배포 옵션

- **GitHub Pages** (무료, 정적 사이트)
- **Netlify** (무료, CI/CD)
- **Firebase Hosting** (무료 티어)
- **자체 서버** (Nginx + Let's Encrypt)

---

## 📖 추가 문서

- **상세 가이드**: `PWA-README.md`
- **기술 문서**: `README.md`
- **인증 가이드**: `AUTH-README.md`

---

## 🆘 지원

**버그 리포트**: 대시보드 > 게시판 > "시스템 문의"

**긴급 문의**: [추가 예정]

---

**Happy Coding! 🎉**

다솔물환경연구소 통합시스템 PWA v1.0.0
