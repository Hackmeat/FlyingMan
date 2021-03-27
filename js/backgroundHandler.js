class BackgroundHandler {

    constructor(gameWidth, gameHeight, game) {

        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.game = game

        this.backgroundPicture = document.getElementById('background')
        this.startPlank = document.getElementById('startplank')
        this.boostIndicator = document.getElementById('boostIndicator')
        this.indicatorArrow = document.getElementById('indicatorArrow')

        this.moveBoost = false

        this.firstImageX = 0
        this.ImageY = 0
        this.secondImageX = 1200
        this.startImageX = 0
        this.drawOnce = 0
        this.boostX = this.gameWidth / 2 - 130
        this.boostY = 15
    }

    draw(ctx) {
        //Drawing two images which are looping one after another
        ctx.drawImage(this.backgroundPicture, this.firstImageX, this.ImageY)
        ctx.drawImage(this.backgroundPicture, this.secondImageX, this.ImageY)
        if (this.firstImageX > -300) {
            ctx.drawImage(this.startPlank, this.startImageX, this.gameHeight - 40)
        }
        //Drawing the boost indicator
        ctx.drawImage(this.boostIndicator, this.boostX, this.boostY)
        ctx.drawImage(this.indicatorArrow, this.boostX - 5 + this.game.gameStartSpeed * 5, this.boostY + 95)
        if (this.game.hasStarted) {
            ctx.font = "bold 50px Arial"
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText("HOLD SPACE TO BOOST", this.gameWidth / 2, this.boostY + 155)
            ctx.fillStyle = '#000'
            ctx.strokeText("HOLD SPACE TO BOOST", this.gameWidth / 2, this.boostY + 155)
        }
    }

    update(deltaTime) {
        if (this.game.hasStarted && this.game.boostRunning) {
            //Calculating when to place the first image at the end of the other one
            this.firstImageX -= this.game.gameSpeedX
            this.secondImageX -= this.game.gameSpeedX
            this.startImageX -= this.game.gameSpeedX
            if (this.secondImageX < -1400) {
                this.secondImageX = 1200
            }
            if (this.firstImageX < -1400) {
                this.firstImageX = 1200
            }
            if (this.boostY <= 30 && !this.moveBoost) {
                this.boostY += 3
            } else if (this.boostY > 25) {
                this.moveBoost = true
            }
            if (this.moveBoost) {
                this.boostY -= 5
            }
        }

    }
}