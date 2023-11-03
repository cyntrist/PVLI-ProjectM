
export class Button extends Phaser.GameObjects.Container {
	
	/**
	 * Contructor del sombrero
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} text// txt
	 * 
		
	 }} boxSprite //
	 * 
	 */

	
	constructor(scene, x, y, text, boxSprite, oldBG) {
		
		// super a la escena
		super(scene, x, y);

		// crea la caja
		this.box = new Phaser.GameObjects.Sprite(scene, 600, 300, boxSprite, 0); 
		this.box.setScale(2,2);
		this.add(this.box);

		// añade el container
    	scene.add.existing(this);

		// lo hace interactivo
		this.box.setInteractive();

		// interaccion con la caja
		this.box.on('pointerdown', (pointer) => {
			this.click(scene, oldBG);
		});
	}

	click (scene, oldBG) {
		//super.changeBG('pasillo');
		console.log("TETORRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS");
		this.createBG(scene, oldBG);

	}

	createBG(scene, oldBG){

		let newBG = scene.add.image(0, 0, 'pasillo').setScale(0.35, 0.35).setOrigin(0, 0);
		newBG.depth = 0;

		//oldBG.destroy();

		console.log("odio js");

	}
  }

	