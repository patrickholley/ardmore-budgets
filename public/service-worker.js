const getQueryParams = () => {
  const params = new URL(self.location).searchParams;
  const envVariables = {};
  for (const [key, value] of params.entries()) {
    envVariables[key] = value;
  }
  return envVariables;
}

const { MODE, VERSION } = getQueryParams();

const isDevelopment = MODE === 'development';
const CACHE_NAME = `my-app-cache-v${VERSION}`;

const DEV_FILES_TO_CACHE = [
    '/',
    '/dango.ico',
    '/index.html',
    '/src/app.ts',
    '/src/components/budget.ts',
    '/src/components/router.ts',
    '/src/pages/home.ts',
    '/src/store/store.ts',
    '/src/styles/app.ts',
    '/src/styles/home.ts',
    '/src/templates/budget.ts',
    '/src/templates/home.ts',
    '/src/utils/appConstants.ts',
    '/src/utils/getKeysFromObjects.ts',
    '/src/utils/getStyleElements.ts'
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
                        ...Object.values(manifest).map(entry => [entry.css[0], entry.file]),
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
