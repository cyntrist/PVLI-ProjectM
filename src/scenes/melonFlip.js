
import melon from "../melonFlip/melon.js";
import Button from "../objects/button.js";
import Pipe from "../melonFlip/pipe.js";

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
        this.load.image('melon', './assets/images/personajes/melonQueFlippeaCunty.png');

        // tuberia flippeando
        this.load.image('pipe', './assets/images/personajes/pipe.png');

        // pila para info entre escenas
        /*
        const pila = [{sceneName: "escena", data: {}} ];
        pila.push("bicho");
        const ant = pila.pop()
        pila.length()
        */

    }

    create (){
        
        // ----------------------- 'OBJETOS' -----------------------------------
        // pone el fondo
		let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

        // boton de vuelta
		let but1 = new Button(this, 100, 320, 'movil', 'goBackBox', this.ChangeScene);
		but1.depth = 2;

        // melon flippeador
        this.mel = new melon(this, 150, 270, 'melon');
        this.mel.depth = 3;


        

       // array de pipes
        this.pipes = [];

        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;

        let { width, height } = this.sys.game.canvas;

        
        // -------------------------- TWEENS -------------------------------

        /*
        this.flippea = this.tweens.add({
            targets: this.mel,
            duration: 100,
            angle: 180,
            // lo que hace
            persist: true

        })
        */
        


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

        // input
        if(this.WjumpKey.isDown){ 
			
            // le dice al melon que salte
            this.mel.jump();

            //this.flippea.play();
        }
       
        // gestiona la creacion de tuberias
        this.pipesManager();

        
        // gameover
        if(this.mel.checkEnd()){
            //console.log("GAME OVER");

            this.mel.stopMoving();
        }

        // movimiento paralax
        this.paralax();
    }
    

    // cambio de escena a la marcada (depende del boton)
    ChangeScene(newScene, escena){
		escena.scene.start(newScene);
	}


    paralax(){

        // ----------- pipes ------------

        // si hay tuberias
        for(let i = 0; i<this.pipes.length; i++){

            // si no esta fuera lo mueve
            if(!this.pipes[i].isOut()){

                //
                this.pipes[i].paralax();
            }
            else{
                this.pipes[i].deletePipe();
            }
        }

        
    }
    

    // ------------------------- PIPES MANAGER ---------------------------------

    // gestion de pipes
    pipesManager(){

        // si llega hace cosas
        if(this.cdCounter >= this.pipeCooldown){

            // crea un nuebo tubo
            this.createNewPipe();

            // reinicia el contador
            this.cdCounter = 0;
        }
        else {
            // añade al contador
            this.cdCounter++;
        }
    }

    createNewPipe(){

        let height = this.createNewHeight();

        // crea una tuberia
        this.TOPpipe = new Pipe(this, 700, height, 'pipe', 0);
        this.TOPpipe.depth = 2;

        // añade la tuberia al array de tuberias
        this.pipes.push(this.TOPpipe);

        // crea una tuberia
        this.BOTpipe = new Pipe(this, 700, height + 400, 'pipe', 0);
        this.BOTpipe.depth = 2;

        // añade la tuberia al array de tuberias
        this.pipes.push(this.BOTpipe);

    }

    // genera una nueva altrua para la tuberia
    createNewHeight(){
        let height = Phaser.Math.Between(-20, 80)

        console.log(height);
        return height;

        // -20 - 80
    }

}