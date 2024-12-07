class PokemonAPI {
    static fetchPokemon(pokemonName) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching data:', error);
                throw new Error('No se pudo encontrar el Pokémon. Por favor, intenta con otro nombre.');
            });
    }
}