function consultarPrecio() {
    const crypto = document.getElementById('criptoSelect').value;
    const url = `https://criptoya.com/api/${crypto}/ARS/0.1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const exchanges = Object.keys(data)
                .filter(exchange => data[exchange].ask && data[exchange].bid);

            let html = `
                <div class="tabla-cripto-container">
                    <h4 class="titulo-tabla">Precio de ${crypto} en ARS (Todos)</h4>
                    <table id="tablaCripto">
                        <thead>
                            <tr>
                                <th>Exchange</th>
                                <th>Compra (Ask)</th>
                                <th>Venta (Bid)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${exchanges.map(exchange => `
                                <tr>
                                    <td class="exchange">${exchange}</td>
                                    <td class="ask">$${data[exchange].ask.toLocaleString()}</td>
                                    <td class="bid">$${data[exchange].bid.toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            if (exchanges.length === 0) {
                html = `<div class="alerta-cripto">No hay datos disponibles para esta criptomoneda.</div>`;
            }
            document.getElementById('listaCriptos').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('listaCriptos').innerHTML = '<div class="alerta-cripto error">Error al obtener precios.</div>';
            console.error(error);
        });
}

function consultarPrecioVista() {
    const crypto = document.getElementById('criptoSelect').value;
    const url = `https://criptoya.com/api/${crypto}/ARS/0.1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let exchanges = Object.keys(data).filter(exchange => data[exchange].ask && data[exchange].bid).slice(0, 8);
            let html = `
    <div class="tabla-cripto-container-horizontal">
        <h4 class="titulo-tabla">Precio de ${crypto} en ARS</h4>
        <div class="table-responsive">
            <table class="table table-dark table-bordered text-center">
                <thead class="table-active">
                    <tr>
                        <th>Tipo</th>
                        ${exchanges.map(exchange => `<th>${exchange}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Compra (Ask)</th>
                        ${exchanges.map(exchange => `<td>$${data[exchange].ask.toLocaleString()}</td>`).join('')}
                    </tr>
                    <tr>
                        <th>Venta (Bid)</th>
                        ${exchanges.map(exchange => `<td>$${data[exchange].bid.toLocaleString()}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
`;

            if (exchanges.length === 0) {
                html = `<div class="alerta-cripto">No hay datos disponibles para esta criptomoneda.</div>`;
            }
            document.getElementById('listaCriptos').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('listaCriptos').innerHTML = '<div class="alerta-cripto error">Error al obtener precios.</div>';
            console.error(error);
        });
}

function consultarPrecioMenorAMayor() {
    const crypto = document.getElementById('criptoSelect').value;
    const url = `https://criptoya.com/api/${crypto}/ARS/0.1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const exchanges = Object.keys(data)
                .filter(exchange => data[exchange].ask && data[exchange].bid)
                .sort((a, b) => data[a].ask - data[b].ask)

            let html = `
                <div class="tabla-cripto-container">
                    <h4 class="titulo-tabla">Precio de ${crypto} en ARS (Menor a Mayor Ask)</h4>
                    <table id="tablaCripto">
                        <thead>
                            <tr>
                                <th>Exchange</th>
                                <th>Compra (Ask)</th>
                                <th>Venta (Bid)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${exchanges.map(exchange => `
                                <tr>
                                    <td class="exchange">${exchange}</td>
                                    <td class="ask">$${data[exchange].ask.toLocaleString()}</td>
                                    <td class="bid">$${data[exchange].bid.toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            if (exchanges.length === 0) {
                html = `<div class="alerta-cripto">No hay datos disponibles para esta criptomoneda.</div>`;
            }
            document.getElementById('listaCriptos').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('listaCriptos').innerHTML = '<div class="alerta-cripto error">Error al obtener precios.</div>';
            console.error(error);
        });
}

function consultarPrecioMayorAMenor() {
    const crypto = document.getElementById('criptoSelect').value;
    const url = `https://criptoya.com/api/${crypto}/ARS/0.1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const exchanges = Object.keys(data)
                .filter(exchange => data[exchange].ask && data[exchange].bid)
                .sort((a, b) => data[b].ask - data[a].ask)

            let html = `
                <div class="tabla-cripto-container">
                    <h4 class="titulo-tabla">Precio de ${crypto} en ARS (Mayor a Menor Ask)</h4>
                    <table id="tablaCripto">
                        <thead>
                            <tr>
                                <th>Exchange</th>
                                <th>Compra (Ask)</th>
                                <th>Venta (Bid)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${exchanges.map(exchange => `
                                <tr>
                                    <td class="exchange">${exchange}</td>
                                    <td class="ask">$${data[exchange].ask.toLocaleString()}</td>
                                    <td class="bid">$${data[exchange].bid.toLocaleString()}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            if (exchanges.length === 0) {
                html = `<div class="alerta-cripto">No hay datos disponibles para esta criptomoneda.</div>`;
            }
            document.getElementById('listaCriptos').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('listaCriptos').innerHTML = '<div class="alerta-cripto error">Error al obtener precios.</div>';
            console.error(error);
        });
}