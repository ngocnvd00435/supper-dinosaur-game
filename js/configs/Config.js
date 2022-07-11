
import {GameScene} from "../scene/GameScene.js";


const Config = function () {
    const gameScene = new GameScene();
    return {
        parent: 'body',
        type: Phaser.AUTO,
        width: 1225,
        height: 718,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        dom: {
            createContainer: true
        },
        physics: {
            default: 'arcade',
            arcade: {
              debug: true,
              gravity: {x: 0, y: 300, z: 0}
            }
        },
        // scene: [initScene, gameScene, rewardScene],
        scene: [gameScene],
    };
}




export {Config};