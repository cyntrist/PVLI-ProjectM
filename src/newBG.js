export default class newBG extends Phaser.GameObjects.Sprite {

    constructor (scene, x, y, bg)
    {
        super(scene, x, y);

        this.setTexture(bg);
        this.setPosition(x, y);
    }

    preload ()
    {
        this.load.image('packg', bg);
    }
    
    create ()
    {
        this.add.existing(new newBG(this, 264, 250));
    }
}