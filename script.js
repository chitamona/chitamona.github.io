const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const punchButton = document.getElementById('punchButton');
const blockButton = document.getElementById('blockButton');
const greetButton = document.getElementById('greetButton');

// Definición del personaje del jugador
const player = {
    x: 150,
    y: 350,
    width: 100,
    height: 178, // 1.78 m de alto (representación simplificada)
    isBlocking: false,
    health: 100,
    color: 'pink',
    //isPunching: false,: Mujer de unos 28 años, con cabello rosado marrón amarillento
    draw: function() {
        // Cuerpo y cabeza
        ctx.fillStyle = 'peru'; // Tono de piel promedio
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Cabello: Rosado marrón amarillento
        ctx.fillStyle = '#C2B280'; // Color que se asemeja a la descripción
        ctx.fillRect(this.x + 20, this.y - 40, 60, 40);

        // Ojos
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + 40, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 60, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();

        // Brazos para golpear
        if (this.isPunching)
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x + 80, this.y + 50, 50, 20); // Puño
    },
    // Gestos de saludo
    greet: function() {
        // Muestra un mensaje amigable
        ctx.font = '24px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText("¡Hola, amigo!", this.x + this.width + 20, this.y + 50);
    }
};

// Definición del oponente
const opponent = {
    x: 550,
    y: 350,
    width: 100,
    height: 150,
    health: 100,
    color: 'gray',
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // Oponente básico
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x - 30, this.y + 50, 50, 20);
    }
};

// Función para dibujar todo en el canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    opponent.draw();

    // Mostrar vida
    ctx.fillStyle = 'red';
    ctx.font = '24px Arial';
    ctx.fillText(`Tu Salud: ${player.health}`, 50, 50);
    ctx.fillText(`Salud Oponente: ${opponent.health}`, 500, 50);
}

// Función para golpear
function punch() {
    function punch() {
    function punch() {
    punchButton.disabled = true; // Deshabilita el botón de golpe
    player.isPunching = true;    // Activa la animación del puño

    setTimeout(() => {
        player.isPunching = false; // Desactiva la animación después de 200 ms
        draw(); // Redibuja el canvas para ocultar el puño
    }, 200);
        
    if (opponent.health > 0) {
        if (!opponent.isBlocking) {
            opponent.health -= 10;
        } else {
            console.log("El oponente bloqueó el golpe.");
        }
        if (opponent.health <= 0) {
            alert("¡Ganaste!");
        }
        // El oponente responde
        setTimeout(opponentPunch, 1000);
    }
}

// Función para que el oponente golpee
function opponentPunch() {
    if (player.health > 0) {
        if (Math.random() > 0.5) { // 50% de probabilidad de golpear
            if (!player.isBlocking) {
                player.health -= 15;
            } else {
                console.log("Bloqueaste el golpe del oponente.");
            }
        }
        if (player.health <= 0) {
            alert("¡Perdiste!");
        }
        draw();
    }
}

// Función para bloquear
function block() {
    player.isBlocking = true;
    setTimeout(() => {
        player.isBlocking = false;
    }, 1500); // Bloquea por 1.5 segundos
}

// Escuchar los clics de los botones
punchButton.addEventListener('click', punch);
blockButton.addEventListener('click', block);
greetButton.addEventListener('click', player.greet);

// Iniciar el juego
draw();
