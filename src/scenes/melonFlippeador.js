import Button from "../objects/button.js";

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

        // -------------------- SETTEO INICIAL ---------------------

        const scene = this // referencia a esta misma escena

        // si es 0 es que no ha acabado si es 1 es que ha acabado (NO SE HACER BOOLEANOS)
        this.gameEnded = 0;

        // 
        this.SCORE = 0;

        // texto para el score
        this.scoreText = this.add.text(50, 50, this.SCORE, {
            fontFamily: 'Arial',
            fontSize: 35,
            color: '#3b6e22'
        });
        this.scoreText.setScale(2,2);

        this.cursor = this.input.keyboard.createCursorKeys();

        // pone el fondo
        let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
        bg.depth = -2;

        // grupo de fisicas de tuberias
        this.PIPE = this.physics.add.group({
            defaultKey: 'pipe',
            collideWorldBounds: false
        });

        // array de pipes
        this.pipes = [];

        // crea el melon
        this.mel = this.physics.add.sprite(150, 270, 'melon', 0).setOrigin(0.5,0.5);

        // tween del melon
        this.melonTween = this.tweens.add ({
            targets: this.mel,
			duration: 200,
		    angle: '+=360',
			persist: true
        })


        // ------------------- COLISIONES ----------------

        // crea las colisiones
        this.colliderObj = this.physics.add.collider(this.mel, this.PIPE,() =>{

            // cuando colisiona memite el evento
            this.emitter.emit('died', this);
        });

        // ----------------- END GAME EVENT ---------------------

        // crea un evento y un listener para el evento (la funcion)
        this.emitter.on('died', function(scene){

            // acaba el juego
            scene.endGame();

            // limpia el grupo de colisiones
            scene.PIPE.clear();
            
            // elimina los objetos
            for(let i = 0; i<scene.pipes.length; i++){

                // destruye el objeto
                scene.pipes[i].destroy();
            }
            
            // desactiva las fisicas
            scene.mel.body.setEnable(false);

            // llama a la escena del final
            scene.endScreen(scene);

        });


        // variables para los pipes
        this.pipeCooldown = 70;
        this.cdCounter = 0;

        
    }

    update(){

        // si el juego no ha acabado
        if(this.gameEnded === 0){

            // input
            if(this.cursor.up.isDown){
                // salto
                this.mel.setVelocityY(-200);
                this.melonTween.play();
            }

            // gestion de pipes
            this.pipeManager(); 

            // add score
            this.pipeScoreAdder();

            // si se ha pasado de alto o de bajo
            if(this.mel.y > 750 || this.mel.y < 0){

                    // cuando colisiona memite el evento
                    this.emitter.emit('died', this);

            }
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

    pipeScoreAdder(){
        for(let i = 0; i<this.pipes.length; i++){

            // si no se ha pasado y esta en una posicion mas baja que el melon
            if(!this.pipes[i].passed && this.pipes[i].x < 200){

                // pone puntos
                this.addPoints();

                // marca que se haya pasado
                this.pipes[i].passed = true;

            }
            else if(this.pipes[i].x < -200){

                // si n o es undefined
                if(this.pipes[i] != undefined){

                    // elimina el elemento del array
                    this.PIPE.remove(this.pipes[i], true);

                    this.pipes[i].destroy(false, true);

                    Phaser.Utils.Array.Remove(this.pipes, this.pipes[i]);
                }
                
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
        // genera un numero aleatorio
        let height = Phaser.Math.Between(-20, 80)

        // devuelve la altura generada
        return height;

        // -20 - 80
    }

    endGame(){

        // cambia el 'booleano'
        this.gameEnded = 1;
    }

    addPoints(){
        // pone 0.5 puntos (triquinyuela porque pasa dos veces por lo mismo heh)
        this.SCORE += 0.5;

        // actualiza el texto
        this.updateScoreText();
    }

    updateScoreText(){
        this.scoreText.setText(this.SCORE)
    }


    endScreen(escena){
        // boton de restart
        let restart = new Button(this, 590, 200, 'restart', 2, 'goBackBox', {"ClickCallback": () => this.restartGame (this) });

        // boton para volver al movil
        let movil = new Button(this, 100, 300, 'movil', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("movil", this) });

    }

    restartGame(escena){
        escena.scene.restart();
    }

    ChangeScene(newScene, escena){
		escena.scene.start(newScene);
	}
}


