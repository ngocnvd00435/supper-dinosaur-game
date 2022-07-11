export default class Figure extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y) {
        super(scene,x,y,"run");       
        this.setOrigin(0, 0);
        this.setScale(1);
        // this.create();
    }

    create(){


        const config = {
            key: "run",
            frames: this.scene.anims.generateFrameNumbers("run", { start: 0, end: 19 }),
            frameRate: 15,
            repeat: -1
        };
        this.scene.anims.create(config);
        this.anims.play('run');
    }
}    