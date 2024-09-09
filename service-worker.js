const CACHE_NAME = "static-cache-v1";

//Add list of files to cache here.
const FILES_TO_CACHE = [
  "offline.html",
  "index.html",
  "styles/css/style.css",
  "js/scripts.js",
  "contact.html",
  "portfolio.html",
  "assets/images/LOGO.svg",
  "assets/images/moi.jpg",
  "assets/images/teemo.jpg",
  "assets/images/pix.jpg",
  "assets/images/icone_144x144.png",
  "assets/images/icone_192x192.png",
  "assets/images/icone_512x512.png",
  "assets/images/screenshot.png",
  "assets/livres/abysses1-c1-hr.jpg",
  "assets/livres/abysses2.png",
  "assets/livres/aventure-c1-br.png",
  "assets/livres/cahier-c1-hr.png",
  "assets/livres/cloture-c1-br.png",
  "assets/livres/frousse-c1-hr.png",
  "assets/livres/gomme-c1-hr-copie.png",
  "assets/livres/joyeux_doublepage.png    ",
  "assets/livres/joyeux-c1-hr-copie.png",
  "assets/livres/LPDG_doublepage.png",
  "assets/livres/lpdg.png",
  "assets/livres/mockup-Stacked-Book-Promo_6livres.png",
  "assets/livres/petitmysteres-c1-hr.png",
  "assets/livres/petitsmysteres2-c1-hr.png",
  "assets/livres/ressort_doublepage.png",
  "assets/livres/ressorts-c1-hr.png",
  "assets/livres/tombe_doublepage.png",
  "assets/livres/vermine-c1-hr.png",
  "assets/livres/wykan1-c1-hr.png",
];

self.addEventListener("install", (evt) => {
  console.log("[ServiceWorker] Install");
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  console.log("[ServiceWorker] Activate");
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  console.log("[ServiceWorker] Fetch", evt.request.url);
  //Add fetch event handler here
  if (evt.request.mode !== "navigate") {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match("offline.html");
      });
    })
  );
});
