let sectionElm = document.createElement("section");
sectionElm.classList.add("poke__list")




let removedPokemon = []

fetch("https://pokeapi.co/api/v2/pokemon?limit=150/")
    .then(response => response.json())
    .then(data => {

        
        

        let filteredPokemons = data.results.filter((pokemon, i) => {
            

            if ((i + 1) % 3 !== 1) {
                removedPokemon.push(pokemon)
                return false
            }

            return true

        })

    
        let cards = filteredPokemons.map(pokemon => {

            let pokeId = pokemon.url.slice(0, -1).split("/").pop()
            let name = pokemon.name
            let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`

            let cardElm = document.createElement("a")
            cardElm.classList.add("poke__card")
            cardElm.href = `details.html?pokemonid=${pokeId}`
            cardElm.dataset.pokeId = `${pokeId}`
            

            cardElm.innerHTML = `
                    
                        <p class="poke__id">#${pokeId}</p>
                        <div class="poke__image">
                            <img src="${sprite}" alt="">
                        </div>
                        <div class="poke__name-container">
                            <h2 class="poke__name">${capitalizeFirstLetter(name)}</h2>
                        </div>

                `

            // fetch(`${pokemon.url}`)
            //     .then(response => response.json())
            //     .then(data => {
            //         // console.log(data);

            //         let name = data.name
            //         let pokeId = data.id

            //         let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`
            //         // console.log(sprite);

            //         // console.log(pokeId);


            //         let cardElm = document.createElement("div")
            //         cardElm.classList.add("poke__card")

            //         cardElm.innerHTML = `
            //         <p class="poke__id">#${pokeId}</p>
            //             <div class="poke__image">
            //                 <img src="${sprite}" alt="">
            //             </div>
            //             <h2 class="poke__name">${name}</h2>

            //         `


            //         sectionElm.append(cardElm)

            //     })

            return cardElm
        })

       

        sectionElm.append(...cards)
    })

document.querySelector("main").append(sectionElm)

sectionElm.addEventListener("click", function(e) {
    let card = e.target.closest(".poke__card"); // Ensure we get the right element
    if (!card) return; // Ignore clicks outside cards

    let currentId = card.dataset.pokeId;

    console.log("Saving to localStorage:", currentId);
    
    saveToLocalStorage("pokemon", currentId);
});
