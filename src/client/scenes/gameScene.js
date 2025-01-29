import "phaser";

class GameScene extends Phaser.Scene {
    constructor() {
        super({key : 'GameScene'});
        this.background = null
        this.ship = null
        this.turnLeft = false
        this.turnRight = false
        this.missileGroup = null
        this.score = 0
        this.scoreText = null
        this.scoreTextStyle = {
            font : '65px Arial',
            fill : '#ffffff',
            align: 'center'
        }

        this.gameOverText = null
        this.gameOverTextStyle = {
            font: '65px Arial',
            fill: '#ff0000',
            align: 'center'
        }
    }

    init(data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload() {
        console.log('GameScene');
        this.load.image('startBackground', '/assets/assets/starBackground.png')
        this.load.image('ship', '/assets/assets/spaceShip.png')
        this.load.image('missile', '/assets/assets/missile.png')
        this.load.image('alien', '/assets/assets/alien.png')

        //sound
        this.load.audio('laser', '/assets/assets/laser1.wav')
        this.load.audio('explosion', '/assets/assets/barrelExploding.wav')
    }

    create(data) {
        this.background = this.add.image(0, 0, 'startBackground').setScale(2.0)
        this.background.setOrigin(0, 0)

        this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, 'ship')
        this.scoreText = this.add.text(10, 10, 'Score: ' + this.score.toString(), this.scoreTextStyle)

        //group
        this.missileGroup = this.physics.add.group()
        this.alienGroup = this.add.group()
        this.createAlien()

        const left = this.input.keyboard.addKey("LEFT"); // Get key object
        const right = this.input.keyboard.addKey("RIGHT"); // Get key object
        const space = this.input.keyboard.addKey("SPACE"); // Get key object
        left.on("down", (event) => {
            this.turnLeft = true
        });
        left.on('up', () => {
            this.turnLeft = false
        })
        right.on("down", (event) => {
            this.turnRight = true
        });
        right.on('up', () => {
            this.turnRight = false
        })

        space.on('down', () => {
            const newMissile = this.physics.add.sprite(this.ship.x, this.ship.y, 'missile')
            this.missileGroup.add(newMissile)
            this.sound.play('laser')
        })

        // check collision
        this.physics.add.collider(this.missileGroup, this.alienGroup, (missile, alien) => {
            this.score += 1
            this.scoreText.setText('Score: ' + this.score.toString())
            
            missile.destroy()
            alien.destroy()

            this.sound.play('explosion')
            this.createAlien()
            this.createAlien()
        })

        this.physics.add.collider(this.ship, this.alienGroup, (ship, alien) => {
            this.physics.pause()
            alien.destroy()
            ship.destroy()

            this.gameOverText = this.add.text(1920/2, 1080/2, 'Game over, click to play again', this.gameOverTextStyle).setOrigin(0.5)
            this.gameOverText.setInteractive({userHandCursor: true})
            this.gameOverText.on('pointerdown', () => {
                this.scene.start('GameScene')
            })

            this.sound.play('explosion')
        })

    }

    update(time, delta) {
        if (this.turnLeft) {
            if (this.ship.x > 0) {
                this.ship.x -= 20
            }
        }
        if (this.turnRight) {
            if (this.ship.x < 1920) {
                this.ship.x += 20
            }
            
        }

        this.missileGroup.children.each(item => {
            item.y -= 15
            if (item.y < 0) {
                item.destroy()
            }
        })
    }

    createAlien() {
        const alienXLocation = Math.floor(Math.random() * 1920 + 1)
        let alienXVelocity = Math.floor(Math.random() * 50) + 1
        alienXVelocity *= Math.round(Math.random()) ? 1 : -1
        const alien = this.physics.add.sprite(alienXLocation, - 100, 'alien')
        alien.body.velocity.y = 200
        alien.body.velocity.x = alienXVelocity
        this.alienGroup.add(alien)
    }
}

export default GameScene