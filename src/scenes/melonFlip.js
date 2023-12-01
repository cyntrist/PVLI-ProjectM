
import melon from "../melonFlip/melon.js";
import Button from "../objects/button.js";
import Tubo from "../melonFlip/tubo.js";

export default class MelonFlip extends Phaser.Scene{


    constructor() {
		super({ key: 'melonFlip'});
	}


    preload (){
        // crea el canvas (importante que si no da error)
        this.canvas = this.sys.game.canvas;

        // fondo
		this.load.image('fondo', './assets/images/escenarios/melonFlip.png');

        // boton de vuelta
		this.load.image('goBackBox', './assets/images/escenarios/goBack.png');

        // melon flippeando
        this.load.image('melon', './assets/images/personajes/melonQueFlippea.png');

    }

    create (){
        
        // ----------------------- 'OBJETOS' -----------------------------------
        // pone el fondo
		let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

        // boton de vuelta
		let but1 = new Button(this, 100, 320, 'movil', 'goBackBox', this.ChangeScene);
		but1.depth = 2;

        // melon flippeador con matter
        //this.melones = this.matter.add.image(150, 250, 'melon');
        //this.melones.setScale(0.5, 0.5);

        //const { width, height } = this.scene.scale;
        /*
        this.melones = this.scene.add.image(320, 300, 'melon');
        this.scene.physics.add.existing(this.melones);
        this.add(this.melones);
        */

        this.mel = new melon(this, 150, 270, 'melon');
        this.mel.depth = 3;

        // el melon NO flippeador


        // settea una masa
        //this.melones.setMass(10);
        
        
        // ------------------------- FISICAS --------------------------
     
        // settea la velocidad
        this.speed = 0.03;
        // crea la fuerza
        this.force = {x: 0, y: 10 * this.speed};

        // ----------------- INPUT -------------------

        // 
		this.AjumpKey = this.input.keyboard.addKey('A'); 
        this.DjumpKey = this.input.keyboard.addKey('D'); 
        this.WjumpKey = this.input.keyboard.addKey('W'); 
  



    }

    update (){


        if(this.WjumpKey.isDown){ 
			
			// salta
            console.log("salto saltooooo");

            this.mel.jump();

        }
       

        //this.mel.sufferGravity();

        if(this.mel.checkEnd()){
            console.log("GAME OVER");

            this.mel.stopMoving();
        }
      


    }
    

    // cambio de escena a la marcada (depende del boton)
    ChangeScene(newScene, escena){
		escena.scene.start(newScene);
	}

    // para cuando colisione con una tuberia ou mama
    CollisionCheck(){

        // aaaaaaaaaaaaaaaa
        console.log("explosion BOOOOOOOOOOOOOOOOOOOOOOOOOOM eres open jaime libre office");
    }

    // siendo side un metodo a lo 'this.car.getTopRight()'
    // siendo character un body a lo 'this.melones.body'
    // siendo force la fuerza (no olvidar el this.side)
    jump (character, side, force) {

        Phaser.Physics.Matter.Matter.Body.applyForce(character, 
                side, force);

    }


}