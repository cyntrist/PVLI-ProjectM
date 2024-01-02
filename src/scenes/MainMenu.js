import Button from "../objects/button.js";

export default class MainMenu extends Phaser.Scene {
	constructor() {
		
		super({ key: 'mainMenu'});
	}

	preload (){
		this.canvas = this.sys.game.canvas;

		// fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.image('fondo_main', './assets/images/fondoweb/fondoraro.png');

		// boton de play
		this.load.image('logo', './assets/images/logo/logoconsombrapeque.png');

		//Musica de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.audio('main_music', "./assets/sounds/bgm/dogs-and-cats/Dogs_and_Cats.mp3");
	}

	create (){
		//Añadimos la musiquita y le damos al play
		this.music = this.sound.add("main_music", { loop: true });
		this.music.play();

		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'fondo_main').setScale(0.5).setOrigin(0, 0);
		bg.depth = -2;

		// boton de play
		let playButton = new Button(this, 315, 175, ' ', 2, 'logo', { "ClickCallback": () => this.changeScene("Demo", scene),
																			"EnterCallback": () =>this.overButton(playButton),
																			"ExitCallback": () => this.exitButton(playButton) } );
		playButton.box.setScale(0.75, 0.75);
		playButton.box.setOrigin(0.5,0.5);
		
		this.playTween = this.tweens.add({
			targets: playButton.box,
			ease: 'Sine.easeInOut',
			scale: 0.85,
			duration: 500,
			yoyo: true,
			repeat: -1,
			persist: true
		})

	}

	changeScene(newScene, escena){
		escena.scene.switch(newScene);
		
		//pausamos la música para poder cambiarla
		this.music.pause();
	}

	overButton(but) {
		but.box.tint = "0xc24d6d" ;
		this.playTween.pause();
		
	}

	exitButton(but) {
		but.box.tint = "0xF6F6F6" ;
		this.playTween.play();
	}

  }