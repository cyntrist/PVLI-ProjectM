const speed = -50;
const hitboxW = 10;
export default class Ring extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.play('ringAnim');
        this.setScale(3);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.moves = true;
        this.body.setSize(hitboxW, 8);
        this.body.setOffset(hitboxW - 2, 73);
        this.depth = 0;
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);

        this.front = scene.physics.add.sprite(x + this.width - 5, y, 'halfRingAnim').setScale(3);
        this.front.play('halfRingAnim');
        this.front.depth = 2;
        this.front.body.setSize(hitboxW, 12);
        this.front.body.setOffset(-hitboxW/2, 4);
        this.front.body.setAllowGravity(false);
        this.front.body.setImmovable(true);
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);
        if (this.moves) {
            this.move();
        }
    }

    move() {
        this.setVelocityX(speed);
        this.front.setVelocityX(speed);
    }

    die() {
        this.moves = false;
        this.setVelocity(0);
        this.front.setVelocity(0);
    }
}