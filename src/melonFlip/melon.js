


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


    // añade la fuerza indicada al objeto mediante un vector
    jump()
    {

        this.melon.y -= 20;

    }

    sufferGravity(){

        console.log("estoy sufriendo gravedad");

        // y = y0 + v0t + 1/2 gt2 

        this.melon.y += (9.8 * 0.2);

    }


}