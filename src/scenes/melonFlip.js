
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

        // tuberia
        //
    }

    create (){



        
        // ----------------------- OBJETOS -----------------------------------
        // pone el fondo
		let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

        // boton de vuelta
		let but1 = new Button(this, 100, 320, 'movil', 'goBackBox', this.ChangeScene);
		but1.depth = 2;

        // crea un melon que flippea
        //this.character = new melon(this, 150, 250, 'melon');

        // melon flippeador con matter
        this.melones = this.matter.add.image(150, 250, 'melon');

        this.melones.setMass(10);
        
        //melones.setFrictionAir(1);
       

        // settea el body (para colisiones y fisicas)
        // this.character.Phaser.Physics.Matter.Components.SetRectangle(387, 319);
        // 387 319

        //this.obstacle1 = this.add.tubo(this, 150, 250, 'melon');



        // ------------------------- FISICAS --------------------------
     
        // -------------------- >>>>> con arcade solo <<<<<< ---------------------------
        // crea un grupo para las colisiones
        //this.objs = this.add.group();

		// metemos los objetos en el objeto de colisiones
		//this.objs.add(this.character);
		//this.objs.addMultiple([this.duck2, this.duck3]) // con varios

        // añade colisiones a los objetos character (melon flippeador) y tubo 
        //(es un palo alargado) y si colisionan llama al callback
        //this.physics.add.collider(this.character, this.tubo, this.CollisionCheck); 

        

        // ----------------- INPUT -------------------

        //
		this.jumpKey = this.input.keyboard.addKey('W'); 

        //spaceKey.onDown.add(this.jumpKey, this);     



    }

    update (){


        if(this.jumpKey.isDown){ 
			
			// salta
            console.log("salto saltooooo");

            const speed = 0.03;
            const force = {x: 0, y: 3 * speed};
            //this.melones.body.applyForce(this.melones.body, this.car.getTopRight(), force);
            
            //this.melones.Body.applyForce(this.melones, force);  //Matter.Body.applyForce( this.melones, force);

            Phaser.Physics.Matter.Matter.Body.applyForce(this.melones.body, this.melones.getTopRight(), force);

            //Phaser.Physics.Matter.Matter.Body.applyForce(this.melones.body, );
        }
      


    }
    

    ChangeScene(newScene, escena){
		escena.scene.start(newScene);
	}

    CollisionCheck(){

        console.log("explosion BOOOOOOOOOOOOOOOOOOOOOOOOOOM");
    }

    jump (character) {
        // añade fuerza al melon
        //character.addForce(); // con arcade

        // añade fuerza al melon  // con matter
        Phaser.Physics.Matter.Matter.Body.applyForce(this.car.body, this.car.getTopRight(), force); 

    }


}