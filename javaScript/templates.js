function clearMainSpace() {
    return document.getElementById('mainSpace').innerHTML = '';
}

function smallCardTemplate(pokemon, i) { //render the smallCards 
    //console.log(pokemon);
   return document.getElementById('mainSpace').innerHTML += /*html*/`
    <div onclick="dialogTemplate(${i})" class="cardBody cardSmall marle16 marto16 marbo8">
    <div  class="center">
        <img id="cardPicBg_${i}" class="size" src="${pokemon[i].frontPic}">
    </div>
    <div class="tags margin8 ">
        <div id="type_1${i}" class="border">${pokemon[i].type_1}</div>
        <div id="type_2${i}" class="border">${pokemon[i].type_2}</div>
        <div class="border">${pokemon[i].id}</div>
    </div>
    <div class="tags ">
        <h1>${pokemon[i].name}</h1>
    </div>
</div>`;
}


function dialogTemplate(i) {        //load the data in the Dialog Template and execute the toggleDialog funktion
    console.log(pokemonObjektArray);
    let pokemonData = pokemonObjektArray[i]
    console.log(pokemonData);
 document.getElementById('dialog').innerHTML =/*html*/`
 <div id="dialog" class="dialogBg dialog">
        <div class="bigCardBody">
            <div class="flex spaceAround"> 
                <h2>${pokemonData.id}</h2>
                <h2>${pokemonData.name}</h2>
                <img onclick="toggleDialog()" src="./icons/close_24dp_FILL0_wght400_GRAD0_opsz24.svg">
            </div>
            <div class="flex saceAround">
                <img class="size borderNone" src="${pokemonData.frontPic}">
                <div></div>
                <img class="size borderNone" src="${pokemonData.backPic}">
            </div>
            <div class="flex center" >
                <button onclick="mainTemplate(${i})" class="buttonWidth">main</button>
                <button onclick="statsTemplate(${i})" class="buttonWidth">stats</button>
                <button onclick="evochainTemplate(${i})" class="buttonWidth">evochain</button>
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
    let pokemonData = pokemonObjektArray[i]
    document.getElementById('canvas').innerHTML = /*html*/`
    <div class="marto16">
    <table>
    <tr>
    <td>basestats</th>
    </tr>
    
    <tr>
    <td>height:</td>
    <td>${pokemonData.height}</td>
    </tr>
    
    <tr>
    <td>weight:</td>
    <td>${pokemonData.weight}</td>
    </tr>
    
    </table>
    <button onclick="playSound(${i})">scream</button>
    </div>`;
}

function playSound(i){              //plays pokemon Sound *graaahhh*
    
    let pokemonData = pokemonObjektArray[i];
    //console.log(pokemonData.scream)
    let scream = new Audio(pokemonData.scream);
    return scream.play();
}

function statsTemplate(i) {     // renders the statsTemplate in the Canvas
    let pokemonData = pokemonObjektArray[i]
     document.getElementById('canvas').innerHTML = ``;
      document.getElementById('canvas').innerHTML = /*html*/`

    <div class="canvas stats column center" id="canvas">
        <h3 class="headLineBaseStats">Base Stats</h3>
    <label for="file">Attack:</label><progress id="atk" value="${pokemonData.stats.atk}" max="100"> 32% </progress>
    <label for="file">hp:</label><progress id="hp" value="${pokemonData.stats.hp}" max="100"> 32% </progress>
    <label for="file">defense:</label><progress id="def" value="${pokemonData.stats.def}" max="100"> 32% </progress>
    <label for="file">spAttack:</label><progress id="spAtk" value="${pokemonData.stats.spAtk}" max="100"> 32% </progress>
    <label for="file">spDefense:</label><progress id="spDef" value="${pokemonData.stats.spDef}" max="100"> 32% </progress>
    <label for="file" >speed:</label><progress id="sp" value="${pokemonData.stats.sp}" max="100"> 32% </progress>
    </div>
    `;
}


function evochain() {
    return document.getElementById('canvas').innerHTML = /*html*/`
    <div>
        <img>
        <img>
        <img>
        <img>
        <img>
    </div>`

}

function toggleDialog() {                //toggle function for dialog field
document.getElementById(`dialog`).classList.toggle('none');
}

let i = 0;

function changeColor(colorCode, i){
    //console.log(i)
    document.getElementById(`cardPicBg_${i}`).style.backgroundColor = `${colorCode}`;    
}