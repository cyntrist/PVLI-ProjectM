
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

	
	constructor(scene, x, y, text, boxSprite, nextbg) {
		
		// super a la escena
		super(scene, x, y);

		// crea la caja
		this.box = new Phaser.GameObjects.Sprite(scene, 600, 300, boxSprite, 0); 
		this.box.setScale(2,2);
		this.add(this.box);

		//this.txt = new Phaser.GameObjects.text(0, 0, "TETAS");
		//let txt = scene.add.text(100, 100, 'Phaser');
		// añade el container
    	scene.add.existing(this);

		// lo hace interactivo
		this.box.setInteractive();

		// interaccion con la caja
		this.box.on('pointerdown', (pointer) => {
			this.click(scene, text, nextbg);
			
		});
	}

	click (scene, text, nextbg) {
		//super.changeBG('pasillo');
		//console.log("TETORRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS");
		//console.log("1 " + text);
		scene.nextBG = nextbg;
		scene.Scenary = text;
		//console.log("2 "+ scene.Scenary);

	}
  }

	