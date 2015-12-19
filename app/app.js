"use strict";

var app = function() {
  require("./css/style.css");
  require("./less/style.less");
  require("./sass/style.sass");
  require("./sass/style.scss");
  require("./js/content.js").call(this, window, document);
  console.log("Contents are loaded.");
};

document.addEventListener('DOMContentLoaded', app);
