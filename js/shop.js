class Shop {

    constructor(gameWidth, gameHeight, features, game, input, player) {
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.features = features
        this.game = game
        this.input = input
        this.player = player

        this.sb1 = new ShopObject(400, 150, 75, 50, 0, "DOUBLE COINS", 50)
        this.sb2 = new ShopObject(550, 150, 75, 50, 0, "ROCKET BOOST", 50)
        this.sb3 = new ShopObject(700, 150, 75, 50, 0, "MULTIPLE JUMPS", 50)
        this.sb4 = new ShopObject(400, 300, 75, 50, 0, "HIGHER JUMP", 50)
        this.sb5 = new ShopObject(550, 300, 75, 50, 0, "FURTHER JUMP", 50)
        this.sb6 = new ShopObject(700, 300, 75, 50, 0, "PARACHUTE", 50)

        this.coinsAmount = 250
        this.coinsAdd = 0
        this.shopAmount = 6
        this.lvl = 0
        this.price = 0
        this.priceMuliplicator = 3

        this.shopObjectsCreated = false
        this.buyConfirmation = false
        this.drawConfirmation = false
        this.notEnoughCoins = false

        this.buyConfirmationName = ""

        this.coinImg = document.getElementById('coin')
    }

    draw(ctx) {
        //Drawing coin amount
        if (this.coinsAmount > -1) {
            ctx.drawImage(this.coinImg, 5, 5, 50, 50)
            ctx.font = "bold 50px Arial"
            ctx.fillStyle = '#000'
            ctx.textAlign = 'left'
            ctx.fillText("x" + this.coinsAmount, 55, 50)
        }

        //Drawing the shopobjects when the shop appears

        //To-Do finish 3rd and 6th shopobject
        if (this.features.shopIsReady && !this.buyConfirmation) {
            //First 
            ctx.fillStyle = '#0f0'
            ctx.fillRect(this.sb1.x, this.sb1.y, this.sb1.width, this.sb1.height)
            ctx.font = "bold 15px Arial"
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center'
            ctx.fillText(this.sb1.name, this.sb1.x + this.sb1.width / 2, this.sb1.y + this.sb1.height + 20)

            //Second 
            ctx.fillStyle = '#0ff'
            ctx.fillRect(this.sb2.x, this.sb2.y, this.sb2.width, this.sb2.height)
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center'
            ctx.fillText(this.sb2.name, this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height + 20)

            //4th 
            ctx.fillStyle = '#f00'
            ctx.fillRect(this.sb4.x, this.sb4.y, this.sb4.width, this.sb4.height)
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center'
            ctx.fillText(this.sb4.name, this.sb4.x + this.sb4.width / 2, this.sb4.y + this.sb4.height + 20)

            //5th 
            ctx.fillStyle = '#f0f'
            ctx.fillRect(this.sb5.x, this.sb5.y, this.sb5.width, this.sb5.height)
            ctx.fillStyle = '#000'
            ctx.textAlign = 'center'
            ctx.fillText(this.sb5.name, this.sb5.x + this.sb5.width / 2, this.sb5.y + this.sb5.height + 20)

        }

        //Buy confirmation
        if (this.drawConfirmation && this.features.shopIsReady) {
            ctx.font = "bold 30px Arial"
            ctx.textAlign = 'center'
            ctx.fillText("UPGRADE ", this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height - 40)
            ctx.fillText(this.buyConfirmationName, this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height)
            ctx.fillText(" TO LVL " + (this.lvl + 1) + "?", this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height + 40)
            if (!this.notEnoughCoins) {
                ctx.fillText("PRICE: " + this.price + " COINS", this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height + 90)
            }
            ctx.fillText("YES", this.sb4.x + this.sb4.width / 2, this.sb4.y + this.sb4.height + 40)
            ctx.fillText("NO", this.sb6.x + this.sb6.width / 2, this.sb6.y + this.sb6.height + 40)
            if (this.notEnoughCoins) {
                ctx.fillStyle = '#f00'
                ctx.fillText("YOU NEED " + this.price + " COINS", this.sb2.x + this.sb2.width / 2, this.sb2.y + this.sb2.height + 90)
            }
        }
    }

    update(deltaTime) {
        //Coins added based on the score and the skill level of double coins
        if(this.sb1.lvl >= 0){
            this.coinsAdd = Math.trunc(this.features.coinsScore / 100000)
            if(this.sb1.lvl == 0){
                this.coinsAmount += this.coinsAdd * 2 
            } else if (this.sb1.lvl > 0){
                this.coinsAmount += this.coinsAdd * (2 * (this.sb1.lvl + 1))
            }
            this.coinsAdd = 0
            this.features.coinsScore = 0
        }
        //Increasing the level of the other skills
        if(this.sb2.lvl >= 1 && this.game.rocketBoost){
            this.game.gameSpeedY -= 10 * this.sb2.lvl
            this.game.rocketBoost = false
        }
        if(this.sb4.lvl > 0){
            this.game.higherJump = this.sb4.lvl
        }
        if(this.sb5.lvl > 0){
            this.game.furtherJump = this.sb5.lvl
        }
        
        
        if (this.features.shopIsReady) {
            //Mouse detection for the shop & data transfer of what skill to increase
            if (this.input.leftMousePressed) {
                if (this.input.mouseX > this.sb1.x && this.input.mouseX < this.sb1.x + this.sb1.width && this.input.mouseY > this.sb1.y && this.input.mouseY < this.sb1.y + this.sb1.height) {
                    this.buyConfirmation = true
                    this.buyConfirmationName = this.sb1.name
                    this.lvl = this.sb1.lvl
                    this.price = this.sb1.price
                } else if (this.input.mouseX > this.sb2.x && this.input.mouseX < this.sb2.x + this.sb2.width && this.input.mouseY > this.sb2.y && this.input.mouseY < this.sb2.y + this.sb2.height){
                    this.buyConfirmation = true
                    this.buyConfirmationName = this.sb2.name
                    this.lvl = this.sb2.lvl
                    this.price = this.sb2.price
                } else if (this.input.mouseX > this.sb4.x && this.input.mouseX < this.sb4.x + this.sb4.width && this.input.mouseY > this.sb4.y && this.input.mouseY < this.sb4.y + this.sb2.height){
                    this.buyConfirmation = true
                    this.buyConfirmationName = this.sb4.name
                    this.lvl = this.sb4.lvl
                    this.price = this.sb4.price
                } else if (this.input.mouseX > this.sb5.x && this.input.mouseX < this.sb5.x + this.sb5.width && this.input.mouseY > this.sb5.y && this.input.mouseY < this.sb5.y + this.sb5.height){
                    this.buyConfirmation = true
                    this.buyConfirmationName = this.sb5.name
                    this.lvl = this.sb5.lvl
                    this.price = this.sb5.price
                } 
            }

            //Increasing the skill cost and level after purchase
            if (this.buyConfirmation) {
                this.drawConfirmation = true
                if (this.input.leftMousePressed && this.input.mouseX > 390 && this.input.mouseX < 480 && this.input.mouseY > 365 && this.input.mouseY < 395 && this.coinsAmount > this.price) {
                    switch (this.buyConfirmationName) {
                        case "DOUBLE COINS":
                            this.sb1.lvl += 1
                            this.coinsAmount -= this.sb1.price
                            this.sb1.price *= this.priceMuliplicator * this.sb1.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                        case "ROCKET BOOST":
                            this.sb2.lvl += 1
                            this.coinsAmount -= this.sb2.price
                            this.sb2.price *= this.priceMuliplicator * this.sb2.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                        case "MULTIPLE JUMPS":
                            this.sb3.lvl += 1
                            this.coinsAmount -= this.sb3.price
                            this.sb3.price *= this.priceMuliplicator * this.sb3.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                        case "HIGHER JUMP":
                            this.sb4.lvl += 1
                            this.coinsAmount -= this.sb4.price
                            this.sb4.price *= this.priceMuliplicator * this.sb4.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                        case "FURTHER JUMP":
                            this.sb5.lvl += 1
                            this.coinsAmount -= this.sb5.price
                            this.sb5.price *= this.priceMuliplicator * this.sb5.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                        case "PARACHUTE":
                            this.sb6.lvl += 1
                            this.coinsAmount -= this.sb6.price
                            this.sb6.price *= this.priceMuliplicator * this.sb6.lvl
                            this.buyConfirmationName = ""
                            this.buyConfirmation = false
                            this.drawConfirmation = false
                            break
                    }
                
                //check if there are enough coins
                } else if (this.input.leftMousePressed && this.input.mouseX > 390 && this.input.mouseX < 480 && this.input.mouseY > 365 && this.input.mouseY < 395 && this.coinsAmount < this.price) {
                    this.notEnoughCoins = true
                } else if (this.input.leftMousePressed && this.input.mouseX > 700 && this.input.mouseX < 770 && this.input.mouseY > 365 && this.input.mouseY < 395) {
                    this.buyConfirmationName = ""
                    this.buyConfirmation = false
                    this.drawConfirmation = false
                    this.notEnoughCoins = false
                    this.price = 0
                }    
            }
        }
    }
}