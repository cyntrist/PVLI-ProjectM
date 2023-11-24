


export default class Melon extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, melonSprite) {
		// super a la escena
		super(scene, x, y);

        this.melon = new Phaser.GameObjects.Sprite(scene, x, y, melonSprite); 
		this.melon.setScale(0.5, 0.5);

        this.add(this.melon);

        scene.add.existing(this);

    }


}