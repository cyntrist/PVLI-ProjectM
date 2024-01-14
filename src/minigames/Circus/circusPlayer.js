const speedX = 200;
const speedY = -375;

export default class CircusPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, { key: 'CircusPlayer' });
        this.play('clownIdle');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(3);
        this.dead = false;
        this.wins = false;
        this.cursors = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
        this.jumpSound = scene.sound.add('jumpEffect');

        /// LEON
        this.lion = scene.physics.add.sprite(x, y + 70, 'lionIdle').setScale(3);
        this.lion.play('lionIdle');
        this.lion.depth = 1;
        this.lion.body.setSize(30, 14);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        this.move();
    }

    move() {
        if (!this.dead && !this.wins) {
            if (this.cursors.right.isDown && this.lion.body.touching.down) {
                this.setVelocityX(speedX);
                this.lion.setVelocityX(speedX);
                if (this.lion.anims.currentAnim.key !== 'lionWalk')
                    this.lion.play('lionWalk');
            }
            else if (this.lion.body.touching.down) {
                this.setVelocityX(0);
                this.lion.setVelocityX(0);
                if (this.lion.anims.currentAnim.key !== 'lionIdle')
                    this.lion.anims.play('lionIdle');
            }

            if (this.cursors.up.isDown && this.lion.body.touching.down) {
                this.setVelocityY(speedY);
                this.lion.setVelocityY(speedY);
                if (this.anims.currentAnim.key !== 'clownJump')
                    this.anims.play('clownJump');
                if (this.lion.anims.currentAnim.key !== 'lionJump')
                    this.lion.anims.play('lionJump');
                this.jumpSound.play();
            }
            else if (this.lion.body.touching.down) {
                if (this.anims.currentAnim.key !== 'clownIdle')
                    this.anims.play('clownIdle');
            }
        }
        else {
            this.setVelocity(0);
            this.body.setAllowGravity(false);
            this.body.setImmovable(true);
            this.lion.setVelocity(0);
            this.lion.body.setAllowGravity(false);
            this.lion.body.setImmovable(true);
        }
    }

    win() {
        if (this.anims.currentAnim.key !== 'clownWin')
            this.play('clownWin');
        this.wins = true;
        this.depth = 10;
        this.lion.setVisible(false);
    }

    die() {
        if (this.anims.currentAnim.key !== 'clownDie')
            this.play('clownDie');
        this.lion.play('lionDie');
        this.dead = true;
        this.depth = 10;
        this.lion.depth = 10;
    }
}