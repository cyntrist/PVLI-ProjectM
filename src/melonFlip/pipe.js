

export default class Pipe extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, tuboSprite, deleteCon) {
		// super a la escena
		super(scene, x, y);

        this.tubo = this.physics.add.sprite(x, y, tuboSprite, 0);
        //this.tubo = new Phaser.GameObjects.Sprite(scene, x, y, tuboSprite); 
		this.tubo.setScale(0.5, 0.8);

        this.add(this.tubo);

        scene.add.existing(this);



    }

    paralax (){
        this.tubo.setVelocityX(-100);
    }

    isOut(){

        //console.log("LOSE CONN " + 0);
        return this.tubo.x <= -700;

    }

    deletePipe(){
        

        this.destroy();
    }

    onCollision(){

        console.log("BAILA BAILA CONMIGOOOOOOOOOOOOOOOOOOOOO");
    }


}