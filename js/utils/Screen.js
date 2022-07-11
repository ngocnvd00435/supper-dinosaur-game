export default class Screen extends Phaser.GameObjects.Sprite{
    constructor(scene) {
        super(scene);       
        this.firstClickTime = 0;
        this.scene.input.on('pointerdown', this.onDown.bind(this));

        this.count = 0;
        this.start = true;
    }

    onDown() {
        if (this.firstClickTime == 0) {
            this.firstClickTime = this.getTime(); 
        }else{
            let elapsed = this.getTime() - this.firstClickTime;
            if (elapsed < 200) {
                if (this.scene.scale.isFullscreen){
                    this.scene.scale.stopFullscreen();
                }else{
                    this.scene.scale.startFullscreen();
                }
            }
            this.firstClickTime = 0;
        }

    }

    getTime() {
        let d = new Date();
        return d.getTime();
    }


    runStart(list){
        if (this.start) {
            this.count +=1;
            
            list.forEach(e => {
                e.setAlpha(this.count/30);
            });
            
            if (this.count >= 30 ) {
                this.start =false;
            }

            return this.count == 30;
        }
    }




}