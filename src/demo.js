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

	}

	update(){


	}


	// metodo para decir algo (text)
	saySomething(text){
		this.add.image(650, 590, 'cajatxt').setScale(0.95,0.95); 

		

	}

}