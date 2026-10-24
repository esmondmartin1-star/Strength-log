/* Strength log service worker. Bump VERSION whenever you redeploy new files. */
const VERSION='strength-log-1.0.2';
const FONTS='strength-log-fonts';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-512.png','./icons/apple-touch-icon.png'];

self.addEventListener('install',function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(CORE);}).then(function(){return self.skipWaiting();}));
});

self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){return k!==VERSION&&k!==FONTS;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});

self.addEventListener('fetch',function(e){
  var req=e.request;
  if(req.method!=='GET')return;
  var url=new URL(req.url);

  // Google Fonts: serve from cache, refresh in the background.
  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(function(c){
      return c.match(req).then(function(hit){
        var net=fetch(req).then(function(res){
          if(res&&(res.ok||res.type==='opaque'))c.put(req,res.clone());
          return res;
        }).catch(function(){return hit||Response.error();});
        return hit||net;
      });
    }));
    return;
  }

  if(url.origin!==self.location.origin)return;

  // The page itself: open instantly from cache (works with no signal), update quietly for next time.
  if(req.mode==='navigate'){
    e.respondWith(caches.open(VERSION).then(function(cache){
      return cache.match('./index.html').then(function(cached){
        var refresh=fetch(req).then(function(res){
          if(res&&res.ok)cache.put('./index.html',res.clone());
          return res;
        }).catch(function(){return null;});
        if(cached){e.waitUntil(refresh);return cached;}
        return refresh.then(function(res){return res||new Response('Offline. Open the app once with a connection to install it.',{status:503,headers:{'Content-Type':'text/plain'}});});
      });
    }));
    return;
  }

  // Everything else from this site: cache first.
  e.respondWith(caches.match(req).then(function(hit){
    return hit||fetch(req).then(function(res){
      if(res&&res.ok){var copy=res.clone();caches.open(VERSION).then(function(c){c.put(req,copy);});}
      return res;
    });
  }));
});
