"use strict";

var app = function() {
  require("./css/style.css");
  require("./less/style.less");
  require("./sass/style.sass");
  require("./sass/style.scss");
  require("./js/content.js").call(this, window, document);
  var FooES6 = require("./js/FooES6.js");
  new FooES6().hello();
  console.log("Contents are loaded.");
};

document.addEventListener('DOMContentLoaded', app);
