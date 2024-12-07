document.getElementById('pokemon-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = document.getElementById('search').value.toLowerCase();
    
    if (pokemonName) {
        PokemonAPI.fetchPokemon(pokemonName)
            .then(data => {
                document.getElementById('pokemon-name').textContent = `${data.name} (${data.id})`;
                document.getElementById('pokemon-weight').textContent = `${data.weight} / ${data.height}`;
                document.getElementById('sprite1').src = data.sprites.front_default;
                document.getElementById('sprite2').src = data.sprites.back_default;
                document.getElementById('pokemon-info').style.display = 'block';
                
                document.getElementById('reset-button').style.visibility = 'visible';
            })
            .catch(error => {
                alert(error.message);
            });
    }
});

document.querySelector('button[type="reset"]').addEventListener('click', function() {
    document.getElementById('search').value = '';
    document.getElementById('pokemon-info').style.display = 'none';
    
    this.style.visibility = 'hidden';
});
