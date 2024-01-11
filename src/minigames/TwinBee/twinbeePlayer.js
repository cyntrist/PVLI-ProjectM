const speed = 200;
const cooldown = 1000;

export default class TwinbeePlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, number) {
        super(scene, x, y, { key: 'TwinbeePlayer' });
        this.input = true;
        this.setScale(1);
        this.depth = 1;
        this.dead = false;
        this.number = number;
        this.level = 1;

        this.lastShot = 0;

        this.shootSound = scene.sound.add('shootSfx');
        this.deadSound = scene.sound.add('deadSfx');

        if (this.number === 1) {
            this.idleAnim = 'twinIdle';
            this.leftAnim = 'twinLeft';
            this.rightAnim = 'twinRight';
            this.shootAnim = 'twinShoot';
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                shoot: Phaser.Input.Keyboard.KeyCodes.SPACE,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
        }
        else {
            this.idleAnim = 'winIdle';
            this.leftAnim = 'winLeft';
            this.rightAnim = 'winRight';
            this.shootAnim = 'winShoot';
            this.cursors = scene.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.UP,
                right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
                left: Phaser.Input.Keyboard.KeyCodes.LEFT,
                down: Phaser.Input.Keyboard.KeyCodes.DOWN,
                shoot: Phaser.Input.Keyboard.KeyCodes.ENTER,
                escape: Phaser.Input.Keyboard.KeyCodes.ESC
            });
        }

        //this.play(this.idleAnim);


        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move(time);
    }

    move(time) {
        if (this.input) {
            this.setVelocity(0);

            if (this.cursors.left.isDown && (this.x - this.width / 2) > 0) {
                this.setVelocityX(-speed);
                this.animate('twinLeft');
            }
            if (this.cursors.right.isDown && (this.x + this.width / 2) < this.scene.width) {
                this.setVelocityX(speed);
                this.animate('twinRight');
            }
            if (this.cursors.up.isDown && (this.y - this.height / 2) > 0) {
                this.setVelocityY(-speed);
            }
            if (this.cursors.down.isDown && (this.y + this.height / 2) < this.scene.height) {
                this.setVelocityY(speed);
            }

            if (this.body.velocity.x === 0) {
                this.animate('twinIdle');
            }

            if (this.cursors.shoot.isDown && time - this.lastShot > cooldown) {
                this.shoot();
                this.lastShot = time;
            }
        }
        else {
            this.setVelocity(0);
            this.body.setImmovable(true);
        }
    }

    animate(anim) {
        // if (this.anims.currentAnim.key !== anim) {
        //     this.anims.play(anim);
        // }
    }

    shoot() {
        this.shootSound.play();
        switch (this.level) {
            case 1:
                this.spawnBullet(0, 0);
                break;
            case 2:
                this.spawnBullet(-5, -10);
                this.spawnBullet(5, 10);

                break;
            case 3:
                this.spawnBullet(-8, -10);
                this.spawnBullet(-4, 0);
                this.spawnBullet(4, 0);
                this.spawnBullet(8, 10);

                break;
            default:
                break;
        }

        this.animate(this.shootAnim);
    }

    spawnBullet(x, desviacion) {

        const bullet = this.scene.bulletPool.get(this.x, this.y);

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setPosition(this.x + x,  this.y - this.height/2);
            bullet.setDesviacion(desviacion);
        }
    }

    die() {
        this.dead = true;
        this.deadSound.play();
        this.scene.eventEmitter.emit('lose');
        this.destroy();
    }

    upgrade() {
        if (this.level <= 2) {
            this.level++;
            setTimeout(() => {
                this.level--;
            }, 10000);
        }
    }
}