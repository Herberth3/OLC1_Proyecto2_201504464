// Retrieve Elements
const consoleLogList1 = document.querySelector(".editor__console-logs1");
const consoleLogList2 = document.querySelector(".editor__console-logs2");
const executeCodeBtnJS = document.querySelector('.editor__runJs');
const executeCodeBtnPY = document.querySelector('.editor__runPy');
const inputFile = document.querySelector('input[type="file"]');
const downloadFile = document.querySelector('input[name="downloadFile"]');
const downloadJavascript = document.querySelector('input[name="downloadJavascript"]');
const downloadPython = document.querySelector('input[name="downloadPython"]');
const tableErrorJS = document.querySelector('.tableErrorJS');
const tableTokenJS = document.querySelector('.tableTokenJS');
const tableErrorPY = document.querySelector('.tableErrorPY');
const tableTokenPY = document.querySelector('.tableTokenPY');
//const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
// Variables
var nameCurrentFile = "";
let traductionJS = "";
let traductionPY = "";
let dot = "";
let listaTJS = [];
let listaEJS = [];
let listaTPY = [];
let listaEPY = [];

/*************************APLICATION INIT*********************************/
let editorLib = {
    clearConsoleScreenJS() {
        //consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList1.firstChild) {
            consoleLogList1.removeChild(consoleLogList1.firstChild);
        }

        // Remove all elements in table list
        let i = tableErrorJS.rows.length;
        while (i > 1) {
            i--;
            tableErrorJS.deleteRow(i);
        }

        i = tableTokenJS.rows.length;
        while (i > 1) {
            i--;
            tableTokenJS.deleteRow(i);
        }

        // Remove the AST graph
        d3.select("#graph").graphviz().renderDot('digraph G{}');
    },
    clearConsoleScreenPY() {
        // Remove all elements in the log list
        while (consoleLogList2.firstChild) {
            consoleLogList2.removeChild(consoleLogList2.firstChild);
        }
        // Remove all elements in table list
        let i = tableErrorPY.rows.length;
        while (i > 1) {
            i--;
            tableErrorPY.deleteRow(i);
        }

        i = tableTokenPY.rows.length;
        while (i > 1) {
            i--;
            tableTokenPY.deleteRow(i);
        }
    },
    printToConsoleJS() {
        let conteo = 1;
        listaEJS.forEach(log => {
            let rowError = conteo.toString() + " -- " + log.caracterError + " -- T:" + log.tipoTokenErrorEnString + " -- D:" + log.descripcionError;
            rowError += " -- f:" + log.filaError + " -- c:" + log.columnaError;
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.textContent = rowError;

            newLogItem.appendChild(newLogText);

            consoleLogList1.appendChild(newLogItem);
            conteo++;
        });
    },
    printToConsolePY() {
        let conteo = 1;
        listaEPY.forEach(log => {
            let rowError = conteo.toString() + " -- " + log.caracterError + " -- T:" + log.tipoTokenErrorEnString + " -- D:" + log.descripcionError;
            rowError += " -- f:" + log.filaError + " -- c:" + log.columnaError;
            const newLogItem = document.createElement('li');
            const newLogText = document.createElement('pre');

            newLogText.textContent = rowError;

            newLogItem.appendChild(newLogText);

            consoleLogList2.appendChild(newLogItem);
            conteo++;
        });
    },
    runResponseJS(data) {

        listaTJS = data[0].listaToken;
        listaEJS = data[0].listaErrores;
        traductionJS = "";
        dot = "";

        let conteo = 1;

        if (tableErrorJS) {
            listaEJS.forEach(tokenE => {
                let newRow = tableErrorJS.insertRow(tableErrorJS.rows.length);
                let no = newRow.insertCell(0);
                let lexema = newRow.insertCell(1);
                let tipo = newRow.insertCell(2);
                let descripcion = newRow.insertCell(3);
                let linea = newRow.insertCell(4);
                let columna = newRow.insertCell(5);
                no.innerHTML = conteo.toString();
                lexema.innerHTML = tokenE.caracterError;
                tipo.innerHTML = tokenE.tipoTokenErrorEnString;
                descripcion.innerHTML = tokenE.descripcionError;
                linea.innerHTML = tokenE.filaError.toString();
                columna.innerHTML = tokenE.columnaError.toString();
                conteo++;
            });
        }

        conteo = 1;
        if (tableTokenJS) {
            listaTJS.forEach(token => {
                let newRow = tableTokenJS.insertRow(tableTokenJS.rows.length);
                let no = newRow.insertCell(0);
                let lexema = newRow.insertCell(1);
                let tipo = newRow.insertCell(2);
                let linea = newRow.insertCell(3);
                let columna = newRow.insertCell(4);
                no.innerHTML = conteo.toString();
                lexema.innerHTML = token.lexema;
                tipo.innerHTML = token.tipoTokenEnString;
                linea.innerHTML = token.filaToken.toString();
                columna.innerHTML = token.columnaToken.toString();
                conteo++;
            });
        }

        /** SI LA LISTA DE ERRORES CONTIENE ELEMENTOS NO SE TRADUCE NI SE MUESTRA EL GRAFO **/
        if (listaEJS.length > 0) {
            alert("No se pudo realizar la traduccion a Javascript, existen errores!");

            // Print to the console
            editorLib.printToConsoleJS();

            // Remove the AST graph
            d3.select("#graph").graphviz().renderDot('digraph G{}');
        } else {
            /** DE LO CONTRARIO SE TRADUCE EL CODIGO PARA DESCARGARLO Y SE MUESTRA EL GRAFO **/
            traductionJS = data[0].traduccion;
            dot = data[0].dot;

            // Print the AST graph
            d3.select("#graph").graphviz().renderDot(dot);

            alert("Traduccion a Javascript exitosa!");
        }
    },
    runResponsePY(data) {

        listaTPY = data[0].listaToken;
        listaEPY = data[0].listaErrores;
        traductionPY = "";
        let conteo = 1;

        if (tableErrorPY) {
            listaEPY.forEach(tokenE => {
                let newRow = tableErrorPY.insertRow(tableErrorPY.rows.length);
                let no = newRow.insertCell(0);
                let lexema = newRow.insertCell(1);
                let tipo = newRow.insertCell(2);
                let descripcion = newRow.insertCell(3);
                let linea = newRow.insertCell(4);
                let columna = newRow.insertCell(5);
                no.innerHTML = conteo.toString();
                lexema.innerHTML = tokenE.caracterError;
                tipo.innerHTML = tokenE.tipoTokenErrorEnString;
                descripcion.innerHTML = tokenE.descripcionError;
                linea.innerHTML = tokenE.filaError.toString();
                columna.innerHTML = tokenE.columnaError.toString();
                conteo++;
            });
        }

        conteo = 1;
        if (tableTokenPY) {
            listaTPY.forEach(token => {
                let newRow = tableTokenPY.insertRow(tableTokenPY.rows.length);
                let no = newRow.insertCell(0);
                let lexema = newRow.insertCell(1);
                let tipo = newRow.insertCell(2);
                let linea = newRow.insertCell(3);
                let columna = newRow.insertCell(4);
                no.innerHTML = conteo.toString();
                lexema.innerHTML = token.lexema;
                tipo.innerHTML = token.tipoTokenEnString;
                linea.innerHTML = token.filaToken.toString();
                columna.innerHTML = token.columnaToken.toString();
                conteo++;
            });
        }

        /** SI LA LISTA DE ERRORES CONTIENE ELEMENTOS NO SE TRADUCE **/
        if (listaEPY.length > 0) {
            alert("No se pudo realizar la traduccion a Python, existen errores!");

            // Print to the console
            editorLib.printToConsolePY();
        } else {
            /** DE LO CONTRARIO SE TRADUCE EL CODIGO PARA DESCARGARLO **/
            traductionPY = data[0].traduccion;

            alert("Traduccion a Python exitosa!");
        }
    },
    init() {
        // Configure Ace

        // Theme
        codeEditor.setTheme("ace/theme/dracula");

        // Set language
        codeEditor.session.setMode("ace/mode/java");

        // Set Options
        codeEditor.setOptions({
            //fontFamily: 'Inconsolata',
            //fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
        });
    }
}
/**************************APLICATION INIT*********************************/

