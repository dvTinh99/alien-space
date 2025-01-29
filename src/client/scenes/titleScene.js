import "phaser";

class TitleScene extends Phaser.Scene {
    constructor() {
        super({key : 'TitleScene'});
        this.titleSceneBackgroundImage = null
        this.titleSceneText = null
        this.titleSceneTextStyle = {
            font : '200px Times',
            fill : '#fde4b',
            align : 'center'

        }
    }

    init(data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload() {
        console.log('TitleScene');
        this.load.image('titleSceneBackground', '/assets/assets/aliens_screen_image.jpg')
    }
    
    create(data) {
        this.titleSceneBackgroundImage = this.add.sprite(0, 0, 'titleSceneBackground').setScale(2.75)
        this.titleSceneBackgroundImage.x = 1920 / 2
        this.titleSceneBackgroundImage.y = 1080 / 2

        this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) + 350, 'Space Alien', this.titleSceneTextStyle)
        .setOrigin(0.5)
    }

    update(time, delta) {
        if (time > 2000) {
            this.scene.switch('MenuScene')
        }
    }
}

export default TitleScene