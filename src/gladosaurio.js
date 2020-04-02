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

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
};

class Gladosaurio {
    constructor() {
        this.position = new Vector(20, 0);
        this.velocity = new Vector(0, 0);
    }

    update = function(dt) {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;

        /// Esto es muy estupido para colisiones!!
        if (this.position.y > canvas.height - 20) {
            this.velocity.y = -0.1;
        }

        this.velocity.y += 0.1;
    }

    jump = function(dt) {
        this.velocity.y -= 0.2;
    }
};


let canvas = document.getElementById("game_screen");

if (canvas != null) {
    let last_time = 0;
    let ctx = canvas.getContext("2d");

    if (ctx != null) {

        var gladosaurio = new Gladosaurio();
        let game_loop = function(current_time) {
            // Calculamos nuestra diferencia de tiempo.
            let dt = current_time - last_time;
            last_time = current_time;

            // Limpiar la pantalla
            ctx.fillStyle = "#AA00AA";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if (input_system.space.is_down) {
                gladosaurio.jump(dt);
            }

            gladosaurio.update(dt);

            ctx.fillStyle = "#000";
            ctx.fillRect(gladosaurio.position.x, gladosaurio.position.y, 10, 15);

            requestAnimationFrame(game_loop);
        }

        requestAnimationFrame(game_loop);
    } else {
        alert("No pudimos obtener el contexto del canvas! D:");
    }
} else {
    alert("El html fue bañado, recargue la página.");
}
