import "phaser";

class MenuScene extends Phaser.Scene {
    constructor() {
        super({key : 'MenuScene'});
        this.menuSceneBackgroundImage = null
        this.startButton = null
    }

    init(data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload() {
        console.log('MenuScene');
        this.load.image('menuSceneBackground', '/assets/assets/aliens_screen_image2.jpg')
        this.load.image('startButton', '/assets/assets/start.png')
    }

    create(data) {
        this.menuSceneBackgroundImage = this.add.sprite(0, 0, 'menuSceneBackground').setScale(2.75)
        this.menuSceneBackgroundImage.x = 1920 / 2
        this.menuSceneBackgroundImage.y = 1080 / 2

        this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 100, 'startButton')
        this.startButton.setInteractive({useHandCursor: true})

        this.startButton.on('pointerdown', () => this.clickButton())
    }

    update(time, delta) {

    }

    clickButton() {
        this.scene.start('GameScene')
    }
}

export default MenuScene