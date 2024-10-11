const isDevelopment = import.meta?.env?.MODE === 'development';
const CACHE_NAME = `my-app-cache-v${import.meta?.env?.VITE_APP_VERSION}`;

const DEV_FILES_TO_CACHE = [
    '/',
    '/public/dango.ico',
    '/index.html',
    '/src/app.ts',
    '/src/components/budget.ts',
    '/src/components/router.ts',
];

console.log('Service Worker script started.');

self.addEventListener('install', (event) => {
    console.log('installing');
    if (isDevelopment) {
        // Cache development files
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('Opened cache:', CACHE_NAME);
                    return cache.addAll(DEV_FILES_TO_CACHE);
                })
        );
    } else {
        // Cache production files using the manifest
        event.waitUntil(
            fetch('/.vite/manifest.json')
                .then(response => response.json())
                .then(manifest => {
                    const filesToCache = [
                        '/',
                        '/index.html',
                        ...Object.values(manifest).map(entry => `/assets/${entry.file}`),
                    ];

                    return caches.open(CACHE_NAME)
                        .then(cache => {
                            console.log('Opened cache:', CACHE_NAME);
                            return cache.addAll(filesToCache);
                        });
                })
        );
    }
});
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            console.log('caching');
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log('responding');
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
