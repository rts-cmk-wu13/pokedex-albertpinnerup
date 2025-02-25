let sectionElm = document.createElement("section");
sectionElm.classList.add("poke__details")

let currentPoke = readFromLocalStorage("pokemon")
document.querySelector("#root").classList.add("details")

if (currentPoke == 1) {
    let arrowRight = document.createElement("a")
    arrowRight.href = `details.html?pokemonid=${parseInt(currentPoke) + 1}`;

    arrowRight.className = "poke__right"
    
    arrowRight.addEventListener("click", () => {
        
        let currentId = parseInt(currentPoke) + 1;
        saveToLocalStorage("pokemon", currentId)
    })
    arrowRight.innerHTML = `
        <i class="fa-solid fa-chevron-right"></i>
    `

    document.querySelector("header").append(arrowRight)
} else if (currentPoke == 1304) {
    let arrowLeft = document.createElement("a")
    arrowLeft.href = `details.html?pokemonid=${parseInt(currentPoke) - 1}`
    
    arrowLeft.addEventListener("click", () => {

        let currentId = parseInt(currentPoke) - 1;
        saveToLocalStorage("pokemon", currentId)
    })
    arrowLeft.innerHTML = `
        <i class="fa-solid fa-chevron-left"></i>
    `

    document.querySelector("header").append(arrowLeft)
} else {

    let arrowRight = document.createElement("a")
    let arrowLeft = document.createElement("a")

    arrowRight.className = "poke__right"
    arrowLeft.className = "poke__left"

    arrowLeft.href = `details.html?pokemonid=${parseInt(currentPoke) - 1}`
    arrowRight.href = `details.html?pokemonid=${parseInt(currentPoke) + 1}`
    
    arrowRight.addEventListener("click", () => {

        let currentId = parseInt(currentPoke) + 1;
        saveToLocalStorage("pokemon", currentId)
    })

    arrowLeft.addEventListener("click", () => {

        let currentId = parseInt(currentPoke) - 1;
        saveToLocalStorage("pokemon", currentId)
    })

    arrowRight.innerHTML = `
        <i class="fa-solid fa-chevron-right"></i>
    `
    arrowLeft.innerHTML = `
    <i class="fa-solid fa-chevron-left"></i>
`

    document.querySelector("header").append(arrowLeft, arrowRight)
}

