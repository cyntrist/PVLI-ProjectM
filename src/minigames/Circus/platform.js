export default class Platform extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.setScale(3);
        this.setTexture('platform');
        scene.add.existing(this);
    }
}