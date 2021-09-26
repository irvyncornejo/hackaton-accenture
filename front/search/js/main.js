
window.onload = load_files()
document.addEventListener('DOMContentLoaded', (e) => loadMaterialize())    



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
    <div class="container wrapper">
        <ul  id="images" class="collection">
            
        </ul>
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
        res.body['elementos_encontrados']['Labels'].forEach(element => {
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
            "Airplane": null,
            "Altar": null,
            "Antelope": null,
            "Apple": null,
            "Axe": null,
            "Baby": null,
            "Backpack": null,
            "Balloon": null,
            "Banana": null,
            "Baseball Bat": null,
            "Baseball Cap": null,
            "Baseball Glove": null,
            "Bathtub": null,
            "Baton": null,
            "Bear": null,
            "Bed": null,
            "Beer": null,
            "Belt": null,
            "Bench": null,
            "Bicycle": null,
            "Bird": null,
            "Birthday Cake": null,
            "Blazer": null,
            "Blouse": null,
            "Blow Dryer": null,
            "Boat": null,
            "Bomb": null,
            "Bonfire": null,
            "Book": null,
            "Bow": null,
            "Box": null,
            "Bracelet": null,
            "Bread": null,
            "Bridge": null,
            "Brush": null,
            "Bulldozer": null,
            "Bullet": null,
            "Bus": null,
            "Business Card": null,
            "Camera": null,
            "Candle": null,
            "Canoe": null,
            "Car": null,
            "Cat": null,
            "Ceiling Fan": null,
            "Chair": null,
            "Chandelier": null,
            "Cheetah": null,
            "Chess": null,
            "Chicken": null,
            "Christmas Tree": null,
            "Clock Tower": null,
            "Coat": null,
            "Computer Keyboard": null,
            "Construction Crane": null,
            "Cooktop": null,
            "Couch": null,
            "Cow": null,
            "Credit Card": null,
            "Crib": null,
            "Cross": null,
            "Desk": null,
            "Diamond": null,
            "Diaper": null,
            "Dining Table": null,
            "Dinosaur": null,
            "Disk": null,
            "Document": null,
            "Dog": null,
            "Doll": null,
            "Door": null,
            "Dryer": null,
            "Dynamite": null,
            "Earring": null,
            "Egg": null,
            "Elephant": null,
            "Fire Hydrant": null,
            "Fire Truck": null,
            "Fireplace": null,
            "First Aid": null,
            "Fish": null,
            "Flag": null,
            "Flyer": null,
            "Fork": null,
            "Fungus": null,
            "Gas Pump": null,
            "Gate": null,
            "Giraffe": null,
            "Glasses": null,
            "Glove": null,
            "Grenade": null,
            "Guitar": null,
            "Gun": null,
            "Burger": null,
            "Hammer": null,
            "Handbag": null,
            "Hardhat": null,
            "Hat": null,
            "Headphones": null,
            "Helicopter": null,
            "Helmet": null,
            "High Heel": null,
            "Honey Bee": null,
            "Hoodie": null,
            "Horse": null,
            "Hot Dog": null,
            "Jacuzzi": null,
            "Ice Cream": null,
            "Id Cards": null,
            "Insect": null,
            "Jacket": null,
            "Jeans": null,
            "Kangaroo": null,
            "Kayak": null,
            "Ketchup": null,
            "Kitchen Island": null,
            "Knife": null,
            "Lamp": null,
            "Laptop": null,
            "Lawn Mower": null,
            "Panther": null,
            "Mailbox": null,
            "Driving License": null,
            "License Plate": null,
            "Lifejacket": null,
            "Lighthouse": null,
            "Limo": null,
            "Lion": null,
            "Lipstick": null,
            "Lizard": null,
            "Lobster": null,
            "Locket": null,
            "Menu": null,
            "Microphone": null,
            "Microwave": null,
            "Milk": null,
            "Mixer": null,
            "Mobile Phone": null,
            "Monitor": null,
            "Moon": null,
            "Motorcycle": null,
            "Mouse": null,
            "Moving Van": null,
            "Necklace": null,
            "Orange": null,
            "Overcoat": null,
            "Painting": null,
            "Pajamas": null,
            "Giant Panda": null,
            "Pants": null,
            "Passport": null,
            "Pear": null,
            "Pen": null,
            "Penguin": null,
            "Perfume": null,
            "Person": null,
            "Piano": null,
            "Pickup Truck": null,
            "Pig": null,
            "Pill": null,
            "Pineapple": null,
            "Pizza": null,
            "Plant": null,
            "Pork": null,
            "Poster": null,
            "Power Drill": null,
            "Purse": null,
            "Rat": null,
            "Razor": null,
            "Refrigerator": null,
            "Remote Control": null,
            "Ring": null,
            "Road Sign": null,
            "Rocket": null,
            "Rose": null,
            "Rug": null,
            "Rugby Ball": null,
            "Sandal": null,
            "Sandwich": null,
            "Scarf": null,
            "Scissors": null,
            "Scoreboard": null,
            "Screw": null,
            "Screwdriver": null,
            "Shaker": null,
            "Shark": null,
            "Sheep": null,
            "Shirt": null,
            "Shoe": null,
            "Shorts": null,
            "Shovel": null,
            "Shower Faucet": null,
            "Sink": null,
            "Sink Faucet": null,
            "Skateboard": null,
            "Skirt": null,
            "Smoke Pipe": null,
            "Snake": null,
            "Snowman": null,
            "Soccer Ball": null,
            "Sock": null,
            "Solar Panels": null,
            "Spider": null,
            "Spoon": null,
            "Staircase": null,
            "Suit": null,
            "Sunglasses": null,
            "Sweater": null,
            "Swimwear": null,
            "Switch": null,
            "Sword": null,
            "T-Shirt": null,
            "Tablet Computer": null,
            "Tank": null,
            "Tape": null,
            "Tattoo": null,
            "Teddy Bear": null,
            "Tennis Ball": null,
            "Tennis Racket": null,
            "Tent": null,
            "Tie": null,
            "Tiger": null,
            "Toilet": null,
            "Toothbrush": null,
            "Tower": null,
            "Toy": null,
            "Traffic Light": null,
            "Train": null,
            "Truck": null,
            "Turtle": null,
            "Utility Pole": null,
            "Vest": null,
            "Violin": null,
            "Wallet": null,
            "Wedding Cake": null,
            "Wedding Gown": null,
            "Wheel": null,
            "Wristwatch": null,
            "Zebra": null,
            
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

const getImages = async (value) =>{
    const url = "https://w7a2uoj4wl.execute-api.us-west-2.amazonaws.com/test-dev/get-images"
    const headers = { 
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
    }
    const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        headers: headers,
        body: JSON.stringify({"body": value})
    })
    const r = await response.json()
    return r
}


const sendSearch = async () =>{
    const input = document.getElementById('autocomplete-input')
    const value = input.value
    input.value = ''
    content = ''
    const res = await getImages(value)
    document.getElementById('images').innerHTML = ''
        res.body.forEach(element => {
            document.getElementById('images').innerHTML += `
                <li class="collection-item avatar">
                    <i class="material-icons circle amber darken-4">burst_mode</i>
                    <span class="title">${element['caracteristica']}</span>
                    <a href="${element['ruta']}">${element['caracteristica']}</a>
                </li>
            `  
        })
}