fetch(`https://pokeapi.co/api/v2/pokemon/${currentPoke}/`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        divElm.style.backgroundColor = `var(--type-${data.types[0].type.name})`

        let goToFront = document.createElement("a");
        goToFront.classList.add("poke__gotofront");
        goToFront.href = "index.html"

        goToFront.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.89992 20.9666L0.633252 11.6999C0.522141 11.5888 0.444363 11.4777 0.399919 11.3666C0.355474 11.2555 0.333252 11.1333 0.333252 10.9999C0.333252 10.8666 0.355474 10.7444 0.399919 10.6333C0.444363 10.5222 0.522141 10.4111 0.633252 10.2999L9.93325 0.999943C10.111 0.822165 10.3333 0.733276 10.5999 0.733276C10.8666 0.733276 11.0999 0.833276 11.2999 1.03328C11.4999 1.23328 11.5999 1.46661 11.5999 1.73328C11.5999 1.99994 11.4999 2.23328 11.2999 2.43328L3.73325 9.99994H20.2666C20.5555 9.99994 20.7944 10.0944 20.9833 10.2833C21.1721 10.4722 21.2666 10.7111 21.2666 10.9999C21.2666 11.2888 21.1721 11.5277 20.9833 11.7166C20.7944 11.9055 20.5555 11.9999 20.2666 11.9999H3.73325L11.3333 19.5999C11.511 19.7777 11.5999 19.9999 11.5999 20.2666C11.5999 20.5333 11.4999 20.7666 11.2999 20.9666C11.0999 21.1666 10.8666 21.2666 10.5999 21.2666C10.3333 21.2666 10.0999 21.1666 9.89992 20.9666V20.9666Z" fill="white"/>
            </svg>
        `

        let pokeName = document.createElement("h2")
        pokeName.classList.add("poke__name-details");

        pokeName.innerHTML = `
            
            ${capitalizeFirstLetter(data.name)}
        `

        let pokeId = document.createElement("p")
        pokeId.classList.add("poke__id-details");

        pokeId.innerHTML = `
            #${data.id.toString().padStart(3, '0')}
        `

        let pokeBall = document.createElement("div");
        pokeBall.classList.add("poke__ball");

        pokeBall.innerHTML = `
            <img src="img/Pokeball.png" alt="">
        `

        document.querySelector("nav").append(goToFront, pokeName, pokeId)
        document.querySelector("header").append(pokeBall)

        let id = data.species.url.slice(0, -1).split("/").pop()
        let name = data.name
        let sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`


        sectionElm.innerHTML = `
            <div class="poke__image-details">
                <img src="${sprite}" alt="">
            </div>
        `

        let typeElm = document.createElement("div")
        typeElm.classList.add("poke__type");

        typeElm.innerHTML =
            data.types.map(type =>
                `
                <p class="${type.type.name}">${capitalizeFirstLetter(type.type.name)}</p>
            `

            ).join("")

        sectionElm.append(typeElm)

        let aboutElm = document.createElement("section");
        aboutElm.classList.add("poke__about");

        aboutElm.innerHTML = `
            <h3>About</h3>
            <div class="poke__about-info">
                <div>
                    <div class="poke__about-img">
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.28333 12.0001H10.05L9 4.66675H2.33333L1.28333 12.0001ZM5.66667 3.66675C5.95556 3.66675 6.19444 3.56953 6.38333 3.37508C6.57222 3.18064 6.66667 2.94453 6.66667 2.66675C6.66667 2.37786 6.57222 2.13897 6.38333 1.95008C6.19444 1.76119 5.95556 1.66675 5.66667 1.66675C5.38889 1.66675 5.15278 1.76119 4.95833 1.95008C4.76389 2.13897 4.66667 2.37786 4.66667 2.66675C4.66667 2.94453 4.76389 3.18064 4.95833 3.37508C5.15278 3.56953 5.38889 3.66675 5.66667 3.66675ZM7.4 3.66675H9C9.25556 3.66675 9.47778 3.7473 9.66667 3.90841C9.85556 4.06953 9.96667 4.27786 10 4.53341L11.0333 11.8667C11.0778 12.1667 11.0028 12.4306 10.8083 12.6584C10.6139 12.8862 10.3611 13.0001 10.05 13.0001H1.28333C0.972223 13.0001 0.719445 12.8862 0.525001 12.6584C0.330556 12.4306 0.255556 12.1667 0.300001 11.8667L1.33333 4.53341C1.36667 4.27786 1.47778 4.06953 1.66667 3.90841C1.85556 3.7473 2.07778 3.66675 2.33333 3.66675H3.93333C3.84444 3.51119 3.77778 3.35286 3.73333 3.19175C3.68889 3.03064 3.66667 2.85564 3.66667 2.66675C3.66667 2.11119 3.86111 1.63897 4.25 1.25008C4.63889 0.861192 5.11111 0.666748 5.66667 0.666748C6.22222 0.666748 6.69444 0.861192 7.08333 1.25008C7.47222 1.63897 7.66667 2.11119 7.66667 2.66675C7.66667 2.85564 7.64444 3.03064 7.6 3.19175C7.55556 3.35286 7.48889 3.51119 7.4 3.66675ZM1.28333 12.0001H10.05H1.28333Z" fill="#1D1D1D"/>
                        </svg>
                        <p>
                            ${data.weight / 10} kg
                        </p>
                    </div>
                    
                    <p>
                        Weight
                    </p>
                </div>
                <div>
                    <div class="poke__about-img">
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 1.33325C0.5 1.06659 0.6 0.833252 0.8 0.633252C1 0.433252 1.23333 0.333252 1.5 0.333252L7.5 0.333252C7.75556 0.333252 7.98611 0.433252 8.19167 0.633252C8.39722 0.833252 8.5 1.06659 8.5 1.33325V12.6666C8.5 12.9333 8.39722 13.1666 8.19167 13.3666C7.98611 13.5666 7.75556 13.6666 7.5 13.6666H1.5C1.23333 13.6666 1 13.5666 0.8 13.3666C0.6 13.1666 0.5 12.9333 0.5 12.6666L0.5 1.33325ZM1.5 1.33325L1.5 12.6666H7.5V10.4999H4.5V9.49992H7.5L7.5 7.49992H4.5V6.49992H7.5V4.49992H4.5V3.49992L7.5 3.49992V1.33325L1.5 1.33325ZM4.5 3.49992V4.49992V3.49992ZM4.5 6.49992V7.49992V6.49992ZM4.5 9.49992V10.4999V9.49992Z" fill="#1D1D1D"/>
                        </svg> 
                        <p>
                            ${data.height / 10} m
                        </p>         
                    </div>
                    <p>
                        Height
                    </p>
                </div>
                <div>
                    <div class="moves">
                        ${data.abilities.map(ability => `
                                <p>${ability.ability.name}</p>
                            `).join("")}
                    </div>
                    <p>moves</p>
                </div>
            </div>
        `

        aboutElm.querySelector("h3").style.color = `var(--type-${data.types[0].type.name})`
        sectionElm.append(aboutElm)

        txtElm = document.createElement("div")
        txtElm.className = "poke__txt"

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then(response => response.json())
            .then(speciesData => {
                let flavorTexts = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en")

                if (flavorTexts.length > 0) {
                    let randomFlavor = flavorTexts[Math.floor(Math.random() * flavorTexts.length)].flavor_text;
                    txtElm.innerHTML = `
                        <p>${randomFlavor.replace(/\n|\f/g, " ")}</p>
                    `
                } else {
                    txtElm.innerHTML = `
                        <p>No flavor text available</p>
                    `
                }
            })
            .catch(error => console.error("Error fetching flavor text", error))

        sectionElm.append(txtElm)

        let statsSection = document.createElement("section")
        statsSection.className = "poke__stats"

        statsSection.innerHTML = `
            <h3>Base stats</h3>
            <table class="poke__stats-names">
                ${data.stats.map(stat => {

            let statNameMap = {
                "hp": "HP",
                "attack": "ATK",
                "defense": "DEF",
                "special-attack": "SATK",
                "special-defense": "SDEF",
                "speed": "SPD"
            };

            let displayName = statNameMap[stat.stat.name] || stat.stat.name.toUpperCase();

            return `
                <tr>
                    <th class="stat__head">${displayName}</th>
                    <td class="stat__value">${stat.base_stat}</td>
                    <td class="poke__progress"><progress max="300" value="${stat.base_stat}"></td>
                </tr>
            `

        }).join("")}
            </table>
        `

        statsSection.querySelector("h3").style.color = `var(--type-${data.types[0].type.name})`

        statsSection.querySelectorAll(".poke__stats-names th").forEach(stat => {
            stat.style.color = `var(--type-${data.types[0].type.name})`
        });

        const progressBar = statsSection.querySelectorAll(".poke__stats-names progress")

        // progressBar.forEach(bar => {
        //     bar.style.backgroundColor = `color-mix(in srgb, var(--type-${data.types[0].type.name}) 20%, transparent)`
        // });

        changePseudoElement(data.types[0].type.name)

        
        sectionElm.append(statsSection)



    })

document.querySelector("main").append(sectionElm);

function changePseudoElement(type) {

    const cssString = `
        ::-webkit-progress-bar {
            background-color: color-mix(in srgb, var(--type-${type}) 20%, transparent);
        }

        progress {
        background-color: color-mix(in srgb, var(--type-${type}) 20%, transparent);
        webkit-appearance: none;
        &&::-moz-progress-bar {
            background-color: var(--type-${type});

        }
        &&::-webkit-progress-value {
            background-color: var(--type-${type});
        }
        
        
        `

    const styleTag = document.createElement("style");

    styleTag.innerHTML = cssString;
    document.head.insertAdjacentElement("beforeend", styleTag)
}