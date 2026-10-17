/* good food near me service worker: makes the site installable and lets it open offline.
   Pages and icons come from the network first (so new deploys show up right away)
   and fall back to the last cached copy. Font requests go straight to the network. */
const CACHE = "goodfood-v4";
const SHELL = ["./", "index.html", "favicon.svg?v=4", "goodfood-icon-180.png", "goodfood-icon-192.png", "goodfood-icon-512.png", "site.webmanifest?v=4"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("index.html")))
  );
});
