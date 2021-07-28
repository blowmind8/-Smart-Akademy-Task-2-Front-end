'use strict';
let text = "";
function readFile(object) {  
    var file = object.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        text = reader.result;
    };
    reader.readAsText(file);
  }

  alert(text);
    
  