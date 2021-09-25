
window.onload = load_files()

function load_files(){
    document.getElementById("root").innerHTML = `
    <div class="title1">
        <h1>Subir Archivos</h1>
    </div>
    <form class="container">
        <div class="container file-field input-field">
            <div class="btn inner-div">
                <span>File</span>
                <input type="file" onchange="subirArchivo(event)" />
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text" placeholder="Upload one or more files" >
            </div>
        </div>
    </form>
    `
}

function search_page(){
    document.getElementById("root").innerHTML = `
    <div class="title1">
        <h1>Búsqueda</h1>
    </div>
    <div class="container">
        <p id="info"></p>
        <div class="input-field inner-div">                    
            <i class="material-icons prefix">textsms</i>
            <input type="text" id="autocomplete-input" class="autocomplete">
            <label for="autocomplete-input">Caracteristicas</label>
            <a id="boton-buscar" class="waves-effect waves-light btn"><i class="material-icons left">search</i>Buscar</a>
        </div>
        <a id="boton-voz" class="waves-effect waves-light btn"><i class="material-icons left">mic</i></a>
        <a id="boton-stop" class="waves-effect waves-light btn" onclick="stop_recording()"><i class="material-icons left">stop</i></a>
    </div>
    `
}
const login = () =>{
    console.log("hola")
}
const subirArchivo = (event) =>{
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (e) =>{
        envioApi(e.target.result, file.name)
    }
    reader.readAsDataURL(file)
    
}

const envioApi = async (content, name) =>{
    const url = "https://w7a2uoj4wl.execute-api.us-west-2.amazonaws.com/test-dev/upload"
    const headers = { 
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    const content64 = content.split(',')[1]
    const response = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        headers: headers,
        body: JSON.stringify({"content": content64, "name": name})
    })
    const res = await response.text()
    console.log(res)
}

document.addEventListener('DOMContentLoaded', function() {
    var options = {
        data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
        }
    }
    
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);
    });

    var speechRecognition = window.webkitSpeechRecognition

    var recognition = new speechRecognition()

    var textbox = $("#autocomplete-input")

    var instructions = $("#info")

    var content = ''


    recognition.continuous = true

    //recognition started

    recognition.onstart = function() {
        instructions.text("Reconocimiento de Voz Iniciado")
        document.getElementById("autocomplete-input").focus()
        document.getElementById("boton-stop").style.opacity =  "1"
    }

    recognition.onspeechend = function() {
        instructions.text("Reconocimiento de Voz Inactivo")
        recognition.stop()
        document.getElementById("boton-stop").style.opacity =  "0"
    }
    recognition.onerror = function (){
        instructions.text("Intentalo Nuevamente")
    }

    recognition.onresult = function (event) {
        var current = event.resultIndex;
        var transcript = event.results[current][0].transcript
        content += transcript
        textbox.val(content)
    }

    $("#boton-voz").click(function (event) {
        if (content.length){
            content += ''
        }    
        recognition.start()
}) 

textbox.on('input', function(){
    content = $(this).val()
})

// document.getElementById("boton-stop").style.opacity = "1"

function stop_recording() {
    instructions.text("Reconocimiento de Voz Inactivo")
    recognition.stop()
    document.getElementById("boton-stop").style.opacity =  "0"
}