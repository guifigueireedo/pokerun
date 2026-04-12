import fs from 'fs';

async function fetchKantoData() {
    console.log("starting to fetch kanto data");
    const pokemonList = [];

    for (let i = 1; i <= 151; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await res.json();

        const pokemon = {
            id: data.id,
            name: data.name,
            types: data.types.map( t => t.type.name ),
            stats: {
                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                speed: data.stats[5].base_stat
            },
            sprite: data.sprites.other['official-artwork'].front_default,
        };

        pokemonList.push(pokemon);
    }

    fs.writeFileSync('./src/data/kanto_dex.json', JSON.stringify(pokemonList, null, 2));
    console.log("finished fetching kanto data");
}

fetchKantoData();