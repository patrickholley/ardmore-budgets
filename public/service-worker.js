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
    '/src/app.ts'
];

console.log('Service Worker script started.');

self.addEventListener('install', (event) => {
    console.log('Installing...');

    if (isDevelopment) {
        // Cache development files
        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    console.log('Opened cache:', CACHE_NAME);
                    console.log('Files to cache:', DEV_FILES_TO_CACHE);
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
                        ...Object.values(manifest).map(entry => [entry.css[0], entry.file]).flat(),
                    ];

                    console.log('Files to cache:', filesToCache);
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
            console.log('Caching...');
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting file from cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
  console.log('fetch', caches, event.request);

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                console.log('Responding...', response);
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }).catch(err => {
          console.log(err);
        })
    );
});