/********************REQUEST ANALYSIS WITH JISON***************************/
executeCodeBtnJS.addEventListener('click', () => {
    // Clear console message
    editorLib.clearConsoleScreenJS();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    /*try {
        new Function(userCode)();
    } catch (err) {
        console.token(err);
    }*/

    if (userCode != "") {
        let nodeUrlJS = "http://localhost:5000/analizar";

        $.post(nodeUrlJS,
            {
                code: userCode
            },
            function (data, status) {
                if (status.toString() == "success") {
                    //console.log(data);
                    editorLib.runResponseJS(data);
                } else {
                    alert("Error estado de conexion: " + status);
                }
            });

    } else {
        alert("Editor vacio, ingrese contenido");
    }

});
/********************REQUEST ANALYSIS WITH JISON***************************/

/********************REQUEST ANALYSIS WITH PAREA***************************/
executeCodeBtnPY.addEventListener('click', () => {
    // Clear console message
    editorLib.clearConsoleScreenPY();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    if (userCode != "") {
        let nodeUrlPy = "http://localhost:4000/analizar";

        $.post(nodeUrlPy,
            {
                code: userCode
            },
            function (data, status) {
                if (status.toString() == "success") {
                    //console.log(data);
                    editorLib.runResponsePY(data);
                } else {
                    alert("Error estado de conexion: " + status);
                }
            });

    } else {
        alert("Editor vacio, ingrese contenido");
    }

});
/********************REQUEST ANALYSIS WITH PAREA***************************/

