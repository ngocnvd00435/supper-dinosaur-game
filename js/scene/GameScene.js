// import Figure from "../game/Figure.js";


class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene',
        });
    }

    preload() {
        this.load.spritesheet("run", '../assets/dinosaurs/run.png', {
            frameWidth: 350,
            frameHeight: 200
        });

        this.load.spritesheet("jump", '../assets/dinosaurs/jump1.png', {
            frameWidth: 350,
            frameHeight: 250
        });

        this.load.spritesheet('rocks', '/assets/background/rocks.png', {
            frameWidth: 1260 / 7,
            frameHeight: 180
          })

        // this.load.image('street', '/assets/background/street-background.png');
        this.load.image('background', '/assets/background/game-background.png');
        this.load.image('street', '/assets/background/test1.png');
        this.load.image('platforms', '/assets/background/platforms.png');
    }

    init() {
        this.action = true;
        this.isRun = true;
        this.count =0,this.point = 0;
        this.speedGame = {
            layer1 : 60,
            layer2 : 4,
            layer3 : 4,
        }
    }


    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.platforms = this.physics.add.staticGroup();
        this.platforms.setOrigin(0, 0);

        this.platforms.create(600, 650, 'platforms');
        // this.platforms.create(600, 650, 'street');

        this.createPlayer(400, 200, "run");
        // this.createPlayer(700,400,"jump",16,15);
        this.createStreet();
        // this.listenKeyBord();

        this.rock = this.buildRandomRocks();

        this.textPoint = this.add.text(1100, 10, this.point, {
            fontSize: "24px"
        });
    }

    update() {
        this.count += 1;
        if (this.count % 50 == 0) {
            this.point +=  1;
            this.textPoint.setText(this.point);
            this.textPoint.x = 1200 - this.textPoint.width;

        }
        if (this.count % 300 == 0) {
            this.speedGame.layer1 +=  1;
        }

        if (this.action) {
            this.moveStreet();
        }
        // this.platforms.x -= 4;
        this.listenKeyBord();
        if (this.rock.x < -180) {
            this.randomRock();
            this.rock.x = 1300;
        }
    }

    listenKeyBord() {
        // console.log("1",this.monster.body.touching.down);
        
       var  cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.monster.setVelocityX(-160);
            console.log("1",this.monster.body.touching.down);
            // player.anims.play('left', true);
        }else if (cursors.right.isDown) {
            this.monster.setVelocityX(160);
            // player.anims.play('right', true);
        } else  {
            this.isRun = false;
        }

        if (cursors.up.isDown && this.monster.body.touching.down) {
            this.monster.anims.play('jump');
            this.monster.setVelocityY(-600); 
            setTimeout(() => {
                this.monster.anims.play('run');
            }, 1100);
            
        }
    }

    createPlayer(x, y) {
        this.monster = this.physics.add.sprite(x, y, "run");
        // this.monster.setBounce(0.2);
        this.monster.setCollideWorldBounds(true);
        this.monster.body.setGravityY(800)
        this.physics.add.collider( this.monster, this.platforms);

        this.monster.setOrigin(0, 0);
        this.monster.setScale(1);

        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("run", { start: 0, end: 19 }),
            frameRate: 12,
            repeat: -1
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1
        });
        this.monster.anims.play("run");



    }

    createStreet() {
        this.street1 = this.add.image(0, 600, 'street').setOrigin(0, 0);
        this.street2 = this.add.image(1300, 600, 'street').setOrigin(0, 0);
    }

    moveStreet() {
        this.street1.x -= this.speedGame.layer1/10;
        this.street2.x -= this.speedGame.layer1/10;

        if (this.rock) {
            this.rock.x -= this.speedGame.layer1/10;
        }

        if (this.street1.x <= -this.street1.width) {
            this.street1.x = this.street2.x + this.street2.width;
        }
        if (this.street2.x <= -this.street2.width) {
            this.street2.x = this.street1.x + this.street1.width;
        }
    }

    buildRandomRocks() {
        const frameId = this.randomIntFromInterval(0, 6);
        const rock = this.physics.add.image(1300, 565, 'rocks', frameId).setDepth(0);
        rock.body.setAllowGravity(false);
        return rock
    
    }

    randomRock(){
        const frameId = this.randomIntFromInterval(0, 6);
        this.rock.setTexture('rocks', frameId);
    }



    //utils
    randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
    }

}
export { GameScene };