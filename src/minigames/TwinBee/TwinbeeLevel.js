import TwinbeePlayer from "./twinbeePlayer.js";
import Enemy from "./enemy.js";
import Bullet from "./bullet.js";
import Green from "./green.js";
// import Sprite from "./sprite.js";
// import Container from "./container.js";

const color = Phaser.Display.Color.RandomRGB();

export default class TwinbeeLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'TwinbeeLevel' });
    }

    init(data) {
        this.data = data.data;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        this.width = width;
        this.height = height;
        const scene = this;

        // audio
        this.sound.stopAll();
        scene.cursor = scene.input.keyboard.createCursorKeys();
        //this.sound.add('key', { loop: true }).play();
        this.deadSound = this.sound.add('deadSfx');
        this.explosionSound = this.sound.add('explosionSfx');
        this.luckySound = this.sound.add('luckySfx');


        

        // player
        if (this.data === 1 ) {
            this.player1 = new TwinbeePlayer(this, width / 2, height - 50, 1);
        } else {
            this.player1 = new TwinbeePlayer(this, width / 3, height - 50, 1);
            this.player2 = new TwinbeePlayer(this, width * 2 / 3, height - 50, 2);
        }
        this.lives = this.data;





        // Colisiones
        //this.bulletPool = [];
        this.bulletPool = this.physics.add.group({
            classType: Bullet,
            maxSize: 100, 
            runChildUpdate: true, 
        });
        this.enemyPool = [];
        this.greenPool = [];
        // this.physics.overlap(this.bulletPool, this.enemyPool, (bullet, enemy) => {
        //     enemy.die();
        //     bullet.setActive(false);
        //     bullet.setVisible(false);
        // });
        this.physics.add.collider(this.enemyPool, this.bulletPool, (enemy, bullet) => {
            enemy.die();
            bullet.setActive(false);
            bullet.setVisible(false);
        }, null, this);
        this.physics.add.collider(this.greenPool, this.player1, (green, player1) => {
            green.interact();
            player1.upgrade();
        }, null, this);
        this.physics.add.collider(this.greenPool, this.player2, (green, player2) => {
            green.interact();
            player2.upgrade();
        }, null, this);





        // bg 
        this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.background.y = - this.background.height + height;




        // intervalos
        this.backgroundInterval = setInterval(() => {
            if (this.background.y >= 0) {
                this.eventEmitter.emit('win');
            } else {
                this.background.y += 1;
            }
        }, 25);  

        this.enemyInterval = setInterval(() => {
            const randomX = Phaser.Math.Between(20, this.width - 20);
            let enemy = new Enemy(this, randomX, 0);
            enemy.y = -enemy.height/2;
            this.addCollision(enemy);
            this.enemyPool.push(enemy);
        }, 3000);
        




        // eventos
        this.eventEmitter.on('win', function () {
			this.onWin();
		}, this)

        this.eventEmitter.on('lose', function() {
            this.lives--;
            if (this.lives <= 0) {
                this.onLose();
            }
        }, this)
    
        // this.time.delayedCall(5000, metodo(), [], this);
    }

    preUpdate(time, deltaTime) {
  
    }

    update() {
        this.bulletPool.getChildren().forEach(bullet => {
            if (bullet.y < 0) {
                bullet.setActive(false);
                bullet.setVisible(false);
            }
        });
    }

    onLose() {
        this.disableInput();
        this.add.text(this.width / 2, this.height/2, "Defeat", {
            fontFamily: 'gummy',
            fontSize: 48,
            color: 'black'
        }).setOrigin(0.5, 0.5).setStroke(color.rgba, 8);
        this.endGame();
    }

    onWin() {
        this.disableInput();
        this.add.text(this.width / 2, this.height/2, "Victory", {
            fontFamily: 'gummy',
            fontSize: 48,
            color: 'black'
        }).setOrigin(0.5, 0.5).setStroke(color.rgba, 8);
        this.endGame();
    }

    disableInput()  {
        this.enemyPool.getChildren().forEach(enemy => {
            enemy.moves = false;
        });
        this.greenPool.getChildren().forEach(green => {
            green.moves = false;
        });
        this.bulletPool.getChildren().forEach(bullet => {
            bullet.moves = false;
        });
        clearInterval(this.backgroundInterval);
        clearInterval(this.enemyInterval);
        this.player1.input = false;
        if (this.player2 !== undefined)
            this.player2.input = false;
    }

    addCollision(enemy) {
        this.physics.add.collider(this.player1, enemy, (player1, enemy) => {
            if (enemy.moves) {
                this.player1.die();
            }
        }, null, this);
        if (this.player2 !== undefined) {
            this.physics.add.collider(this.player2, enemy, (player2, enemy) => {
                if (enemy.moves) {
                    this.player2.die();
                }
            }, null, this);
        }
    }

    endGame() {
        setTimeout(() => {
            this.scene.start('TwinbeeMenu');
        }, 3000);
    }
}