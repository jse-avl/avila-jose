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
                
                // Actualizar las habilidades
                const abilitiesList = document.getElementById('abilities-list');
                abilitiesList.innerHTML = '';
                data.abilities.forEach(ability => {
                    const li = document.createElement('li');
                    li.textContent = ability.ability.name;
                    abilitiesList.appendChild(li);
                });

                // Obtener y actualizar la cadena evolutiva
                fetch(data.species.url)
                    .then(response => response.json())
                    .then(speciesData => fetch(speciesData.evolution_chain.url))
                    .then(response => response.json())
                    .then(evolutionData => {
                        const evolutionList = document.getElementById('evolution-list');
                        evolutionList.innerHTML = '';
                        let currentEvolution = evolutionData.chain;
                        while (currentEvolution) {
                            const li = document.createElement('li');
                            li.textContent = currentEvolution.species.name;
                            evolutionList.appendChild(li);
                            currentEvolution = currentEvolution.evolves_to[0];
                        }
                    });

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
