const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const punchButton = document.getElementById('punchButton');
const blockButton = document.getElementById('blockButton');
const greetButton = document.getElementById('greetButton');

// Velocidad del jugador
const playerSpeed = 5;

// Carga de las imágenes del juego
const backgroundImage = new Image();
backgroundImage.src = 'fondo_juego.png';
let isBgLoaded = false;
let bgX = 0;

backgroundImage.onload = () => {
    isBgLoaded = true;
};

// Imágenes de los jugadores
const jugadoraSprite = new Image();
jugadoraSprite.src = 'jugador.png';

const oponenteSprite = new Image();
oponenteSprite.src = 'oponente.png';

// Imágenes de las animaciones de caminar
const jugadoraWalk1Sprite = new Image();
jugadoraWalk1Sprite.src = 'jugadora_walk1.png';
const jugadoraWalk2Sprite = new Image();
jugadoraWalk2Sprite.src = 'jugadora_walk2.png';

const oponenteWalk1Sprite = new Image();
oponenteWalk1Sprite.src = 'oponente_walk1.png';
const oponenteWalk2Sprite = new Image();
oponenteWalk2Sprite.src = 'oponente_walk2.png';


// Límites del ring
const ringLeft = 100;
const ringRight = 700;


// Variables de estado y animación
const keys = {
    left: false,
    right: false
};

let playerAnimationState = 'idle';
let playerAnimationFrame = 0;
let playerAnimationTimer = 0;
const animationSpeed = 10;

let opponentAnimationState = 'idle';
let opponentAnimationFrame = 0;
let opponentAnimationTimer = 0;


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
    draw: function() {
        let currentSprite;
        
        if (playerAnimationState === 'walking') {
            if (playerAnimationFrame === 0) {
                currentSprite = jugadoraWalk1Sprite;
            } else {
                currentSprite = jugadoraWalk2Sprite;
            }
        } else {
            currentSprite = jugadoraWalk1Sprite;
        }
        
        ctx.drawImage(currentSprite, this.x, this.y, this.width, this.height);
    },
    greet: function() {
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
        let currentSprite;
        
        if (opponentAnimationState === 'walking') {
            if (opponentAnimationFrame === 0) {
                currentSprite = oponenteWalk1Sprite;
            } else {
                currentSprite = oponenteWalk2Sprite;
            }
        } else {
            currentSprite = oponenteWalk1Sprite;
        }
        
        ctx.drawImage(currentSprite, this.x, this.y, this.width, this.height);
    }
};

// Función para dibujar todo en el canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isBgLoaded) {
        ctx.drawImage(backgroundImage, bgX, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, bgX + canvas.width, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    player.draw();
    opponent.draw();

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
        setTimeout(opponentPunch, 1000);
    }
}

// Función para que el oponente golpee
function opponentPunch() {
    if (player.health > 0) {
        if (Math.random() > 0.5) {
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
    }, 1500);
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
    // Lógica del movimiento del jugador
    if (keys.left && player.x > ringLeft) {
        player.x -= playerSpeed;
    }
    if (keys.right && player.x < ringRight - player.width) {
        player.x += playerSpeed;
    }
    
    // Lógica de animación para el jugador
    if (keys.left || keys.right) {
        playerAnimationState = 'walking';
    } else {
        playerAnimationState = 'idle';
    }
    
    playerAnimationTimer++;
    if (playerAnimationTimer >= animationSpeed) {
        playerAnimationFrame = (playerAnimationFrame + 1) % 2;
        playerAnimationTimer = 0;
    }
    
    // El oponente aún no se mueve, así que se queda en idle
    opponentAnimationState = 'idle';
    opponentAnimationTimer++;
    if (opponentAnimationTimer >= animationSpeed) {
        opponentAnimationFrame = (opponentAnimationFrame + 1) % 2;
        opponentAnimationTimer = 0;
    }

    if (opponent.x < ringLeft) {
        opponent.x = ringLeft;
    }
    if (opponent.x > ringRight - opponent.width) {
        opponent.x = ringRight - opponent.width;
    }
    
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

