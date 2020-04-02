let canvas = document.getElementById("game_screen");

if (canvas != null) {
    let last_time = 0;
    let ctx = canvas.getContext("2d");

    if (ctx != null) {
        let game_loop = function(current_time) {
            let dt = current_time - last_time;
            last_time = current_time;
            ctx.fillRect(0, 0, 40, 60);
            requestAnimationFrame(game_loop);
        }

        requestAnimationFrame(game_loop);
    } else {
        alert("No pudimos obtener el contexto del canvas! D:");
    }
} else {
    alert("El html fue bañado, recargue la página.");
}
