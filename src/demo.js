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

		// carga los fondos
		this.load.image('clase', './assets/images/escenarios/clase2.jpg');


		this.load.image('pasillo', 'assets/images/escenarios/pasillo.jpg');
	}

	create() {
		// fondo
		this.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0); // el fondo



		//new Arrow();

	}

	update(){


	}

}