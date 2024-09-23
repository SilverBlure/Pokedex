"use strict";

// To dos:

//  evo chain Endpoint https://pokeapi.co/api/v2/evolution-chain/{id}/
//  darstellung der evolution Chain auf dem Evo Reiter
//  such funktion und reparieren
//  hover function


//Global Varaiables
let urlDatabase = [];
let allPokemonUrlArray = [];
let completePokemonObjektArray = [];
let pokemonObjektArray = [];
let currentPokemonObjectArray = pokemonObjektArray;


function init() {

    firstLoad();
    loadPropertys();
    loadUrls();
    pokemonEvolution();
    loadAll();

}

function firstLoad() {                   // set Propertys at the first load
    //console.log(localStorage.getItem('currentCard') , localStorage.getItem('amount'));
    if (localStorage.getItem('currentCard') === null) {
        localStorage.setItem('currentCard', 0);
    };
    if (localStorage.getItem('amount') === null) {
        localStorage.setItem('amount', 3);
    }
    //console.log(localStorage.getItem('currentCard') , localStorage.getItem('amount'));
}

function loadPropertys() {              // loading Propertys from localStorage
    document.getElementById('loadingSpinner').classList.add('none');
    let amount = localStorage.getItem('amount');
    let currentCard = localStorage.getItem('currentCard');
    //console.log(currentCard, amount);
    getUrls(amount, currentCard);
}

/*async function loadAll(){
    for(let i = 0; i<urlDatabase.length; i++){
        let singlePokemonUrl = urlDatabase[i]['url'];
        console.log(singlePokemonUrl);
        allPokemonUrlArray.push(singlePokemonUrl);
    }
   console.log(allPokemonUrlArray);
   for(let j = 0;j<=allPokemonUrlArray; j++){
    let allPokemon = await fetch(allPokemonUrlArray[j]);
    console.log(allPokemon);
   }
    
}*/

async function getUrls(amount, currentCard) {        // getting pokemon urls and seperate them
    document.getElementById('loadingSpinner').classList.remove('none');
    let pokemonUrls = await fetch("https://pokeapi.co/api/v2/pokemon?limit=" + amount + "&offset=" + currentCard);
    let pokemonUrlsAsJson = await pokemonUrls.json();
    //console.log(pokemonUrlsAsJson);
    for (let i = 0; i < pokemonUrlsAsJson.results.length; i++) {
        let directUrl = pokemonUrlsAsJson.results[i].url;
        //console.log(directUrl);
        fetchPokemonData(directUrl, i);
    }
}