/******************************OPEN FILE***********************************/
inputFile.addEventListener('change', function (e) {
    //console.log(inputFile.files);
    const reader = new FileReader();
    /********************/
    let files = e.target.files, file = files[0];
    if (!file) {
        return;
    }
    nameCurrentFile = file.name;
    //console.log(file.name.replace(".java", ""));
    /********************/
    reader.onload = function () {
        let fileContent = reader.result;
        codeEditor.setValue(fileContent);
        //console.log(reader);
        // Clear console message
        editorLib.clearConsoleScreenJS();
        editorLib.clearConsoleScreenPY();
    }
    reader.readAsText(inputFile.files[0])
}, false)
/******************************OPEN FILE***********************************/

/*******************DOWNLOAD FILE WITH TEXT IN EDITOR**********************/
downloadFile.addEventListener('click', () => {
    //console.log("estoy descargando");
    // specify the content of the file
    let text = codeEditor.getValue();
    if (text != "") {
        // Specify the name of the file to be saved
        if (nameCurrentFile == "") {
            nameCurrentFile = "newDownload.java"
        }
        //  create a new Blob (html5 magic) that contains the data from your editor
        var blob = new Blob([text], { type: 'text/plain' });
        // create a link for our script to 'click'
        var link = document.createElement("a");
        //  supply the name of the file (from the var above).
        // you could create the name here but using a var
        // allows more flexability later.
        link.download = nameCurrentFile;
        // provide text for the link. This will be hidden so you
        // can actually use anything you want.
        link.innerHTML = "Download File";
        // Create the link Object.
        link.href = window.URL.createObjectURL(blob);
        // when link is clicked call a function to remove it from
        // the DOM in case user wants to save a second file.
        link.onclick = destroyClickedElement;
        // make sure the link is hidden.
        link.style.display = "none";
        // add the link to the DOM
        document.body.appendChild(link);
        // click the new link
        link.click();
    }
    else {
        alert("Editor vacio, ingrese contenido");
    }
})

/*******************DOWNLOAD FILE WITH TEXT IN EDITOR**********************/

/*************DOWNLOAD FILE WITH TRANSLATION JAVASCRIPT********************/

downloadJavascript.addEventListener('click', () => {
    //console.log("estoy descargando");
    // specify the content of the file
    let text = traductionJS;
    if (text != "") {
        // Specify the name of the file to be saved
        let fileNameJS = nameCurrentFile;
        if (fileNameJS == "") {
            fileNameJS = "newDownload.js"
        }
        else {
            fileNameJS = fileNameJS.replace(".java", "");
            fileNameJS = fileNameJS + ".js";
        }
        //  create a new Blob (html5 magic) that contains the data from your editor
        var blob = new Blob([text], { type: 'text/plain' });
        // create a link for our script to 'click'
        var link = document.createElement("a");
        //  supply the name of the file (from the var above).
        // you could create the name here but using a var
        // allows more flexability later.
        link.download = fileNameJS;
        // provide text for the link. This will be hidden so you
        // can actually use anything you want.
        link.innerHTML = "Download File";
        // Create the link Object.
        link.href = window.URL.createObjectURL(blob);
        // when link is clicked call a function to remove it from
        // the DOM in case user wants to save a second file.
        link.onclick = destroyClickedElement;
        // make sure the link is hidden.
        link.style.display = "none";
        // add the link to the DOM
        document.body.appendChild(link);
        // click the new link
        link.click();
    }
    else {
        alert("Traduzca un archivo para descargar Javascript!");
    }
})

/*************DOWNLOAD FILE WITH TRANSLATION JAVASCRIPT********************/

/*************DOWNLOAD FILE WITH TRANSLATION PYTHON********************/

downloadPython.addEventListener('click', () => {
    // specify the content of the file
    let text = traductionPY;
    if (text != "") {
        // Specify the name of the file to be saved
        let fileNamePY = nameCurrentFile;
        if (fileNamePY == "") {
            fileNamePY = "newDownload.py"
        }
        else {
            fileNamePY = fileNamePY.replace(".java", "");
            fileNamePY = fileNamePY + ".py";
        }
        //  create a new Blob (html5 magic) that contains the data from your editor
        var blob = new Blob([text], { type: 'text/plain' });
        // create a link for our script to 'click'
        var link = document.createElement("a");
        //  supply the name of the file (from the var above).
        // you could create the name here but using a var
        // allows more flexability later.
        link.download = fileNamePY;
        // provide text for the link. This will be hidden so you
        // can actually use anything you want.
        link.innerHTML = "Download File";
        // Create the link Object.
        link.href = window.URL.createObjectURL(blob);
        // when link is clicked call a function to remove it from
        // the DOM in case user wants to save a second file.
        link.onclick = destroyClickedElement;
        // make sure the link is hidden.
        link.style.display = "none";
        // add the link to the DOM
        document.body.appendChild(link);
        // click the new link
        link.click();
    }
    else {
        alert("Traduzca un archivo para descargar Python!");
    }
})

/*************DOWNLOAD FILE WITH TRANSLATION PYTHON********************/

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

editorLib.init();