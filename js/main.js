let canvas = document.getElementById("gameScreen")
let ctx = canvas.getContext("2d")

const GAME_WIDTH = 1200
const GAME_HEIGHT = 600

let input = new InputHandler()
let player = new Player(GAME_WIDTH, GAME_HEIGHT, input)
let game = new Game(GAME_WIDTH, GAME_HEIGHT, input, player)
let backgroundHandler = new BackgroundHandler(GAME_WIDTH, GAME_HEIGHT, game)
let features = new GameFeatures(GAME_WIDTH, GAME_HEIGHT, game, input, player)
let shop = new Shop(GAME_WIDTH, GAME_HEIGHT, features, game, input, player)

let lastTime = 0

function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime
    lastTime = timestamp

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    backgroundHandler.draw(ctx)
    backgroundHandler.update(deltaTime)

    player.draw(ctx)
    player.update(deltaTime)

    game.draw(ctx)
    game.update(deltaTime)

    features.draw(ctx)
    features.update(deltaTime)

    shop.draw(ctx)
    shop.update(deltaTime)

    if (game.allowRestart) {
        player = new Player(GAME_WIDTH, GAME_HEIGHT, input)
        game = new Game(GAME_WIDTH, GAME_HEIGHT, input, player)
        backgroundHandler = new BackgroundHandler(GAME_WIDTH, GAME_HEIGHT, game)
        features = new GameFeatures(GAME_WIDTH, GAME_HEIGHT, game, input, player)
        shop.game = game
        shop.input = input
        shop.features = features
        shop.player = player
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);