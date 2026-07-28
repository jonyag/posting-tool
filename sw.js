// Service worker: keeps the app installable, and always loads the LATEST page.
// Navigations are fetched network-first (no-store) so a new deploy shows up on
// every device without a hard refresh — fixes "my PC still sees the old version".
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (e) => {
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request, { cache: "no-store" }).catch(() => fetch(e.request)));
  }
});
