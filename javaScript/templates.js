function clearMainSpace() {
    return document.getElementById('mainSpace').innerHTML = '';
}

function smallCardTemplate(pokemon, i) { //render the smallCards 
    return document.getElementById('mainSpace').innerHTML += /*html*/`
    <div onclick="dialogTemplate(${i})" class="cardBody cardSmall marle16 marto16 marbo8">
    <div  class="center">
        <img id="cardPicBg_${i}" class="size" src="${pokemon.sprites.front}">
    </div>
    <div class="tags margin8 ">
        <div id="type_1${i}" class="border">${pokemon.types.type_1}</div>
        <div id="type_2${i}" class="border">${pokemon.types.type_2}</div>
        <div class="border">${pokemon.id}</div>
    </div>
    <div class="tags ">
        <h1>${pokemon.name.name}</h1>
    </div>
</div>`;
}


function dialogTemplate(i) {        //load the data in the Dialog Template and execute the toggleDialog funktion
    //console.log(pokemonObjektArray);
    let pokemonData = pokemonObjectArray[i];
    //console.log(pokemonData);
    document.getElementById('dialog').innerHTML =/*html*/`
 <div onclick="toggleDialog()" id="dialog" class="dialogBg dialog">
        <div class="bigCardBody">
            <div class="flex spaceAround">
                <img onclick="lastCard(${i})" src="./icons/arrow_back.svg"> 
                <div class='flex'>
                <h2>${pokemonData.name.name} </h2>
                </div>
                <img onclick="nextCard(${i})" src="./icons/arrow_forward.svg">
            </div>
            <div class="flex saceAround">
                <img class="size borderNone" src="${pokemonData.sprites.front}">
                <div></div>
                <img class="size borderNone" src="${pokemonData.sprites.back}">
            </div>
            <div class="flex center" >
            <button onclick="event.stopPropagation(); mainTemplate(${i})" class="buttonWidth pointer">Basis Werte</button>
                <button onclick="event.stopPropagation(); statsTemplate(${i})" class="buttonWidth pointer">Grundwerte</button>
                <button onclick="event.stopPropagation(); behaivorTemplate(${i})" class="buttonWidth pointer">Verhalten</button>
            </div>
            <div class="center">
            <div class="spacer flex center"></div>
            </div>
            <div class="center">
            <div class="canvas center" id="canvas">
            <div class="marto16">
    `;
    mainTemplate(i);
    toggleDialog();
}

function mainTemplate(i) {              //renders the MainTemplate in the Canvas
    let pokemonData = pokemonObjectArray[i]
    document.getElementById('canvas').innerHTML = /*html*/`
    <div class="marto16">
    <table>
    <tr>
    <td>Basis Werte</th>
    </tr>
    
    <tr>
    <td>pokemon ID:</td>
    <td>${pokemonData.id}</td>
    </tr>

    <tr>
    <td>Grösse:</td>
    <td>${pokemonData.height}</td>
    </tr>
    
    <tr>
    <td>Gewicht:</td>
    <td>${pokemonData.weight}</td>
    </tr>
    
    </table>
    <button class="pointer" onclick="event.stopPropagation(); playSound(${i})">Schrei!</button>
    </div>`;
}

function playSound(i) {              //plays pokemon Sound *graaahhh*

    let pokemonData = pokemonObjectArray[i];
    //console.log(pokemonData.scream)
    let scream = new Audio(pokemonData.scream);
    return scream.play();
}

function statsTemplate(i) {     // renders the statsTemplate in the Canvas
    let pokemonData = pokemonObjectArray[i]
    document.getElementById('canvas').innerHTML = ``;
    document.getElementById('canvas').innerHTML = /*html*/`

    <div class="canvas stats column center" id="canvas">
    <h3 class="headLineBaseStats">Base Stats</h3>
    <label for="file">Attack:</label><progress id="atk" value="${pokemonData.stats.atk}" max="100"> 32% </progress>
    <label for="file">hp:</label><progress id="hp" value="${pokemonData.stats.hp}" max="100"> 32% </progress>
    <label for="file">defense:</label><progress id="def" value="${pokemonData.stats.def}" max="100"> 32% </progress>
    <label for="file">spAttack:</label><progress id="spAtk" value="${pokemonData.stats.spAtk}" max="100"> 32% </progress>
    <label for="file">spDefense:</label><progress id="spDef" value="${pokemonData.stats.spDef}" max="100"> 32% </progress>
    <label for="file" >speed:</label><progress id="sp" value="${pokemonData.stats.speed}" max="100"> 32% </progress>
    </div>
    `;
}

function behaivorTemplate(i) {
    let pokemonData = pokemonObjectArray[i];
    return document.getElementById('canvas').innerHTML = /*html*/`
    <div class="behaivorText">
        ${pokemonData.text}
    </div>`;
}

function toggleDialog(){
    document.getElementById('dialog').classList.toggle('none');
}

function searchResultsTemplate(name, id){
    console.log(typeof id);
    //document.getElementById('searchResults').innerHTML= ``;
    document.getElementById('searchResults').innerHTML += /*html*/`
    <li onclick="loadSelected(${id})" class="searchResponse frame" >${name} id:${id}</li>    
    `;
    }

function clearSearchResults(){
    document.getElementById('searchResults').innerHTML=``;
}