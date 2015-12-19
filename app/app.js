"use strict";

var app = function() {
  require("./css/style.css");
  require("./js/content.js").call(this, window, document);
  console.log("Contents are loaded.");
};

document.addEventListener('DOMContentLoaded', app);
