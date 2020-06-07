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

document.ontouchstart = function() {
    input_system.space.is_down = true;
};

document.ontouchend = function() {
    input_system.space.is_down = false;
};

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
};

class CollisionRect {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

};

class Gladosaurio {
    constructor() {
        this.position = new Vector(20, 0);
        this.velocity = new Vector(0, 0);
        this.can_jump = true;
        this.has_jump = false;
        this.time_in_air = 0.0;
        this.max_time_in_air = 100.0;
    }

    update = function(dt) {
        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;

        /// Esto es muy estupido para colisiones!!
        if (this.position.y > canvas.height - 20) {
            this.velocity.y = 0;
            this.position.y = canvas.height - 20;
            this.can_jump = true;
            this.has_jump = false;
            this.time_in_air = 0.0;
        } else {
            this.velocity.y += 0.1;
        }
    }

    jump = function(dt) {
        if (this.can_jump) {
            this.has_jump = true;
            this.can_jump = false;
        }
        if (this.has_jump && this.time_in_air < this.max_time_in_air) {
            this.velocity.y  -= 0.2;
            this.time_in_air += dt;
        }
    }
};


let canvas = document.getElementById("game_screen");

if (canvas != null) {
    // TODO(Misael): This is not good at all, maybe implement that
    // thing about the event listener?
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
