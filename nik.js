const productos = {
    arandanos: {
        precio: 1500,
        imagen: "img/arandanos.jpg"
    },
    cepillo: {
        precio: 1800,
        imagen: "img/cepillo.jpg"
    },
    Papel: {
        precio: 1200,
        imagen: "img/papel.jpg"
    },
    papas: {
        precio: 1600,
        imagen: "img/papas.jpg"
    },
    mango: {
        precio: 2500,
        imagen: "img/mango.jpg"
    },
    leche: {
        precio: 3000,
        imagen: "img/leche.jpg"
    },
    queso: {
        precio: 4000,
        imagen: "img/queso.jpg"
    },
    pan: {
        precio: 3500,
        imagen: "img/pan.jpg"
    },
    dove: {
        precio: 2800,
        imagen: "img/dove.jpg"
    },
    desohorante: {
        precio: 6000,
        imagen: "img/desohorante.jpg"
    },
    agua: {
        precio: 4200,
        imagen: "img/cielo.jpg"
    },
    celular: {
        precio: 7500,
        imagen: "img/celi.jpg"
    },
    yogurt: {
        precio: 3000,
        imagen: "img/yogurt.jpg"
    },
    pony: {
        precio: 2500,
        imagen: "img/pony.jpg"
    },
    arroz: {
        precio: 4500,
        imagen: "img/arroz.jpg"
    },
    pasta: {
        precio: 3200,
        imagen: "img/pasta.jpg"
    },
    pollo: {
        precio: 12000,
        imagen: "img/pollo.jpg"
    },
    carne: {
        precio: 18000,
        imagen: "img/carne.jpg"
    },
    pescado: {
        precio: 15000,
        imagen: "img/pescado.jpg"
    },
    huevos: {
        precio: 9000,
        imagen: "img/huevos.jpg"
    }
};
const nombreInput = document.getElementById("nombre");
const precioInput = document.getElementById("precio");
const imagenProducto = document.getElementById("imagenProducto");

nombreInput.addEventListener("input", () => {

    const nombre = nombreInput.value.toLowerCase().trim();

    if (productos[nombre]) {

        precioInput.value = productos[nombre].precio;
        imagenProducto.src = productos[nombre].imagen;
        imagenProducto.style.display = "block";

    } else {

        precioInput.value = "";
        imagenProducto.src = "";
        imagenProducto.style.display = "none";

    }

});

const btnAgregar = document.getElementById("btnAgregar");
const tablaBody = document.querySelector("#tabla tbody");
const totalGeneral = document.getElementById("totalGeneral");

btnAgregar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const precio = parseFloat(document.getElementById("precio").value);

  if (!nombre || isNaN(cantidad) || isNaN(precio)) {
    alert("Por favor complete todos los campos.");
    return;
  }

  agregarProducto(nombre, cantidad, precio);
  limpiar();
});

function agregarProducto(nombre, cantidad, precio) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
            <td>${nombre}</td>

            <td>
                <button class="menos">–</button>
                <span class="cant">${cantidad}</span>
                <button class="mas">+</button>
            </td>

            <td>
                $<span class="precio">${precio}</span>
                <button class="editarPrecio">✏️</button>
            </td>

            <td>$<span class="total">${(cantidad * precio).toFixed(
              2
            )}</span></td>

            <td><button class="eliminar">🗑️</button></td>
        `;

  tablaBody.appendChild(tr);
  recalcularTotal();
}

function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("precio").value = "";
}

tablaBody.addEventListener("click", function (e) {
  const fila = e.target.closest("tr");

  if (e.target.classList.contains("mas")) {
    let cant = fila.querySelector(".cant");
    cant.textContent = parseInt(cant.textContent) + 1;
  }

  if (e.target.classList.contains("menos")) {
    let cant = fila.querySelector(".cant");
    let actual = parseInt(cant.textContent);
    if (actual > 0) cant.textContent = actual - 1;
  }

  if (e.target.classList.contains("editarPrecio")) {
    let precioSpan = fila.querySelector(".precio");
    const nuevo = prompt("Nuevo precio:", precioSpan.textContent);
    if (nuevo !== null && !isNaN(parseFloat(nuevo))) {
      precioSpan.textContent = parseFloat(nuevo);
    }
  }

  if (e.target.classList.contains("eliminar")) {
    fila.remove();
  }

  actualizarFila(fila);
  recalcularTotal();
});

function actualizarFila(fila) {
  const cant = parseInt(fila.querySelector(".cant").textContent);
  const precio = parseFloat(fila.querySelector(".precio").textContent);

  const total = fila.querySelector(".total");
  total.textContent = (cant * precio).toFixed(2);

  if (cant === 0) {
    fila.classList.add("low-stock");
  } else {
    fila.classList.remove("low-stock");
  }
}

function recalcularTotal() {
  let suma = 0;

  const totales = document.querySelectorAll("#tabla tbody .total");

  totales.forEach((t) => {
    const valor = parseFloat(t.textContent);
    if (!isNaN(valor)) {
      suma += valor;
    }
  });

  totalGeneral.textContent = "Total general: $" + suma.toFixed(2);
}