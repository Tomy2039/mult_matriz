function crearMatrices() {
    const filasA = parseInt(document.getElementById("filasA").value);
    const columnasA = parseInt(document.getElementById("columnasA").value);
    const columnasB = parseInt(document.getElementById("columnasB").value);
    const contenedor = document.getElementById("matrices");

    if (isNaN(filasA) || isNaN(columnasA) || isNaN(columnasB) || filasA <= 0 || columnasA <= 0 || columnasB <= 0) {
        alert("Ingresa valores válidos.");
        return;
    }

    contenedor.innerHTML = "<h3>Matriz A</h3>";
    for (let i = 0; i < filasA; i++) {
        for (let j = 0; j < columnasA; j++) {
            contenedor.innerHTML += `<input type="number" id="a-${i}-${j}" required>`;
        }
        contenedor.innerHTML += "<br>";
        contenedor.innerHTML += "<h3>x</h3>"
    }
    contenedor.innerHTML += "<h3>Matriz B</h3>";
    for (let i = 0; i < columnasA; i++) {
        for (let j = 0; j < columnasB; j++) {
            contenedor.innerHTML += `<input type="number" id="b-${i}-${j}" required>`;
        }
        contenedor.innerHTML += "<br>";
    }
}

function enviarMultiplicacion() {
    const filasA = parseInt(document.getElementById("filasA").value);
    const columnasA = parseInt(document.getElementById("columnasA").value);
    const columnasB = parseInt(document.getElementById("columnasB").value);

    const matriz1 = [];
    const matriz2 = [];

    for (let i = 0; i < filasA; i++) {
        const fila = [];
        for (let j = 0; j < columnasA; j++) {
            const val = document.getElementById(`a-${i}-${j}`).value;
            if (val === "" || isNaN(val)) {
                alert("Completa todos los campos con números.");
                return;
            }
            fila.push(Number(val));
        }
        matriz1.push(fila);
    }

    for (let i = 0; i < columnasA; i++) {
        const fila = [];
        for (let j = 0; j < columnasB; j++) {
            const val = document.getElementById(`b-${i}-${j}`).value;
            if (val === "" || isNaN(val)) {
                alert("Completa todos los campos con números.");
                return;
            }
            fila.push(Number(val));
        }
        matriz2.push(fila);
    }

    fetch('/multiplicar_matriz', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(res => res.json())
    .then(data => mostrarResultado(data.resultado))
    .catch(error => console.error('Error:', error));
}

function mostrarResultado(matriz_total) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";
    matriz_total.forEach(fila => {
        fila.forEach(num => {
            contenedor.innerHTML += `<span>${num}</span>`;
        });
        contenedor.innerHTML += "<br>";
    });
}
