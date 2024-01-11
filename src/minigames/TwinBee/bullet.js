const speed = 100;

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, desviacion) {
        super(scene, x, y, 'bullet');
        this.setActive(false);
        this.setVisible(false);
        this.setScale(1);
        this.moves = true;
        this.depth = 10;
        this.desviacion = desviacion
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }
    }

    move() {
        this.setVelocityY(-speed);
        this.setVelocityX(this.desviacion);
    }

    die() {
        this.moves = false;
        this.setVelocity(0);
    }

    setDesviacion(value) {
        this.desviacion = value;
    }
}