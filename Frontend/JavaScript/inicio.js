window.onload = function () {
    mostrarApp();
    mostrarHistorialTransacciones();

}


function mostrarApp() {
    const user = localStorage.getItem('user');
    if (user) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('appContainer').style.display = 'block';
        document.getElementById('userName').innerText = user;
        document.getElementById('navUser').innerText = `Hola, ${user}`;
    } else {
        document.getElementById('loginContainer').style.display = 'flex';
        document.getElementById('appContainer').style.display = 'none';
    }

    MostrarAcciones();
    mostrarSaldos();
    mostrarHistorialTransacciones();
}

function MostrarAcciones() {

    const user = localStorage.getItem('user');
    if (user) {
        document.getElementById('accionesContainer').style.display = 'block';
        return;
    } else {
        document.getElementById('accionesContainer').style.display = 'none';
    }
}

function login() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) {
        alert("Ingresá tu nombre para continuar.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (!usuarios.includes(username)) {
        alert("El usuario no existe. Debes registrarte primero.");
        return;
    }

    localStorage.setItem('user', username);
    mostrarApp();
}

function logout() {
    localStorage.removeItem('user');
    location.reload();
}

function registrarUsuario() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username) {
        alert("Ingresá tu nombre para registrarte.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.includes(username)) {
        alert("El usuario ya existe.");
        return;
    }

    usuarios.push(username);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
}


const saldosGuardados = JSON.parse(localStorage.getItem('saldosUsuario'));
const saldosUsuario = saldosGuardados || {
    BTC: 0.5,
    ETH: 2,
    USDT: 1000,
    ARS: 10000000,
};


function getSaldoCripto(cripto) {
    return saldosUsuario[cripto] || 0;
}

function mostrarSaldos() {
    const saldoDiv = document.getElementById('saldosUsuario');
    saldoDiv.innerHTML = `
        <div class="titulo-saldo">Saldo:
        <div class="saldo-item">ARS: ${saldosUsuario.ARS.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</div></div>
        <div class="saldos-lista">
            <div class="saldo-item">Saldo de Criptomonedas:</div>
            <div class="saldo-item">BTC: ${saldosUsuario.BTC.toFixed(2)}</div>
            <div class="saldo-item">ETH: ${saldosUsuario.ETH.toFixed(2)}</div>
            <div class="saldo-item">USDT: ${saldosUsuario.USDT.toFixed(2)}</div>
        </div>
    `;

}