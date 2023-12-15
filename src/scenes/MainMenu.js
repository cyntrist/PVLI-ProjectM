import Button from "../objects/button.js";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		
		super({ key: 'mainMenu'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo
		this.load.image('fondoMain', './assets/images/fondoweb/fondoraro.jpg');

		// boton de play
		this.load.image('goBackBox', './assets/images/escenarios/goBack.png');


	}

	create (){

		const scene = this // referencia a esta misma escena

		// pone el fondo
		let bg = this.add.image(0, 0, 'fondoMain').setScale(0.5).setOrigin(0, 0);
		bg.depth = -2;

		// boton de play
		let playButton = new Button(this, 300, 200, ' ', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("Demo", scene) } );

	}

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);

	}

  }