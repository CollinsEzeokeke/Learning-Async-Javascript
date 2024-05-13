import fetch from 'node-fetch'; 

interface PokemonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

// First method of making promises

fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
.then(res => res.json())
// .then((data: any) => data as PokemonList) //this is just if typescript isn't identifying my PokemonList as the type for the promise data
.then((data: PokemonList) => console.log(data));

