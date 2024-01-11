import Green from "./green.js";

const speed = 50;

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.play('enemyAnim');
        this.setScale(1);
        this.moves = true;

        this.explosionSound = scene.sound.add('explosionSfx');

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this.tween = scene.tweens.add({
            targets: this,
            x: '-=20',
            duration: 1000,
            repeat: -1,
            // hold: 500,
            // repeatDelay: 500,
            ease: 'sine.inout',
            yoyo: true
        });
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }

        if (this.y > this.scene.height) {
            this.destroy();
        }
    }

    move() {
        this.setVelocityY(speed);
    }

    die() {
        if (this.moves) {
            this.moves = false;
            this.setVelocity(0);
            this.setVelocityY(speed/2);
            this.tween.stop();
            this.play('explosionAnim');
            this.explosionSound.play();
            this.reward();
            this.body.enable = false;
            setTimeout(() => {
                this.destroy();
            }, 1000);
        }
    }

    reward() {
        let chance = Phaser.Math.Between(0, 1);
        if (chance === 1) {
            this.scene.greenPool.push(new Green(this.scene, this.x, this.y));
        }
    }
}