function calculaPavos() {
    var moneda = document.getElementById("monedas").value;
    var pavos = parseFloat(document.getElementById("pavos").value);
    var resultado = document.getElementById("resultado");

    if (isNaN(pavos) || pavos <= 0) {
        alert("Debes ingresar una cantidad válida de pavos.");
        return;
    }

    if (moneda === "") {
        alert("Debes seleccionar una moneda.");
        return;
    }

    var precio = pavos * 0.08;
    var simbolo = "$";

    switch (moneda) {
        case "USD":
            precio /= 17.99;
            break;
        case "ARS":
            precio *= 19.47;
            break;
        case "EUR":
            precio /= 19.05;
            simbolo = "€";
            break;
        case "S/":
            precio *= 0.21;
            simbolo = "S/";
            moneda = "";
            break;
        default:
            break;
    }

    resultado.textContent = "Precio: " + simbolo + precio.toFixed(2) + " " + moneda;
}