'use strict';
let text;

function readFile(object) {
    var file = object.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        text = JSON.parse(reader.result);
        //alert(text.buttons[0].text);

        function makeForm(obj) {
            for (let key in obj) {
                if (typeof (obj[key]) === 'object') {
                    makeForm(obj[key]);
                }

                switch (key) {
                    case "label":
                        document.getElementById('out').innerHTML += `
                    <span class="input-group-text" >` + obj[key] + `</span>`;
                        break;
                    case "input":
                        let placeholder = (obj[key].placeholder) ? (` placeholder="` + obj[key].placeholder + `"`) : "";
                        let checked = (obj[key].checked) ? (` cheked="` + obj[key].checked + `"`) : "";
                        let required = (obj[key].required) ? ` required` : "";

                        document.getElementById('out').innerHTML += `
                    <input type="` + obj[key].type + `" class="form-control" ` +
                            placeholder + checked + required + ` id="basic-url">`;
                        break;

                    case "references":
                        obj.key.forEach((obj) => {
                            for (let key in obj) {
                                switch (key) {
                                    case "text":
                                        document.getElementById('out').innerHTML += `
                            <a href="` + obj.ref + `">` + obj[key] + `</a>`;
                                        break;
                                    case "text without ref":
                                        document.getElementById('out').innerHTML += `
                                 ` + obj[key];
                                        break;
                                }
                            }
                        });
                    break;
                        /* default:
                          alert( "Нет таких значений" );*/
                }

            }
        }
        makeForm(text);
    };
    reader.readAsText(file);
}