let divElm = document.createElement("div");
divElm.id = "root";

divElm.innerHTML = `
    <header>
        <nav>
            <ul class="menu"></ul>
        </nav>
    </header>

    <main>

    </main>

    <footer>

    </footer>
`

document.querySelector("body").append(divElm)