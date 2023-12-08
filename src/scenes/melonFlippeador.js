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

        // si es 0 es que no ha acabado si es 1 es que ha acabado (NO SE HACER BOOLEANOS)
        this.gameEnded = 0;

        // 
        this.SCORE = 0;

        // crea la zona donde puntua 


        this.scene = this;
        this.cursor = this.input.keyboard.createCursorKeys();

        // pone el fondo
        let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        bg.depth = -2;

        this.PIPE = this.physics.add.group({
            defaultKey: 'pipe',
            collideWorldBounds: false
        });


        // crea el pajaro ¿?¿¿?
        this.mel = this.physics.add.sprite(150, 270, 'melon', 0);

        // grupo de colisiones para las tuberias
        this.pipeGroup = this.physics.add.group({
            classType: Pipe,
            runChildUpdate: true,
            allowGravity: false

        })

        // array de pipes
        this.pipes = [];

        // crea las colisiones
        this.colliderObj = this.physics.add.collider(this.mel, this.PIPE,() =>{

            // cuando colisiona memite el evento
            this.emitter.emit('died', this);
        });


        // crea un evento y un listener para el evento (la funcion)
        this.emitter.on('died', function(scene){

            console.log("i died");

            // acaba el juego
            scene.endGame();

            // limpia el grupo de colisiones
            scene.PIPE.clear();
            
            // elimina los objetos
            for(let i = 0; i<scene.pipes.length; i++){

                scene.pipes[i].destroy();
            }
            
            // desactiva las fisicas
            scene.mel.body.setEnable(false);
        });


        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;

        
    }

    update(){

        if(this.gameEnded === 0){
            if(this.cursor.up.isDown){
                this.mel.setVelocityY(-200);
            }
    
            this.pipeManager(); 

            // add score
            this.pipeScoreAdder();

            // elimina tuberias

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

    pipeDeleter(){
        for(let i = 0; i<this.pipes.length; i++){
            if(this.pipes[i].x < -200){

                console.log("DELETED");

                this.pipes[i].pop();
            }

        }
        
    }

    pipeScoreAdder(){
        for(let i = 0; i<this.pipes.length; i++){

            // si no se ha pasado y esta en una posicion mas baja que el melon
            if(!this.pipes[i].passed && this.pipes[i].x < 200){

                this.addPoints();

                this.pipes[i].passed = true;

                console.log("score added");
            }
            else if(this.pipes[i].x < -200){

                //console.log("DELETED");

                // elimina el elemento del array
                
            }

        }

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

        this.gameEnded = 1;
    }

    addPoints(){
        this.SCORE += 10;
    }
}


