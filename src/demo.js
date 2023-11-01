//import Arrow from "./arrow";


export default class Demo extends Phaser.Scene {
	/**
	 * Constructor, con key  --->
	 */
	constructor() {
		super('demo');
	}

	
	preload() {
		// carga la flecha
		this.load.image('arrow', 'assets/images/escenarios/flecha.png');

		// carga la caja de texto
		this.load.image('cajatxt', './assets/images/escenarios/cajaDeTexto.png');

		// carga los fondos
		this.load.image('clase', './assets/images/escenarios/clase2.jpg');
		this.load.image('pasillo', 'assets/images/escenarios/pasillo.jpg');
	}

	create() {
		// fondo
		this.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0); // el fondo

		//this.add.image(650, 590, 'cajatxt').setScale(0.95,0.95); // 625

		//new Arrow();

		this.saySomething('no me puedo creer que esto este funcionando aaaaaaa');

	}

	update(){


	}


	// metodo para decir algo (text)
	saySomething(text){
		this.add.image(650, 590, 'cajatxt').setScale(0.95,0.95);

		this.label = this.add.text(100, 500, '');
        this.typewriteText(text);

	}


	typewriteText(text)
    {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 100
        })
    }

    typewriteTextWrapped(text)
    {
        const lines = this.label.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
    }

}