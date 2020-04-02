class Input {
    constructor(code) {
        this.code = code;
        this.is_down = false;
    }
};

class InputSystem {
    constructor() {
        this.space = new Input("Space");
    }
};

var input_system = new InputSystem();

document.onkeydown = function(event) {
    switch (event.code) {
    case "Space":
        input_system.space.is_down = true;
        break;
    default:
    }
};

document.onkeyup = function(event) {
    switch (event.code) {
    case "Space":
        input_system.space.is_down = false;
        break;
    default:

    }
};

document.onmousedown = function(event) {
    switch (event.button) {
    case 0:
        input_system.space.is_down = true;
    default:
    }
};

document.onmouseup = function(event) {
    switch (event.button) {
    case 0:
        input_system.space.is_down = false;
    default:
    }
};


let canvas = document.getElementById("game_screen");

if (canvas != null) {
    let last_time = 0;
    let ctx = canvas.getContext("2d");

    if (ctx != null) {
        var px = 20;
        var py = 0;

        let game_loop = function(current_time) {
            // Calculamos nuestra diferencia de tiempo.
            let dt = current_time - last_time;
            last_time = current_time;

            // Limpiar la pantalla
            ctx.fillStyle = "#AA00AA";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (input_system.space.is_down) {
                py -= dt / 2;
            }

            // Calcular mundo...
            if (py < (canvas.height - 15)){
                py += dt / 5;
            }

            ctx.fillStyle = "#000";
            ctx.fillRect(px, py, 10, 15);


            requestAnimationFrame(game_loop);
        }

        requestAnimationFrame(game_loop);
    } else {
        alert("No pudimos obtener el contexto del canvas! D:");
    }
} else {
    alert("El html fue bañado, recargue la página.");
}
