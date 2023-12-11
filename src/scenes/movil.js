import Button from "../objects/button.js";

export default class Movil extends Phaser.Scene {
	constructor() {
		
		super({ key: 'movil'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo
		this.load.image('movilph', './assets/images/escenarios/movilPH.png');

		// boton de vuelta
		this.load.image('goBackBox', './assets/images/escenarios/goBack.png');

	}

	create (){

		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'movilph').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

		// boton de vuelta
		let but1 = new Button(this, 100, 320, 'Demo', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("Demo", scene) } );
		but1.depth = 2;

		// boton de melon flip
		let but2 = new Button(this, 200, 200, 'melonFlip', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("melonFlip", scene) });
	}

	// update (que no hara falta)

	ChangeScene(newScene, escena){
		escena.scene.start(newScene);

	}

  }
