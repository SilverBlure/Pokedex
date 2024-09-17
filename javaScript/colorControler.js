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

//console.log(colorObjekt[2]);     // wenn man die keys ausloggt bekommt man ein array mit Keys

function checkColor(pokemonData, index) {
    
    let colorObjektAsArray = Object.keys(colorObjekt);
    let type_1 = pokemonData.type_1;
    let key = colorObjektAsArray.find((element) => element === type_1);
    let colorCode = colorObjekt[key]; // hier muss ich die [] eckigent brackets nutzen weil ich eine variable als caller nehme
    //console.log(colorCode);   
    changeColor(colorCode, index);
    
    

    //console.log(Object.keys(colorObjekt),);

}