class Player {

    constructor(gameWidth, gameHeight, input) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.input = input

        this.playerImg = document.getElementById('player')

        this.position = {x: 30, y: this.gameHeight - 110}
        this.speed = {x: 0, y: 0}
    }

    draw(ctx) {        
        ctx.drawImage(this.playerImg, this.position.x, this.position.y)
    }

    update(deltaTime) {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }

}