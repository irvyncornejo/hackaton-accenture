
window.onload = load_files()
document.addEventListener('DOMContentLoaded', (e) => loadMaterialize())    

const getToken = () =>{
    try{
        const url = window.location
        const hash = url.hash.split('=')[1]
        const tk = hash.split('&')[0]
        localStorage.setItem('TK', tk)
    }
    catch(e){
        console.log(e)
    }
}


let content = ''

const loadMobile = () =>{
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
}

function load_files(){
    try{
        document.getElementById("root").innerHTML = `
        <div class="title1">
            <h1>Subir Archivos</h1>
        </div>
        <form class="container">
            <div class="container file-field input-field">
                <div class="btn inner-div deep-purple darken-2">
                    <span >File</span>
                    <input type="file" onchange="subirArchivo(event)" />
                </div>
                <div class="file-path-wrapper">
                    <input id="file_" class="file-path validate" type="text" placeholder="Upload one or more files" >
                </div>
            </div>
        </form>
    
        <div class="container wrapper">
            <ul  id="elements" class="collection">
                
            </ul>
        </div>
        `  
        const url = window.location
            const hash = url.hash.split('=')[1]
            const tk = hash.split('&')[0]
            localStorage.setItem('TK', tk)
        }
        catch(e){
            console.log(e)
        }  
}

function search_page(){
    document.getElementById("root").innerHTML = `
    <div class="title1">
        <h1>Búsqueda</h1>
    </div>
    <div class="container">
        <p id="info"></p>
        <div class="input-field inner-div">
            <input type="text" id="autocomplete-input" class="autocomplete">
            <label for="autocomplete-input">Caracteristicas</label>
            <a id="boton-buscar" onclick="sendSearch()" class="waves-effect deep-purple darken-2 btn"><i class="material-icons left">search</i>Buscar</a>
        </div>
        <a id="boton-voz" class="waves-effect deep-purple darken-2 btn"><i class="material-icons left">mic</i></a>
        <a id="boton-stop" class="waves-effect deep-purple darken-2 btn"><i class="material-icons left">stop</i></a>
    </div>
    `
    loadMaterialize()
    loadVoice()
}
const login = () =>{
    console.log("hola")
}

const subirArchivo = (event) =>{
    const file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = async (e) =>{
        const content = e.target.result
        const res = await envioApi(content.split(',')[1], file.name)

        document.getElementById('elements').innerHTML = ''
        res.body['elementos_encontrados'].forEach(element => {
            document.getElementById('elements').innerHTML += `
                <li class="collection-item avatar">
                    <i class="material-icons circle amber darken-4">burst_mode</i>
                    <span class="title">${element['Name']}</span>
                    <p>${element['Confidence'].toFixed(3)} %
                    </p>
                </li>
            `  
        })
        
        document.getElementById('file_').value = ''
    }
    reader.readAsDataURL(file)
    
}

const envioApi = async (content, name) =>{
    const url = "https://w7a2uoj4wl.execute-api.us-west-2.amazonaws.com/test-dev/upload"
    const headers = { 
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: headers,
        body: JSON.stringify({"content": content, "name": name})
    })
    const r = await response.json()
    return r
}

const loadMaterialize = () => {
    const options = {
        data: {
        "Apple": null,
        "Microsoft": null,
        "Google": 'https://placehold.it/250x250'
        }
    }
    const elems = document.querySelectorAll('.autocomplete')
    const instances = M.Autocomplete.init(elems, options)
}

const loadVoice = () =>{
    const speechRecognition = window.webkitSpeechRecognition
    const recognition = new speechRecognition()
    const instructions = $("#info")
    const textbox = $("#autocomplete-input")
    document.getElementById('boton-stop').addEventListener("click",() => stop_recording())

    recognition.continuous = true
        //recognition started
    recognition.onstart = function() {
        instructions.text("Reconocimiento de Voz Iniciado")
        document.getElementById("autocomplete-input").focus()
        document.getElementById("boton-stop").style.opacity =  "1"
    }
    recognition.onspeechend = function() {
        stop_recording()
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
    function stop_recording() {
        instructions.text("Reconocimiento de Voz Inactivo")
        recognition.stop()
        document.getElementById("boton-stop").style.opacity =  "0"
    }
}

const sendSearch = () =>{
    const input = document.getElementById('autocomplete-input')
    const value = input.value
    console.log(value)
    input.value = ''
    content = ''
}