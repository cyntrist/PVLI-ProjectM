import Button from "../objects/button.js";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		
		super({ key: 'mainMenu'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo
		this.load.image('fondoMain', './assets/images/fondoweb/fondoraro.png');

		// boton de play
		this.load.image('goBackBox', './assets/images/logo/logoconsombrapeque.png');
	}

	create (){
		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'fondoMain').setScale(0.5).setOrigin(0, 0);
		bg.depth = -2;

		// boton de play
		let playButton = new Button(this, 315, 200, ' ', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("Demo", scene),
																			"EnterCallback": () =>this.OverButton(playButton),
																			"ExitCallback": () => this.ExitButton(playButton) } );
		playButton.box.setScale(0.5, 0.5);
		this.playTween = this.tweens.add({
			targets: playButton,
			scaleX: 0.95,
			scaleY: 0.95,
			duration: 500,
			yoyo: true,
			repeat: -1,
			persist: true
		})



	}

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);

	}

	OverButton(but) {
		but.box.tint = "0xc24d6d" ;
		this.playTween.pause();
		
	}

	ExitButton(but) {
		but.box.tint = "0xF6F6F6" ;
		this.playTween.play();
	}

  }