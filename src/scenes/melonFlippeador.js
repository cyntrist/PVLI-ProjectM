import Pipe from "../melonFlip/pipe.js";

export default class MelonFlippeador extends Phaser.Scene
{

    constructor() {

		super({ key: 'melonFlippeador'});   

        // crea un emitidor de eventos
        this.emitter = new Phaser.Events.EventEmitter();
       
	}




    preload(){
        // fondo
        this.load.image('fondo', './assets/images/escenarios/melonFlip.png');

        // boton de vuelta
        this.load.image('goBackBox', './assets/images/escenarios/goBack.png');

        // melon flippeando
        this.load.image('melon', './assets/images/personajes/melonQueFlippea2.png');

        // tuberia flippeando
        this.load.image('pipe', './assets/images/personajes/pipe2.png');

    }

    create(){



        this.cursor = this.input.keyboard.createCursorKeys();

        // pone el fondo
        let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        bg.depth = -2;


        // crea el pajaro ¿?¿¿?
        this.mel = this.physics.add.sprite(150, 270, 'melon', 0);

        // grupo de colisiones para las tuberias
        this.pipeGroup = this.physics.add.group({
            classType: Pipe,
            runChildUpdate: true,
            allowGravity: false

        })

        this.END = false;

        // array de pipes
        this.pipes = [];

        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;


        this.PIPE = this.physics.add.group({
            defaultKey: 'pipe',
            collideWorldBounds: false
        });

        this.physics.add.collider(this.mel, this.PIPE, this.melonDie(this));


        this.emitter.on('melondied', function () {
			console.log("aaaa");
		});
        
        
       
        

    }

    update(){

        if(!this.END){
            if(this.cursor.up.isDown){
                this.mel.setVelocityY(-200);
            }
    
            this.pipeManager();
        }
        else{
            console.log("UWU");
        }
        

      
    }


    pipeManager(){
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

    melonDie(){
        
        // En otro punto de nuestro juego (this es la escena)
       
        console.log("MUEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

        //console.log(scene);

        //scene.emitter.emit('melondied');

    }


    // --------------------------------- AUXILIARES -----------------------------
    createNewPipe(){

        // crea una altura
        let height = this.createNewHeight();

        // crea la tuberia de arriba
        this.TOPpipe = this.PIPE.create(1200, height).body.setAllowGravity(false);
        this.TOPpipe.setVelocity(-100, 0);
        this.TOPpipe.depth = 2;
        this.pipes.push(this.TOPpipe);


        // crea una tuberia de abajo
        this.BOTpipe = this.PIPE.create(1200, height + 600).body.setAllowGravity(false);
        this.BOTpipe.setVelocity(-100, 0);
        this.BOTpipe.depth = 2;
        this.pipes.push(this.BOTpipe);

    }

    createNewHeight(){
        let height = Phaser.Math.Between(-20, 80)

        //console.log(height);
        return height;

        // -20 - 80
    }


    endGame(){

    }
}


