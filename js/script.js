'use strict';
let text;

function clearForm() {
    document.getElementById('out').innerHTML = ``;
}

function readFile(object) {
    var file = object.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        text = JSON.parse(reader.result);
        function makeForm(obj) {
            for (let key in obj) {
                if (typeof (obj[key]) === 'object') {
                    makeForm(obj[key]);
                }

                switch (key) {
                    case "label":
                        document.getElementById('out').innerHTML += `
                    <label class="input-group-text" >` + obj[key] + `</label>`;
                        break;
                    case "input":
                        let placeholder = (obj[key].placeholder) ? (` placeholder="` + obj[key].placeholder + `"`) : "";
                        let checked = (obj[key].checked) ? (` cheked="` + obj[key].checked + `"`) : "";
                        let required = (obj[key].required) ? ` required` : "";
                        let list = (obj[key].colors) ? (` list="presetColors"`) : "";
                        let datalist = (obj[key].colors) ? (`
                        <datalist id="presetColors">`) : "";
                        if (datalist != "") {
                            for (let i = 0; i < obj[key].colors.length; i++) {
                                datalist += `\n<option>` + obj[key].colors[i] + `</option>/>`;
                            }
                        }
                        let clas = "";
                        if (datalist != "") {
                            datalist += `\n </datalist>`;
                        }
                        switch (obj[key].type) {
                            case "color":
                                clas = `" form-control form-control-color"`;
                                break;
                            case "checkbox":
                                clas = `" form-check-input"`;
                                break;
                            default:
                                clas = `" form-control"`;
                        }

                        document.getElementById('out').innerHTML += `
                    <input type="` + obj[key].type + `" class=` + clas +
                            placeholder + checked + required + list + ` id="basic-url">` + datalist;
                        break;

                    case "references":
                        obj[key].forEach((obj) => {
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
                    case "buttons":
                        obj[key].forEach((obj) => {
                            for (let key in obj) {
                                switch (key) {
                                    case "text":
                                        document.getElementById('out').innerHTML += `
                            <br><button class="btn btn-primary mt-3">` + obj[key] + `</button>`;
                                        break;
                                }
                            }
                        });

                }

            }
        }
        makeForm(text);
    };
    reader.readAsText(file);
}
