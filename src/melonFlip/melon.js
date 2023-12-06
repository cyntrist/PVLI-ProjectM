


export default class Melon extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, melonSprite) {
		// super a la escena
		super(scene, x, y);

        //this.melon = new Phaser.GameObjects.Sprite(scene, x, y, melonSprite); 

        this.melon = this.scene.add.image(200, 200, melonSprite);
        this.scene.physics.add.existing(this.melon);

		this.melon.setScale(0.5, 0.5);

        this.add(this.melon);

        scene.add.existing(this);

    }


    // añade la fuerza indicada al objeto mediante un vector
    jump()
    {
        this.melon.body.velocity.y = -200;
    }

    checkEnd(){
        //console.log("END")
        return (this.melon.y > 300)
    }

    stopMoving(){

        //this.melon.body.enable(false);
        this.melon.body.setEnable(false);
    }


}