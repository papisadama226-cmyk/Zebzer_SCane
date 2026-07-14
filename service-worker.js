// =============================
// ZEBZER SERVICE WORKER
// =============================


const CACHE_NAME = "zebzer-v2";



const FILES_CACHE = [

"./",

"./index.html",

"./style.css",

"./app.js",

"./firebase.js",

"./auth.js",

"./scanner.js",

"./subscription.js",

"./payment.js",

"./manifest.json",

"https://i.ibb.co/TxNygrDH/IMG-2377.png"

];






// Installation du cache


self.addEventListener(

"install",

(event)=>{


event.waitUntil(


caches.open(CACHE_NAME)

.then((cache)=>{


return cache.addAll(FILES_CACHE);


})


);


}

);







// Activation et nettoyage ancien cache


self.addEventListener(

"activate",

(event)=>{


event.waitUntil(


caches.keys()

.then((cacheNames)=>{


return Promise.all(


cacheNames.map((cache)=>{


if(cache !== CACHE_NAME){


return caches.delete(cache);


}


})


);


})


);


}

);







// Chargement depuis cache ou réseau


self.addEventListener(

"fetch",

(event)=>{


event.respondWith(


caches.match(event.request)

.then((response)=>{


return response || fetch(event.request);


})


);


}

);
