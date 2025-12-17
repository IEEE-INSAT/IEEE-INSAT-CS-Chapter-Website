const CACHE_NAME = "version1";
const filesToCache = ["index.html","offline.html"]
const self = this;

// Install SW
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("opened cache");
                return cache.addAll(filesToCache);
            })
            .catch((err) => {
                console.log("ERROR DURING CACHE",err);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                // we always fetch new data but when there is no internet we fetch the offline page
                return fetch(event.request)
                    .catch(() => {
                        return caches.match('offline.html');
                    })
            })
    )

});

// Activate the SW
// remove all caches and keep the new one
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                // if we are working with the wrong cache we delete it
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))

    )
});