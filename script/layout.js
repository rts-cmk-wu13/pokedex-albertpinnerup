let divElm = document.createElement("div");
divElm.id = "root";

divElm.innerHTML = `
    <header>
        <nav>
            
        </nav>
        <form action="details.html">
            <input type="search" name="pokemonid" id="id" placeholder="search">
        </form>
    </header>

    <main>

    </main>
`

document.querySelector("body").append(divElm)