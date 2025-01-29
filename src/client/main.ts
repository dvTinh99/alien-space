import Phaser from 'phaser'

import GameScene from './scenes/gameScene.js'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
		},
	},
	scale: {
        mode : Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
	scene: [GameScene],
}

export default new Phaser.Game(config)
