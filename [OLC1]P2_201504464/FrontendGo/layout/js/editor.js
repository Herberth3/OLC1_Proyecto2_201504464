// Retrieve Elements
const consoleLogList1 = document.querySelector(".editor__console-logs1");
const executeCodeBtn = document.querySelector('.editor__run');
const inputFile = document.querySelector('input[type="file"]');
const downloadFile = document.querySelector('input[name="downloadFile"]');
const downloadJavascript = document.querySelector('input[name="downloadJavascript"]');
const tableError = document.querySelector('.tableError');
const tableToken = document.querySelector('.tableToken');
//const resetCodeBtn = document.querySelector('.editor__reset');

// Setup Ace
let codeEditor = ace.edit("editorCode");
// Variables
var nameCurrentFile = "";
let traductionJS = "";
let dot = "";
let listaTJS = [];
let listaEJS = [];

/*************************APLICATION INIT*********************************/
let editorLib = {
    clearConsoleScreen() {
        //consoleMessages.length = 0;

        // Remove all elements in the log list
        while (consoleLogList1.firstChild) {
            consoleLogList1.removeChild(consoleLogList1.firstChild);
        }

        // Remove all elements in table list
        let i = tableError.rows.length;
        while (i > 1) {
            i--;
            tableError.deleteRow(i);
        }

        i = tableToken.rows.length;
        while (i > 1) {
            i--;
            tableToken.deleteRow(i);
        }

        // Remove the AST graph
        d3.select("#graph").graphviz().renderDot('digraph G{}');
    },
    printToConsole() {
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
    runResponse(data) {

        listaTJS = data[0].listaToken;
        listaEJS = data[0].listaErrores;
        traductionJS = "";
        dot = "";

        let conteo = 1;

        if (tableError) {
            listaEJS.forEach(tokenE => {
                let newRow = tableError.insertRow(tableError.rows.length);
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
        if (tableToken) {
            listaTJS.forEach(token => {
                let newRow = tableToken.insertRow(tableToken.rows.length);
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
            alert("No se pudo realizar la traduccion, existen errores!");
            
            // Print to the console
            editorLib.printToConsole();

            // Remove the AST graph
            d3.select("#graph").graphviz().renderDot('digraph G{}');
        } else {
            /** DE LO CONTRARIO SE TRADUCE EL CODIGO PARA DESCARGARLO Y SE MUESTRA EL GRAFO **/
            traductionJS = data[0].traduccion;
            dot = data[0].dot;

            // Print the AST graph
            d3.select("#graph").graphviz().renderDot(dot);

            alert("Traduccion exitosa!");
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

/*************************REQUEST ANALYSIS*********************************/
executeCodeBtn.addEventListener('click', () => {
    // Clear console message
    editorLib.clearConsoleScreen();

    // Get input from the code editor
    const userCode = codeEditor.getValue();

    // Run the user code
    /*try {
        new Function(userCode)();
    } catch (err) {
        console.token(err);
    }*/

    if (userCode != "") {
        let nodeUrl = "http://localhost:5000/analizar";

        $.post(nodeUrl,
            {
                code: userCode
            },
            function (data, status) {
                if (status.toString() == "success") {
                    //console.log(data);
                    editorLib.runResponse(data);
                } else {
                    alert("Error estado de conexion: " + status);
                }
            })

    } else {
        alert("Editor vacio, ingrese contenido");
    }

});
/*************************REQUEST ANALYSIS*********************************/

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
        editorLib.clearConsoleScreen();
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
        if (nameCurrentFile == "") {
            nameCurrentFile = "newDownload.js"
        }
        else {
            nameCurrentFile = nameCurrentFile.replace(".java", "");
            nameCurrentFile = nameCurrentFile + ".js";
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
        alert("Traduzca un archivo para descargar!");
    }
})

/*************DOWNLOAD FILE WITH TRANSLATION JAVASCRIPT********************/

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}

editorLib.init();