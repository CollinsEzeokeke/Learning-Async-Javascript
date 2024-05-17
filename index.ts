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

interface Pokemon {
    id: number;
    name: string;
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
}

// First method of making promises

// fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20')
// .then(res => res.json())
// // .then((data: any) => data as PokemonList) //this is just if typescript isn't identifying my PokemonList as the type for the promise data
// .then((data: PokemonList) => {

//     fetch(data.results[0].url)
// .then(res => res.json())
// // .then((data: any) => data as PokemonList) //this is just if typescript isn't identifying my PokemonList as the type for the promise data
// .then((data) => {
//     console.log(data)
// });
// })
// .catch((err) => {
//     console.log(err);
// });

//second form of making promises using await 

const getPokemonList = async (): Promise<PokemonList> => {
    const listResp = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20");
    return await listResp.json();    
};

const getPokemon = async (url: string): Promise<Pokemon> => {
    const dataResp = await fetch(url);
    return await dataResp.json();
};

const firstPokemon = async (): Promise<Pokemon> => 
    new Promise(async (resolve, reject) => {
        try{
            const list = await getPokemonList();
            resolve(await getPokemon(list.results[0].url));
        } catch (error) {
            reject(error)
        }
    });

(async () => {
    try{
    const list = await getPokemonList();
    for(const listItem of list.results){
        const pokemon = await getPokemon(listItem.url)
        console.log(pokemon.name)
    }
    } catch (e) {
    console.log(e) 
    }//for errors
})();