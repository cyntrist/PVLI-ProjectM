import newBG from "./newBG";

export class Button extends Phaser.GameObjects.Container {
	
	/**
	 * Contructor del sombrero
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} text// txt
		
	 }} boxSprite //
	 * 
	 */

	
	constructor(scene, x, y, text, boxSprite) {
		
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
			this.click();
		});
	}

	click () {
		//super.changeBG('pasillo');
		console.log("TETORRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS");
		new newBG(this, 0, 0, 'pasillo');

	}
  }

	