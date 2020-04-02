
let last_time = 0;

let game_loop = function(current_time) {
    let dt = current_time - last_time;
    last_time = current_time;
    console.log(dt);
    requestAnimationFrame(game_loop);
}

requestAnimationFrame(game_loop);
