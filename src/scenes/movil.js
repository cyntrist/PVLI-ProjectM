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

		// boton melon flip
		this.load.image('melonflip', './assets/images/movil/melonFlip.png');

		// musiquita de fondo
		this.load.audio('movileMusic', ["/assets/sounds/dogs-and-cats/Dogs and Cats.mp3"]);

	}

	create (){

		this.music  = this.sound.add("movileMusic", { loop: true });
		this.music.play();

		const scene = this // referencia a esta misma escena
		// pone el fondo
		let bg = this.add.image(0, 0, 'movilph').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

		// boton de vuelta
		let but1 = new Button(this, 100, 320, ' ', 2, 'goBackBox', { "ClickCallback": () => this.ChangeScene("Demo", scene) } );

		// boton de melon flip
		let but2 = new Button(this, 300, 250, ' ', 2, 'melonflip', { "ClickCallback": () => this.ChangeScene("melonFlippeador", scene) }).setScale(0.75);
	}

	//Solo se utiliza para la música
	update() {
		if(!this.music.isPlaying) {
			this.music.play()
		}
	} 

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);
		this.music.pause();

	}

  }
