let sectionElm = document.createElement("section");
sectionElm.classList.add("poke__details")

let currentPoke = readFromLocalStorage("pokemon")
document.querySelector("#root").classList.add("details")

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
            #${data.id}
        `

        let pokeBall = document.createElement("div");
        pokeBall.classList.add("poke__ball");

        pokeBall.innerHTML = `
            <img src="img/Pokeball.png" alt="">
        `


        document.querySelector("nav").append(goToFront, pokeName, pokeId)
        document.querySelector("header").append(pokeBall)
    })

document.querySelector("main").append(sectionElm);