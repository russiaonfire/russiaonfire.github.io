import Pjax from '../vendor/pjax.min.js';

document.onreadystatechange = function () {
    new Pjax({
        elements: "a", // default is "a[href], form[action]"
        selectors: [
          "title",
          "meta[name=description]",
          "main",
        ]
    });
}