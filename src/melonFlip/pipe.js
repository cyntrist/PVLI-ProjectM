

export default class Pipe extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, tuboSprite, deleteCon) {
		// super a la escena
		super(scene, x, y);

        this.tubo = new Phaser.GameObjects.Sprite(scene, x, y, tuboSprite); 
		this.tubo.setScale(0.5, 0.8);

        this.add(this.tubo);

        scene.add.existing(this);

    }

    paralax (){
        this.tubo.x -= 5;
    }

    isOut(){

        //console.log("LOSE CONN " + 0);
        return this.tubo.x <= -700;

    }

    deletePipe(){
        this.destroy();
    }


}