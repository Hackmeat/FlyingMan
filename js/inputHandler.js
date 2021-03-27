class InputHandler {

    constructor() {

        this.spacePressed = false
        this.leftMousePressed = false
        this.rightMousePressed = false

        this.mouseX = 0
        this.mouseY = 0

        document.addEventListener("keydown", event => {
            switch (event.keyCode) {
                case 32:
                    this.spacePressed = true
                    break
            }

        })

        document.addEventListener("keyup", event => {
            switch (event.keyCode) {
                case 32:
                    this.spacePressed = false
                    break
            }
        })

        document.addEventListener("mousedown", e => {
            switch (e.button) {
                case 0:
                    this.mouseX = e.offsetX
                    this.mouseY = e.offsetY
                    this.leftMousePressed = true
                    break
                case 2:
                    this.mouseX = e.offsetX
                    this.mouseY = e.offsetY
                    this.rightMousePressed = true
                    break
            }
        })

        document.addEventListener("mouseup", e => {
            switch (e.button) {
                case 0:
                    this.leftMousePressed = false
                    this.mouseX = 0
                    this.mouseY = 0
                    break
                case 2:
                    this.rightMousePressed = false
                    this.mouseX = 0
                    this.mouseY = 0
                    break
            }
        })
    }



}