// 다솔물환경연구소 통합시스템 Service Worker
const CACHE_NAME = 'dasol-system-v1.0.0';
const RUNTIME_CACHE = 'dasol-runtime';

// 오프라인에서도 반드시 동작해야 하는 핵심 파일들
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/dashboard-final.html',
  '/offline.html',
  '/install-guide.html',
  '/pages/field-request.html',
  '/pages/work-log-daily.html',
  '/pages/vehicle-management.html',
  '/pages/request-list-admin.html',
  '/pages/board.html'
];

// Service Worker 설치
self.addEventListener('install', (event) => {
  console.log('[Service Worker] 설치 중...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] 핵심 파일 캐싱 중...');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] 설치 완료');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] 설치 실패:', error);
      })
  );
});

// Service Worker 활성화
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] 활성화 중...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              // 이전 버전의 캐시 삭제
              return cacheName.startsWith('dasol-') && cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] 오래된 캐시 삭제:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[Service Worker] 활성화 완료');
        return self.clients.claim();
      })
  );
});

// 네트워크 요청 가로채기
self.addEventListener('fetch', (event) => {
  // POST 요청은 캐싱하지 않음 (데이터 제출)
  if (event.request.method !== 'GET') {
    return;
  }

  // Chrome extension 요청 무시
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // 캐시에 있으면 캐시 반환하고, 백그라운드에서 업데이트
          updateCache(event.request);
          return cachedResponse;
        }

        // 캐시에 없으면 네트워크 요청
        return fetch(event.request)
          .then((response) => {
            // 유효한 응답이 아니면 그냥 반환
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // HTML, CSS, JS, 이미지 파일만 캐싱
            const responseToCache = response.clone();
            const url = new URL(event.request.url);
            
            if (
              url.pathname.endsWith('.html') ||
              url.pathname.endsWith('.css') ||
              url.pathname.endsWith('.js') ||
              url.pathname.endsWith('.png') ||
              url.pathname.endsWith('.jpg') ||
              url.pathname.endsWith('.svg') ||
              url.pathname.endsWith('.ico')
            ) {
              caches.open(RUNTIME_CACHE)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          })
          .catch(() => {
            // 네트워크 실패 시 오프라인 페이지 표시
            if (event.request.destination === 'document') {
              return caches.match('/offline.html')
                .then((offlinePage) => {
                  return offlinePage || caches.match('/index.html');
                });
            }
          });
      })
  );
});

// 백그라운드에서 캐시 업데이트
function updateCache(request) {
  fetch(request)
    .then((response) => {
      if (!response || response.status !== 200 || response.type === 'error') {
        return;
      }

      const responseToCache = response.clone();
      caches.open(CACHE_NAME)
        .then((cache) => {
          cache.put(request, responseToCache);
        });
    })
    .catch(() => {
      // 네트워크 실패 무시
    });
}

// 백그라운드 동기화 (데이터 제출 재시도)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] 백그라운드 동기화:', event.tag);
  
  if (event.tag === 'sync-requests') {
    event.waitUntil(syncPendingRequests());
  }
});

// 대기 중인 요청 동기화
async function syncPendingRequests() {
  // 여기에 오프라인에서 저장된 요청을 서버로 전송하는 로직 추가
  console.log('[Service Worker] 대기 중인 요청 동기화 중...');
}

// 푸시 알림 수신
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body || '새로운 알림이 있습니다.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || '다솔시스템', options)
  );
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

console.log('[Service Worker] 로드 완료');
