if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('SW registered');
    })
    .then(registration => navigator.serviceWorker.ready)
    .then(registration => { 
  
        registration.sync.register('image-fetch').then(() => {
            console.log('Sync registered');
        });
    });
}

var img = document.querySelector('img')
var text = document.getElementById('text');

img.addEventListener('click',function(){
  text.innerHTML = "I am image ";
})