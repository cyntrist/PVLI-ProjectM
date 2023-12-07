

import Pipe from "../melonFlip/pipe.js";


export default class MelonFlippeador extends Phaser.Scene{

    constructor() {

		super({ key: 'melonFlippeador'});
	}




    preload(){
        // fondo
        this.load.image('fondo', './assets/images/escenarios/melonFlip.png');

        // boton de vuelta
        this.load.image('goBackBox', './assets/images/escenarios/goBack.png');

        // melon flippeando
        this.load.image('melon', './assets/images/personajes/melonQueFlippea2.png');

        // tuberia flippeando
        this.load.image('pipe', './assets/images/personajes/pipe.png');

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

        // array de pipes
        this.pipes = [];

        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;


        this.PIPE = this.physics.add.group({
            defaultKey: 'pipe',
            collideWorldBounds: false
        });

        this.physics.add.collider(this.mel, this.PIPE, this.melonDie);
    }

    update(time){
        //console.log(time);

        if(this.cursor.up.isDown){
            console.log("holo soy eddochan");
            this.mel.setVelocityY(-200);
        }

        this.pipeManager();

        this.paralax();


        console.log(this.physics.collide(this.mel, this.pipeGroup));

        if(this.physics.collide(this.mel, this.PIPE)) {
            console.log("Hay colisión");
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
        
        console.log("MUEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");

    }


    // --------------------------------- AUXILIARES -----------------------------
    createNewPipe(){

        // crea una altura
        let height = this.createNewHeight();


        // crea el pajaro ¿?¿¿?
        //this.mel = this.physics.add.sprite(150, 270, 'melon', 0);
        // crea una tuberia
        //this.TOPpipe = this.physics.add.sprite(700, height, 'pipe', 0).setAllowGravity(false);



       

        // Total gravity is 150.
        this.TOPpipe = this.PIPE.create(1200, height).body.setAllowGravity(false);


        this.TOPpipe.setVelocity(-100, 0);
        //new Pipe(this, 700, height, 'pipe', 0);
        this.TOPpipe.depth = 2;

        //this.TOPpipe.setScale(0.5, 0.8);

        // añade la tuberia al array de tuberias
        this.pipes.push(this.TOPpipe);

        //this.pipeGroup.add(this.TOPpipe);

        // crea una tuberia

        this.BOTpipe = this.physics.add.sprite(700, height + 410, 'pipe', 0);
        // new Pipe(this, 700, height + 410, 'pipe', 0);
        this.BOTpipe.depth = 2;

        // añade la tuberia al array de tuberias
        this.pipes.push(this.BOTpipe);

        this.pipeGroup.add(this.BOTpipe);

        //console.log(this.pipeGroup);

    }

    createNewHeight(){
        let height = Phaser.Math.Between(-20, 80)

        //console.log(height);
        return height;

        // -20 - 80
    }

    paralax(){

        // ----------- pipes ------------

        // si hay tuberias
        for(let i = 0; i<this.pipes.length; i++){

            if(this.pipes[i] != undefined){
                console.log(this.pipes[i].x < -700);

                // si no esta fuera lo mueve
                if(!this.pipes[i].x < -700){

                    console.log("holi holi");
                    //
                    this.pipes[i].setVelocityX(-20);
                }
                else{
                    // lo saca del grupo de colisiones
                    //this.deleteFromGroup(this.pipes[i]);

                    this.pipeGroup.remove(this.pipes[i]);

                    // lo elimina
                    //this.pipes[i].destroy();
                }
            }
            
        }

        
    }


}