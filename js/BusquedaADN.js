const cargarFormularioADN = () => {
    const ADNForm = document.getElementById('ADN-form');
    ADNForm.innerHTML = `
        <form id="ADNf">
            <div class="search-container-ADN">
                <input type="number" id="secuenciaIngresada" oninput="limitarDigitos(this, 20)" placeholder="Buscar ADN..." required>
                <a id="boton-buscar" href="#ADN-sec">Buscar</a>
            </div>
            <div id="ResultadosDiv"></div>
        </form>
    `;

    document.getElementById("boton-buscar").addEventListener("click", encontrarCoincidencias);
}

function encontrarCoincidencias() {
    const secuenciaIngresada = document.getElementById("secuenciaIngresada").value;
    const resultadosDiv = document.getElementById("ResultadosDiv");

    let ciudadanos = listaCiudadanos; // Asumo que listaCiudadanos es una variable global

    const ciudadanosOrdenados = ciudadanos.slice().sort((a, b) => {
        let similitudA = 0; // Cambiado a let
        let similitudB = 0; // Cambiado a let

        for (let j = 0; j < secuenciaIngresada.length; j++) {
            if (secuenciaIngresada[j] === a.codigo_adn[j]) {
                similitudA++;
            }
            if (secuenciaIngresada[j] === b.codigo_adn[j]) {
                similitudB++;
            }
        }

        return similitudB - similitudA; // Orden descendente de similitud
    });

    resultadosDiv.innerHTML = "<h1>Resultados Obtenidos</h1>";
    for (let i = 0; i < 5 && i < ciudadanosOrdenados.length; i++) { // Añadida condición para asegurarse de que no se exceda el tamaño del array
        const ciudadano = ciudadanosOrdenados[i];

        resultadosDiv.innerHTML += `
            <div>
                <p>Nombre: ${ciudadano.nombre_completo}</p>
                <p>Código ADN: ${ciudadano.codigo_adn}</p>
            </div>
        `;
    }
}


