class Game {

    constructor(gameWidth, gameHeight, input, player) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.input = input
        this.player = player

        this.hasStarted = false
        this.startCountdown = false
        this.setM = false
        this.drawCountdown = false
        this.enterPressed = false
        this.gameStartSpeedUp = true
        this.gameStartSpeedDown = false
        this.boostRunning = false
        this.gameSpeedSet = false
        this.isFinished = false
        this.allowRestart = false
        this.gameSpeedXSet = false
        this.gameSpeedYSet = false 
        this.xIsFalling = false
        this.yIsFalling = false
        this.rocketBoost = false
        
        this.distance = 0
        this.countdown = 2
        this.gameStartSpeed = 0
        this.startSpeed = 0
        this.gameSpeedX = 1
        this.gameSpeedY = -1
        this.groundTouched = 1
        this.boostFactor = 2
        this.furtherJump = 1
        this.higherJump = 1
        

    }

    draw(ctx) {
        if (!this.startCountdown && !this.hasStarted) {
            ctx.font = "bold 50px Arial"
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText("PRESS ENTER TO START", this.gameWidth / 2, this.gameHeight / 4 + 20)
            ctx.fillStyle = '#000'
            ctx.strokeText("PRESS ENTER TO START", this.gameWidth / 2, this.gameHeight / 4 + 20)
            if (!this.spacePressed) {
                document.addEventListener("keyup", event => {
                    switch (event.keyCode) {
                        case 13:
                            this.startCountdown = true
                            this.enterPressed = true
                            break
                    }
                })
            }
        }
        if (this.drawCountdown) {
            ctx.font = "bold 50px Arial"
            ctx.fillStyle = '#fff'
            ctx.textAlign = 'center'
            ctx.fillText(this.countdown, this.gameWidth / 2, this.gameHeight / 4 + 20)
            ctx.fillStyle = '#000'
            ctx.strokeText(this.countdown, this.gameWidth / 2, this.gameHeight / 4 + 20)
        }
        if (this.isFinished) {
        }
    }

    update(deltaTime) {
        //Countdown
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
        //Start boost counter
        if (this.hasStarted && this.input.spacePressed && !this.boostRunning) {
            if (this.gameStartSpeed < 50 && this.gameStartSpeedUp) {
                this.gameStartSpeed++
            } else if (this.gameStartSpeed == 50 && this.gameStartSpeedUp) {
                this.gameStartSpeedUp = false
                this.gameStartSpeedDown = true
                this.gameStartSpeed--
            } else if (this.gameStartSpeed > 1 && this.gameStartSpeedDown) {
                this.gameStartSpeed--
            } else if (this.gameStartSpeed == 1) {
                this.gameStartSpeed++
                this.gameStartSpeedUp = true
                this.gameStartSpeedDown = false
            }
        }

        //Boost and Fly Physiks && Collision
        if (!this.input.spacePressed && this.gameStartSpeed != 0) {
            this.startSpeed = this.gameStartSpeed * this.boostFactor
            this.boostRunning = true

            //X Speed
            if(this.gameSpeedX < this.startSpeed && this.groundTouched == 1 && !this.xIsFalling){
                if(!this.gameSpeedXSet){
                    this.gameSpeedX += this.startSpeed * this.boostFactor / 2 
                    this.gameSpeedXSet = true 
                } 
                this.gameSpeedX++
            } else if (this.gameSpeedX >= this.gameSpeedX * this.boostFactor / this.groundTouched && this.groundTouched == 1) {
                this.xIsFalling = true
                this.gameSpeedX--
            }

            //Y Speed
            if(this.gameSpeedY > -50 * this.boostFactor + this.startSpeed && this.groundTouched == 1 && !this.yIsFalling){
                if(!this.gameSpeedYSet){
                    this.gameSpeedY -= (50 * this.boostFactor - this.startSpeed) / 2 
                    this.rocketBoost = true
                    this.gameSpeedYSet = true 
                } 
                this.gameSpeedY--
            } else if (this.gameSpeedY <= (50 * this.boostFactor - this.startSpeed) / 2 && this.groundTouched == 1) {
                this.gameSpeedY++
                this.yIsFalling = true
            }

            //Bounce Speed
            if(this.player.position.y >= this.gameHeight - 110){
                this.groundTouched *= 2
                this.player.position.y = this.gameHeight - 110
                this.gameSpeedY = ((-50 * this.boostFactor + this.startSpeed) / this.groundTouched ) * this.higherJump
                this.gameSpeedX = (this.startSpeed * this.boostFactor / this.groundTouched) * this.furtherJump
            }
            if(this.groundTouched > 1 && this.yIsFalling){
                this.yIsFalling = false
            }
            if(this.groundTouched > 1 && !this.yIsFalling){
                if(this.gameSpeedX >= 1){
                    this.gameSpeedX--
                }
                if(this.gameSpeedY <= (-50 * this.boostFactor + this.startSpeed / this.groundTouched) * -1){
                    this.gameSpeedY++
                }

            }

            this.player.speed.y = this.gameSpeedY
            
        }

        this.distance += this.gameSpeedX


        //Scoreboard
        if (this.gameSpeedX <= 1 && this.gameSpeedY <= 1 && this.boostRunning && this.groundTouched > 50000) {
            this.isFinished = true
        }

        //Restart
        if (this.isFinished && this.input.spacePressed) {
            this.allowRestart = true
        }
    }
}