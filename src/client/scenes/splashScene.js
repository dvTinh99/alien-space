import "phaser";

class SplashScene extends Phaser.Scene {
    constructor() {
        super({key : 'splashScene'});
    }

    init(data) {
        this.cameras.main.setBackgroundColor('#ffffff')
    }

    preload() {
        console.log('SplashScene');
        this.load.image('splashSceneBackground', '/assets/assets/splashSceneImage.png')
        
    }

    create(data) {
        // this.scene.switch('TitleScene')
        this.splashSceneBackground = this.add.sprite(0, 0, 'splashSceneBackground')
        this.splashSceneBackground.x = 1920 / 2
        this.splashSceneBackground.y = 1080 / 2
    }

    update(time, delta) {
        if (time > 1500) {
            this.scene.switch('TitleScene')
        }
        
    }
}

export default SplashScene