async function pokemonEvolution() {
    let idValue = 5;
    let pokemonEvolutionChainz = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${idValue}/`);
    let pokemonEvolutionChainzAsJson = await pokemonEvolutionChainz.json();
    console.log(pokemonEvolutionChainzAsJson);
    let evolutionChainObjekt = {
        chainId: pokemonEvolutionChainzAsJson['id'],
        firstPokemon: pokemonEvolutionChainzAsJson['chain']['species']['name'],
        second: pokemonEvolutionChainzAsJson['chain']['evolves_to'][0]['species']['name'],
        third: pokemonEvolutionChainzAsJson['chain']['evolves_to'][0]['evolves_to'][0]['species']['name'],
    }
    console.log(evolutionChainObjekt);
}

async function fetchPokemonData(url) {     // fetches pokemon datasets and put it in objects
    let amount = localStorage.getItem('amount')
    let pokemonResponse = await fetch(url);
    let pokemonDataAsJson = await pokemonResponse.json();
    //console.log(pokemonDataAsJson);
    const pokemonData = {
        id: pokemonDataAsJson['id'],
        name: pokemonDataAsJson['forms'][0]['name'],
        type_1: pokemonDataAsJson['types'][0]['type']['name'],
        type_2: pokemonDataAsJson?.['types']?.[1]?.['type']?.['name'] || "none",  // some Pokemon doesnt have a second type (?.) checks if ist existing
        frontPic: pokemonDataAsJson['sprites']['front_default'],
        backPic: pokemonDataAsJson['sprites']['back_default'],
        weight: pokemonDataAsJson['weight'],
        height: pokemonDataAsJson['height'],
        stats: {
            atk: pokemonDataAsJson['stats'][1]['base_stat'],
            hp: pokemonDataAsJson['stats'][0]['base_stat'],
            def: pokemonDataAsJson['stats'][2]['base_stat'],
            spAtk: pokemonDataAsJson['stats'][3]['base_stat'],
            spDef: pokemonDataAsJson['stats'][4]['base_stat'],
            sp: pokemonDataAsJson['stats'][5]['base_stat'],
        },
        scream: pokemonDataAsJson['cries']['legacy'],
    }
    pokemonObjektArray.push(pokemonData);
    //console.log(pokemonDataAsJson);
    clearMainSpace();
    sortObject();
    renderSmallCards(pokemonObjektArray);
}

function sortObject() {
    if (pokemonObjektArray.length == amount) {
        pokemonObjektArray.sort((a, b) => a.id - b.id);
        //console.log(pokemonObjektArray);

    }
}

function renderSmallCards(pokemonObjektArray) {                              // render the small cards
    clearMainSpace();
    for (let i = 0; i < pokemonObjektArray.length; i++) {
        smallCardTemplate(pokemonObjektArray[i], i);
        checkColor(pokemonObjektArray[i], i);
    }
    document.getElementById('loadingSpinner').classList.add('none');
}

function saveCardOnSide() {             	        // saves the new amount of cards in the local storage
    pokemonObjektArray = [];
    let amountOfCards = document.getElementById('amount').value;
    if (amountOfCards > 40) {
        alert('Bitte gebe eine kleineren Wert ein!');
    } else {
        localStorage.setItem('amount', amountOfCards);
    }
    clearMainSpace();
    loadPropertys();
}

function next() {
    pokemonObjektArray = [];                                 // get values from the local storage add numbers and reload mainspace
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    let amount = parseInt(localStorage.getItem('amount'));
    let newCurrentCard = amount + currentCard;
    //console.log(newCurrentCard);
    localStorage.removeItem('currentCard');
    localStorage.setItem('currentCard', newCurrentCard);
    clearMainSpace();
    loadPropertys();
}

function back() {
    pokemonObjektArray = [];                                 // back function checks and not getting beyond zero
    let currentCard = parseInt(localStorage.getItem('currentCard'));
    let amount = parseInt(localStorage.getItem('amount'));
    let newCurrentCard = currentCard - amount;
    if (newCurrentCard >= 0) {
        localStorage.removeItem('currentCard');
        localStorage.setItem('currentCard', newCurrentCard);
        clearMainSpace();
        loadPropertys();
    } else {
        newCurrentCard = 0;
        localStorage.removeItem('currentCard');
        localStorage.setItem('currentCard', newCurrentCard);
        clearMainSpace();
        loadPropertys();
    }
}

async function loadUrls() {
    let mainUrl = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=1");
    let mainUrlAsJson = await mainUrl.json();
    //console.log(mainUrlAsJson.results);
    urlDatabase = mainUrlAsJson.results;
}

function getSearchWord() {
    document.getElementById('loadingSpinner').classList.remove('none');
    let searchValue = document.getElementById('searchValue').value;
    if (searchValue.length >= 3) {
        search(searchValue);
    } else {
        alert('Gebe bitte mindestens 3 oder mehr Buchstaben ein!');
    };
}

function search(value) {
    pokemonObjektArray = []
    let lowerCaseSearchValue = value.toLowerCase();      //set value to lower case so its equeal to names of object                //set string to lowerCase
    document.getElementById('closeSearch').classList.remove('none');
    const currentPokemonObjectArray = urlDatabase.filter(element => element.name.includes(lowerCaseSearchValue));    //search in urlDatabase for element with name of input field
    if (currentPokemonObjectArray >= 1) {
        console.log("true");
        for (let i = 0; i < currentPokemonObjectArray.length; i++) {
            console.log(currentPokemonObjectArray[i]['url']);
            fetchPokemonData(currentPokemonObjectArray[i]['url']);
        }
    } else {
        alert('Sorry, nothing found with this name!');
        closeSearch();
    }
}

function closeSearch() {
    pokemonObjektArray = []
    document.getElementById('closeSearch').classList.add('none');
    loadPropertys();
    document.getElementById('loadingSpinner').classList.add('none');
}