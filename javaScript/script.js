


// ----------------------------------> Abschluss am >>>12.10.2024<<<  <-----------------------------------------

//    "https://pokeapi.co/api/v2/pokemon-species/?offset=20&limit=20"



//ToDo's:
//  - Pfeile bei der groSen Karte zum umschalten.
//          - event bubbeling mit dialogtemplate 
//          -- weiter laden der nächsten Karten wenn die aktielle range ausläuft
//  - seite responsive gestalten!!!




//globalVariabes&&Arrays:
let pokemonObjectArray = [];
let currentPokemonObjects = [];
let pokemonAllUrls = [];
let pokemonCornerDataArray = [];

async function init() {
    firstLoad();
    loadPropertys();
    loadCompletePokemonUrls();
}


async function firstLoad() {
    let amount = localStorage.getItem('amount');
    let currentCard = localStorage.getItem('currentCard');
    if (amount || currentCard == null) {
        localStorage.setItem('amount', 40);
        localStorage.setItem('currentCard', 0);
    }
}

function saveAmount() {
    let newAmount = document.getElementById('amount').value;
    if (newAmount <= 120) {
        localStorage.setItem('amount', newAmount);
        console.log('wert ist gesetzt!');
        clearMainSpace();
        pokemonObjectArray = [];
        loadPropertys();
    } else {
        alert('please use a smaller value!! max. 120 Cards per side');
    }
}

async function loadCompletePokemonUrls() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=1302');
    let responseAsJson = await response.json();
    for (let i = 0; i < responseAsJson.results.length; i++) {
        let pokemonUrl = responseAsJson.results[i].url;
        pokemonAllUrls.push(pokemonUrl);
    }
    fetchSearchData();
}

async function fetchSearchData() {
    for (let i = 0; i < pokemonAllUrls.length; i++) {
        let response = await fetch(pokemonAllUrls[i]);
        let responseAsJson = await response.json();
        const pokenNode = {
            nameDe: responseAsJson.names[5].name.toLowerCase(),
            nameEn: responseAsJson.names[7].name.toLowerCase(),
            id: responseAsJson.id,
            url: responseAsJson.varieties[0].pokemon.url,
        }
        pokemonCornerDataArray.push(pokenNode);
    }
}

async function loadPropertys() {
    document.getElementById('loadingSpinner').classList.remove('none');
    let amount = parseInt(localStorage.getItem('amount'));
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    fetchUrls(amount, currentCard);
}

async function fetchUrls(amount, currentCard) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=${currentCard}&limit=${amount}`);
    let responseAsJson = await response.json();
    let urlsArray = responseAsJson.results;
    for (let i = 0; i < urlsArray.length; i++) {
        fetchPokemonData(urlsArray[i].url);
    }
}

async function fetchPokemonData(url) {
    let response = await fetch(url);
    let responseAsJson = await response.json();
    const pokemon = {
        name: responseAsJson.names[5],
        id: responseAsJson.id,
        varieties: responseAsJson.varieties[0].pokemon.url,
        text: germanText(responseAsJson.flavor_text_entries),
        sprites: {
            front: null,
            back: null,
        },
        types: {
            type_1: null,
            type_2: null,
        },
        stats: {
            hp: 0,
            speed: 0,
            atk: 0,
            def: 0,
            spAtk: 0,
            spDef: 0,
        },
        scream: 0,
        weight: 0,
        height: 0,
    }
    fullfillObject(pokemon);
}

async function fullfillObject(pokemon) {
    let response = await fetch(pokemon.varieties);
    let responseAsJson = await response.json();

    Object.assign(pokemon.sprites, {
        front: responseAsJson.sprites.front_default,
        back: responseAsJson.sprites.back_default,
    });

    Object.assign(pokemon.types, {
        type_1: responseAsJson.types[0].type.name,
        type_2: responseAsJson?.types[1]?.type?.name || 'none',
    })

    Object.assign(pokemon.stats, {
        hp: responseAsJson.stats[0].base_stat,
        speed: responseAsJson.stats[5].base_stat,
        atk: responseAsJson.stats[1].base_stat,
        def: responseAsJson.stats[2].base_stat,
        spAtk: responseAsJson.stats[3].base_stat,
        spDef: responseAsJson.stats[4].base_stat,
    });

    Object.assign(pokemon, {
        scream: responseAsJson.cries.legacy,
        weight: responseAsJson.weight,
        height: responseAsJson.height,
    })
    pokemonObjectArray.push(pokemon);
    checkIfFinished();
}

function germanText(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].language.name == 'de') {
            return array[i].flavor_text;
        }
    }
}

function checkIfFinished() {
    let amount = parseInt(localStorage.getItem('amount'));
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    if (pokemonObjectArray.length == amount) {
        sort();
        renderCards();
    }
}

function renderCards() {
    for (let i = 0; i < pokemonObjectArray.length; i++) {
        smallCardTemplate(pokemonObjectArray[i], i);
        checkColor(pokemonObjectArray[i], i);
        document.getElementById('loadingSpinner').classList.add('none');
    }
}

function next() {
    clearMainSpace();
    let amount = parseInt(localStorage.getItem('amount'));
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    let newCurrentCard = currentCard + amount;
    localStorage.setItem('currentCard', newCurrentCard);
    pokemonObjectArray = [];
    loadPropertys();
}

function back() {
    document.getElementById('loadingSpinner').classList.remove('none');
    clearMainSpace();
    let amount = parseInt(localStorage.getItem('amount'));
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    let newCurrentCard = currentCard - amount;
    localStorage.setItem('currentCard', newCurrentCard);
    if (newCurrentCard < 0) {
        localStorage.setItem('currentCard', 0);
        pokemonObjectArray = [];
        loadPropertys();
    } else {
        localStorage.setItem('currentCard', newCurrentCard);
        pokemonObjectArray = [];
        loadPropertys();
    }
}

function sort() {
    pokemonObjectArray.sort((a, b) => a.id - b.id);
}


function search() {
    let searchValue = document.getElementById('searchValue').value;
    if (searchValue.length >= 3) {
        clearSearchResults();
        showResult(searchValue);
    } else {
        clearSearchResults();
    }
}

function showResult(searchValue) {
    let lowerCaseSearchValue = searchValue.toLowerCase();
    const currentPokemonArray = pokemonCornerDataArray.filter(element =>
        element.nameDe.includes(lowerCaseSearchValue)
    );
    console.log(currentPokemonArray);
    currentPokemonArray.forEach((element) => searchResultsTemplate(element.nameDe, element.id));
}

function loadSelected(id) {
    let newCurrentCard = parseInt(id);
    newCurrentCard--;
    localStorage.setItem('currentCard', newCurrentCard);
    pokemonObjectArray = [];
    clearMainSpace();
    loadPropertys();
    document.getElementById('searchValue').value = ``;
    clearSearchResults();
}

function lastCard(currentCard) {
    let amount=  parseInt(localStorage.getItem('amount'));
    currentCard--;
    console.log(amount);
    if(currentCard<0){
        currentCard = amount;
        currentCard--;
        back();
        setTimeout(() =>{
            dialogTemplate(currentCard)}, 200);    
        }else{
            dialogTemplate(currentCard);
        }
}

function nextCard(currentCard) {
    let amount = localStorage.getItem('amount');
    currentCard++;
    if(currentCard>=amount){
        currentCard = 0;
        console.log(currentCard);
        next();
        setTimeout(() =>{
        dialogTemplate(currentCard)}, 100);
    }else{
        dialogTemplate(currentCard);
    }
}