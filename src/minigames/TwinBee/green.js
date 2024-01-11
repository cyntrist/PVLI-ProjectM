const speed = 50;

export default class Green extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'green');
        this.setScale(1);
        this.moves = true;

        this.luckySound = scene.sound.add('luckySfx', { volume: 0.3});

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);

        this.tween = scene.tweens.add({
            targets: this,
            x: '+=5',
            angle: '+=30',
            duration: 750,
            repeat: -1,
            hold: 50,
            repeatDelay: 50,
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

    interact() {
        this.luckySound.play();
        this.destroy();
    }
}