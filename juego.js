const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const punchButton = document.getElementById('punchButton');
const blockButton = document.getElementById('blockButton');
const greetButton = document.getElementById('greetButton');

// Velocidad del jugador
const playerSpeed = 5;
// --- CÓDIGO AÑADIDO: Carga de la imagen de fondo ---
const backgroundImage = new Image();// --- NUEVO CÓDIGO: Carga de sprites de jugadores ---
const playerSprite = new Image();
playerSprite.src = 'player_sprite.png'; // ¡Asegúrate de que esta ruta sea correcta!
let isPlayerSpriteLoaded = false;
playerSprite.onload = () => {
    isPlayerSpriteLoaded = true;
};

const opponentSprite = new Image();
opponentSprite.src = 'opponent_sprite.png'; // ¡Asegúrate de que esta ruta sea correcta!
let isOpponentSpriteLoaded = false;
opponentSprite.onload = () => {
    isOpponentSpriteLoaded = true;
};
// --- FIN DEL CÓDIGO NUEVO ---

backgroundImage.src = 'fondo_juego.png';
let isBgLoaded = false;
let bgX = 0; // NUEVO: Posición horizontal del fondo animado

backgroundImage.onload = () => {
    isBgLoaded = true;
};
// --- FIN DEL CÓDIGO AÑADIDO ---

// Carga la imagen de la jugadora
const jugadoraSprite = new Image();
jugadoraSprite.src = 'jugador.png';

// Carga la imagen de la oponente
const oponenteSprite = new Image();
oponenteSprite.src = 'oponente.png';


// Objeto para rastrear las teclas presionadas
const keys = {
    left: false,
    right: false
};


// Definición del personaje del jugador
const player = {
    x: 150,
    y: 350,
    width: 100,
    height: 178,
    isBlocking: false,
    health: 100,
    color: 'pink',
    isPunching: false,
    // Carácter personalizado: Mujer de unos 28 años, con cabello rosado marrón amarillento
    draw: function() {
        // Cuerpo y cabeza
        ctx.fillStyle = 'peru';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Cabello: Rosado marrón amarillento
        ctx.fillStyle = '#C2B280';
        ctx.fillRect(this.x + 20, this.y - 40, 60, 40);

        // Ojos
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + 40, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 60, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // --- CÓDIGO PARA AÑADIR LA ANIMACIÓN DE BLOQUEO ---
        if (this.isBlocking) {
            // Dibuja un escudo o una postura de bloqueo
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x + 10, this.y + 70, 80, 80);
        }
        // --- FIN DEL CÓDIGO ---


        // Brazos para golpear
        if (this.isPunching) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x + 80, this.y + 50, 50, 20); // Puño
        }
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

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const punchButton = document.getElementById('punchButton');
const blockButton = document.getElementById('blockButton');
const greetButton = document.getElementById('greetButton');

// Velocidad del jugador
const playerSpeed = 5;
// --- CÓDIGO AÑADIDO: Carga de la imagen de fondo ---
const backgroundImage = new Image();
backgroundImage.src = 'fondo_juego.png';
let isBgLoaded = false;
let bgX = 0; // Posición horizontal del fondo animado

backgroundImage.onload = () => {
    isBgLoaded = true;
};
// --- FIN DEL CÓDIGO AÑADIDO ---

// --- NUEVO CÓDIGO: LÍMITES DEL RING ---
const ringLeft = 100;
const ringRight = 700;
// --- FIN DEL CÓDIGO ---


// Objeto para rastrear las teclas presionadas
const keys = {
    left: false,
    right: false
};


// Definición del personaje del jugador
const player = {
    x: 150,
    y: 350,
    width: 100,
    height: 178,
    isBlocking: false,
    health: 100,
    color: 'pink',
    isPunching: false,
    // Carácter personalizado: Mujer de unos 28 años, con cabello rosado marrón amarillento
    draw: function() {
        // Cuerpo y cabeza
        ctx.fillStyle = 'peru';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Cabello: Rosado marrón amarillento
        ctx.fillStyle = '#C2B280';
        ctx.fillRect(this.x + 20, this.y - 40, 60, 40);

        // Ojos
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x + 40, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + 60, this.y + 40, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // --- CÓDIGO PARA AÑADIR LA ANIMACIÓN DE BLOQUEO ---
        if (this.isBlocking) {
            // Dibuja un escudo o una postura de bloqueo
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x + 10, this.y + 70, 80, 80);
        }
        // --- FIN DEL CÓDIGO ---


        // Brazos para golpear
        if (this.isPunching) {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.x + 80, this.y + 50, 50, 20); // Puño
        }
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

    // --- Dibuja la imagen de fondo animada ---
    if (isBgLoaded) {
        ctx.drawImage(backgroundImage, bgX, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, bgX + canvas.width, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    // --- FIN DEL CÓDIGO DEL FONDO ---

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
    punchButton.disabled = true;
    player.isPunching = true;
    draw();

    setTimeout(() => {
        player.isPunching = false;
        draw();
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
    punchButton.disabled = false;
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
// Escuchar los eventos del teclado
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        keys.left = true;
    }
    if (event.key === 'ArrowRight') {
        keys.right = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') {
        keys.left = false;
    }
    if (event.key === 'ArrowRight') {
        keys.right = false;
    }
});

// Función de actualización
function update() {
    // Mover al jugador si las teclas de flecha están presionadas
    if (keys.left && player.x > ringLeft) {
        player.x -= playerSpeed;
    }
    if (keys.right && player.x < ringRight - player.width) {
        player.x += playerSpeed;
    }
    
    // Asegurarse de que el oponente también esté dentro del ring
    if (opponent.x < ringLeft) {
        opponent.x = ringLeft;
    }
    if (opponent.x > ringRight - opponent.width) {
        opponent.x = ringRight - opponent.width;
    }
    
    // Mueve el fondo del juego
    bgX -= 1;
    if (bgX < -canvas.width) {
        bgX = 0;
    }
}

// Bucle principal del juego
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Iniciar el juego
gameLoop();
