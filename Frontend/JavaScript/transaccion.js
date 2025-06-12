function obtenerMonedaId(cripto) {
    const monedas = {
        "BTC": 1,
        "ETH": 2,
        "USDT": 3

    };

    return monedas[cripto] || null;
}

function comprarCripto() {
    const cripto = document.getElementById('criptoSelect').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const total = parsearARS(document.getElementById('totalCompra').value);
    let fecha = new Date();

    if (total > saldosUsuario.ARS) {
        document.getElementById('mensajeCompra').innerHTML = `No tienes suficiente saldo en ARS para comprar ${cantidad} ${cripto}. Saldo disponible: ${saldosUsuario.ARS}`;
        return;
    }

    saldosUsuario[cripto] = getSaldoCripto(cripto) + cantidad;
    saldosUsuario.ARS -= total;
    localStorage.setItem('saldosUsuario', JSON.stringify(saldosUsuario));
    document.getElementById('mensajeCompra').innerHTML = `Has comprado ${cantidad} ${cripto} por un total de ${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} ARS el ${fecha.toLocaleString()}. ¡Felicidades!`;

    mostrarSaldos();
    guardarTransaccion('compra', cripto, cantidad, total, fecha);
    mostrarHistorialTransacciones();
}


function venderCripto() {
    const cripto = document.getElementById('criptoSelect').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const total = parsearARS(document.getElementById('totalCompra').value);

    const saldoDisponible = getSaldoCripto(cripto);

    if (cantidad > saldoDisponible) {
        document.getElementById('mensajeCompra').innerHTML = `No tienes suficiente saldo de ${cripto} para vender. Saldo disponible: ${saldoDisponible}`;
        return;
    }

    saldosUsuario[cripto] -= cantidad;
    saldosUsuario.ARS += total;
    localStorage.setItem('saldosUsuario', JSON.stringify(saldosUsuario));
    document.getElementById('mensajeCompra').innerHTML = `Has vendido ${cantidad} ${cripto} por un total de ${total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} ARS. ¡Gracias por usar nuestro servicio!`;
    mostrarSaldos();
    guardarTransaccion('venta', cripto, cantidad, total);
    mostrarHistorialTransacciones();
}

function calcularTotal() {
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const crypto = document.getElementById('criptoSelect').value;

    if (!cantidad || cantidad <= 0) {
        document.getElementById('totalCompra').value = '';
        return;
    }
    const url = `https://criptoya.com/api/${crypto}/ARS/0.1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const primerExchange = Object.values(data)[0];
            const precio = primerExchange.ask || primerExchange.price;
            if (precio) {
                const total = cantidad * precio;
                document.getElementById('totalCompra').value = total.toLocaleString('es-AR', {
                    style: 'currency',
                    currency: 'ARS'
                });
            } else {
                document.getElementById('totalCompra').value = '';
            }
        })
        .catch(error => {
            document.getElementById('totalCompra').value = '';
        });
}

function parsearARS(valor) {

    return parseFloat(valor.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'));
    1
}

function guardarTransaccion(tipo, cripto, cantidad, total, fecha = new Date()) {
    const transaccionLocal = {
        fecha: fecha.toLocaleString(),
        tipo,
        cripto,
        cantidad,
        total
    };

    let historial = JSON.parse(localStorage.getItem('historialTransacciones')) || [];
    historial.unshift(transaccionLocal);
    localStorage.setItem('historialTransacciones', JSON.stringify(historial));


    enviarTransaccion(tipo, cripto, cantidad, total, fecha);
}

function enviarTransaccion(tipo, cripto, cantidad, montoARS, fecha) {
    const precioUnitario = montoARS / cantidad;

    const transaccion = {
        tipo: tipo,
        cantidad: cantidad, // <--- Cambia aquí
        precioUnitario: precioUnitario,
        montoARS: montoARS,
        fechaHora: fecha.toISOString(),
        monedaId: obtenerMonedaId(cripto)
    };

    fetch('https://localhost:7237/api/API', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transaccion)
        })
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta del backend");
            return response.json();
        })
        .then(data => {
            console.log('Transacción guardada en el backend:', data);
            document.getElementById('mensajeCompra').innerHTML = 'Transacción registrada exitosamente.';
        })
        .catch(error => {
            console.error('Error al enviar la transacción:', error);
            document.getElementById('mensajeCompra').innerHTML = 'Error al registrar la transacción.';
        });
    const monedaId = obtenerMonedaId(cripto);
    if (monedaId == null) {
        console.error("Moneda no válida o no encontrada.");
        return;
    }

}

function mostrarHistorialTransacciones() {
    const url = 'https://localhost:7237/api/transacciones';

    fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta del backend");
            return response.json();
        })
        .then(data => {
            const historial = document.getElementById('historialTransacciones');
            historial.innerHTML = '';
            let html = `
                <div class="historial-transacciones">
                <h4 class="titulo-tabla">Historial de transacciones</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Moneda</th>
                            <th>Cantidad</th>
                            <th>Total ARS</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(tx => {
                    const cantidad = Number(tx.cantidad);
                    const montoARS = Number(tx.montoARS);
                    html += `
                        <tr>
                            <td>${new Date(tx.fechaHora).toLocaleString('es-AR')}</td>
                            <td style="text-transform:capitalize;">${tx.tipo}</td>
                            <td>${tx.moneda.abreviatura}</td>
                            <td>${cantidad}</td>
                            <td>${isNaN(montoARS) ? '-' : montoARS.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                        </tr>
                    `;
                });
            } else {
                html += `<tr><td colspan="5">No hay transacciones disponibles</td></tr>`;
            }

            html += `
                    </tbody>
                </table>
                </div>
            `;

            historial.innerHTML = html;
        })
        .catch(error => {
            console.error("Error al obtener el historial:", error);
        });
}


document.getElementById('cantidad').addEventListener('input', calcularTotal);
document.getElementById('criptoSelect').addEventListener('change', calcularTotal);

document.getElementById('compraForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const accion = document.querySelector('input[name="accion"]:checked').value;
    if (accion == "compra") {
        comprarCripto();
    } else if (accion == "venta") {
        venderCripto();
    }
});

//localStorage.clear();