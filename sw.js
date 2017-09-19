self.addEventListener('install', function (event) {
  console.log('SW Installed');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll([
          './',
          '/index.html',
          '/app.js',
          '/app.css',
          'images/img3.png',
          'images/img1.png',
          'images/img2.png'
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  console.log('SW Activated');
  event.waitUntil(
    createDB()
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(res) {
        if (res) {
          return res;
        } else {
          return fetch(event.request);
        }
      })
  );
});

self.addEventListener('sync', function (event) {
  if (event.tag === 'image-fetch') {
    event.waitUntil(fetchImage());
  }
});

function fetchImage () {
    fetch('/images/img1.png')
      .then(function (response) {
        return response;
      })
      .then(function (text) {
        console.log('Request successful', text);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  var peopleData = [
    { name: "John Dow", email: "john@company.com" },
    { name: "Don Dow", email: "don@company.com" }
];

  var request = indexedDB.open("MyTestDatabase", 3);

//   function createDB() {
//   indexedDB.open('products', 1, function(upgradeDB) {
//     var store = upgradeDB.createObjectStore('beverages', {
//       keyPath: 'id'
//     });
//     store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
//     store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
//     store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
//   });
// }

request.onupgradeneeded = function (evt) {                   
        var objectStore = evt.currentTarget.result.createObjectStore("people", 
                                     { keyPath: "id", autoIncrement: true });
 
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("email", "email", { unique: true });
 
        for (i in peopleData) {
            objectStore.add(peopleData[i]);
        }
    };