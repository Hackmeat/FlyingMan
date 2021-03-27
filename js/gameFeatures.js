class GameFeatures {

    constructor(gameWidth, gameHeight, game, input, player) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.game = game
        this.input = input
        this.player = player

        this.scoreBoardX = this.gameWidth / 2 - 300
        this.scoreBoardY = -500
        this.dropSpeed = 0
        this.score = 0
        this.highScore = 0
        this.coinsScore = 0
        this.size = 700
        this.distance = 0
        this.jumpHeight = 0
        this.countdown = 3

        this.scrollUp = false
        this.scoreIsSet = false
        this.coinsScoreAdded = false
        this.startCountdown = false
        this.setM = false
        this.drawCountdown = false
        this.shopIsReady = false

        this.font = "bold " + this.size + " Arial"

        this.scoreBoard = document.getElementById('scoreBoard')
    }

    draw(ctx) {
        if (this.game.isFinished) {
            //Drawing the scoreboard after a jump is done
            ctx.drawImage(this.scoreBoard, this.scoreBoardX, this.scoreBoardY)
            ctx.font = "bold 50px Arial"
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText("PRESS SPACE TO CONTINUE", this.gameWidth / 2, this.gameHeight - 10)
            ctx.fillStyle = '#000'
            ctx.strokeText("PRESS SPACE TO CONTINUE", this.gameWidth / 2, this.gameHeight - 10)

            //Animation for the dropping scoreboard
            if (this.scoreBoardY > -60 && this.size > 1) {
                if (this.size > 30) {
                    this.size -= 20
                }
                if (this.size < 30 && this.countdown > 2) {
                    this.size = 30
                    this.scoreIsSet = true
                }
                if(this.countdown < 1){
                    this.size -= 5
                }
                this.font = "bold " + this.size + "px Arial"
                ctx.font = this.font
                ctx.fillStyle = '#000'
                ctx.fillText("SCORE: " + Math.trunc(this.highScore / 10000), this.gameWidth / 2, this.gameHeight / 4)
                ctx.fillText("DISTANCE: " + Math.trunc(this.distance / 100) + "m", this.gameWidth / 2, this.gameHeight / 4 + 50)
                ctx.fillText("HIGHEST JUMP: " + Math.trunc(this.jumpHeight / 10) + "m", this.gameWidth / 2, this.gameHeight / 4 + 100)
                this.startCountdown = true
                if (this.drawCountdown && this.countdown > 1) {
                    ctx.font = "bold 25px Arial"
                    ctx.fillStyle = '#000'
                    ctx.textAlign = 'center'
                    ctx.fillText("SHOP IN " + this.countdown, this.gameWidth / 3 * 2 - 50, this.gameHeight / 4 * 3 -50)
                }
            }

            if(this.scoreBoardY > -60 && this.size < 1){
                this.shopIsReady = true
            }
        }
    }

    update(deltaTime) {
        if (this.game.isFinished && this.scoreBoardY < -60) {
            this.scoreBoardY += this.dropSpeed
            this.dropSpeed++
            this.scoreBoardDown = true
        }
        if (this.game.gameSpeedX * this.game.gameSpeedY < 0) {
            this.score = this.jumpHeight * this.distance
        }
        if (this.score > this.highScore) {
            this.highScore = this.score
        }
        if (this.scoreBoardDown && !this.coinsScoreAdded) {
            this.coinsScore = this.highScore
            this.coinsScoreAdded = true
        }
        if (this.player.position.x > 0) {
            this.distance = this.game.distance
        }
        if ((this.player.position.y - 490) * -1 > this.jumpHeight) {
            this.jumpHeight = ((this.player.position.y - 490) * - 1)
        }

        if (this.startCountdown) {
            let d = new Date()
            let n = d.getTime()
            n = n / 1000
            if (!this.setM) {
                this.m = n
                this.setM = true
            }
            if (n - this.m > 1) {
                this.m = n
                this.drawCountdown = true
                this.countdown--
            }
            if (this.countdown < 0) {
                this.hasStarted = true
                this.startCountdown = false
                this.drawCountdown = false
            }
        }
    }

}