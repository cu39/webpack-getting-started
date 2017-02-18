"use strict";

var contents = function(window, document) {
  var cont = document.getElementById("contents");
  if (cont !== null) {
    cont.innerHTML = "Foo Bar Baz!";
  } else {
    console.log('div#contents is null!');
  } 
};

module.exports = contents;
