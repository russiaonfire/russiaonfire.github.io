import Pjax from '../vendor/pjax.min.js';

document.onreadystatechange = function () {
    const pjax = new Pjax({
        elements: "a", // default is "a[href], form[action]"
        selectors: [
          "title",
          "meta[name=description]",
          "main",
        ]
    });


  document.addEventListener("redirect", (event) => {
    pjax.loadUrl(event.detail.url);
  });
}