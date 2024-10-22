const colorObjekt = {

    normal: '#a8a878', 
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    ice: '#98d8d8',
    fighting: '#c03028',
    poison: '#a040a0',
    ground: '#e0c068',
    flying: '#a890f0',
    psychic: '#f85888',
    bug: '#a8b820',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#483285',
    steel: '#b8b8d0',
    fairy: '#ee99ac',
    none: 'none',
};

function checkColor(pokemonData, index) {
    let colorObjektAsArray = Object.keys(colorObjekt);
    let type_1 = pokemonData.types.type_1;
    let type_2 = pokemonData.types.type_2;
    let key_1 = colorObjektAsArray.find((element) => element === type_1);
    let key_2 = colorObjektAsArray.find((element) => element === type_2);
    let colorCode1 = colorObjekt[key_1]; // hier muss ich die [] eckigent brackets nutzen weil ich eine variable als caller nehme
    let colorCode2 = colorObjekt[key_2];
    if(key_2 === 'none'){
        noSecType(index);
        changeColorSingle(colorCode1, index);
    }else{
        changeColorTwice(colorCode1, colorCode2, index );
    };
}

function changeColorSingle(colorCode, i) {
    //console.log(i)
    document.getElementById(`cardPicBg_${i}`).style.backgroundColor = `${colorCode}`;
}

function noSecType(i){                  //hides second classtype if is none
    document.getElementById(`type_2${i}`).classList.add('none');
}

function changeColorTwice(colorCode1, colorCode2, i ){              //gradient for second type
    document.getElementById(`cardPicBg_${i}`).style.background=` linear-gradient(135deg, ${colorCode1}, ${colorCode2})`;
}