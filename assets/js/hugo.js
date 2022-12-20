import Pjax from '../vendor/pjax.min.js';

const pjax = new Pjax({
  elements: "a:not([data-pjax='off'])", // default is "a[href], form[action]"
  selectors: [
    "title",
    "meta[name=description]",
    "main",
  ]
});

document.addEventListener("redirect", (event) => {
  pjax.loadUrl(event.detail.url);
})

document.addEventListener('click', function(event) {
  if (event.target.closest('#toggle')) {
    event.stopPropagation()
    document.getElementById("main").classList.toggle("main-collapsed")
  }
}, false);
