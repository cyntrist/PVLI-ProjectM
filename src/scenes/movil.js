import Button from "../objects/button.js";


export default class Movil extends Phaser.Scene {
	/**
	 * Contructor del boton 
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 */
	constructor() {
		
		super({ key: 'movil'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo
		this.load.image('movil', './assets/images/escenarios/movilPH.png');

		// boton de vuelta
		this.load.image('goBackBox', './assets/images/escenarios/goBack.png');

	}

	create (){
		// pone el fondo
		let bg = this.add.image(0, 0, 'movil').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

		// boton de vuelta
		let but1 = new Button(this, 100, 320, 'Demo', 'goBackBox', this.ChangeScene);
		but1.depth = 2;

		// boton de melon flip
		let but2 = new Button(this, 200, 200, 'melonFlip', 'goBackBox', this.ChangeScene);
		but2.depth = 2;
	}

	// update (que no hara falta)

	ChangeScene(newScene, escena){

		console.log(newScene);

		escena.scene.start(newScene);

	}

  }
