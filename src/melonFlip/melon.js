


export default class Melon extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, melonSprite) {
		// super a la escena
		super(scene, x, y);

        //this.melon = new Phaser.GameObjects.Sprite(scene, x, y, melonSprite); 

        //this.melon = this.scene.add.image(200, 200, melonSprite);
        //this.scene.physics.add.existing(this.melon);

        this.mel = this.physics.add.sprite(150, 270, 'melon', 0);

		//this.melon.setScale(1, 1);

        this.add(this.melon);

        scene.add.existing(this);

    }




    // añade la fuerza indicada al objeto mediante un vector
    jump(callback)
    {
        //this.melon.body.velocity.y = -200;

        //this.melon.body.setVelocityY(-200);

        this.mel.setVelocityY(-200);
        // deberia ser la anim del salto
        //callback
        
        //console.log("flip");
    }

    checkEnd(){
        //console.log("END")
        return (this.melon.y > 500)
    }

    stopMoving(){

        //this.melon.body.enable(false);
        this.melon.body.setEnable(false);
    }


}