


let sectionElm = document.createElement("section");
sectionElm.classList.add("poke__list")

let removedPokemon = []

let options = {
    threshold: 1.0,
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {

            currentOffSet = currentOffSet + 50

            if (currentOffSet < 1304) {
                fetchPokemon(currentOffSet)
            } else {
                console.log("no more pokemon");
            }

        }
    })
}, options)

const imageObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.src = entry.target.dataset.imagesrc

            imageObserver.unobserve(entry.target)
        }
    })
})

let currentOffSet = 0

let searchContainer = document.createElement("div")





document.querySelector("header").append(searchContainer)

function fetchPokemon(offSet) {

    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=50`)
        .then(response => response.json())
        .then(data => {




            let cards = data.results.map(pokemon => {

                let pokeId = pokemon.url.slice(0, -1).split("/").pop()
                let name = pokemon.name
                let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`

                let cardElm = document.createElement("a")
                cardElm.classList.add("poke__card")
                cardElm.href = `details.html?pokemonid=${pokeId}`
                cardElm.dataset.pokeId = `${pokeId}`


                cardElm.innerHTML = `
                    
                        <p class="poke__id">#${pokeId.toString().padStart(3, '0')}</p>
                        <div class="poke__image">
                            <img src="img/placeholder.png" data-imagesrc="${sprite}" alt="">
                        </div>
                        <div class="poke__name-container">
                            <h2 class="poke__name">${capitalizeFirstLetter(name)}</h2>
                        </div>

                `;

                return cardElm

            });

            sectionElm.append(...cards)

            let observedPokemon = sectionElm.querySelector("a:nth-last-child(5)")
            if (observedPokemon) {
                observer.observe(observedPokemon);
            }

            let observedImgs = sectionElm.querySelectorAll(".poke__image img")

            console.log(observedImgs);

            if (observedImgs) {
                observedImgs.forEach(img => {
                    imageObserver.observe(img)
                })
            }

        });

    document.querySelector("main").append(sectionElm)

    sectionElm.addEventListener("click", function (e) {
        let card = e.target.closest(".poke__card"); // Ensure we get the right element
        if (!card) return; // Ignore clicks outside cards

        let currentId = card.dataset.pokeId;

        console.log("Saving to localStorage:", currentId);

        saveToLocalStorage("pokemon", currentId);
    });
}

fetchPokemon()









