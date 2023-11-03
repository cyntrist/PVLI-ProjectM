
export class Button extends Phaser.GameObjects.Container {
	
	/**
	 * Contructor del sombrero
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} text// txt
	 * @param {String} boxSprite //
	 * 
	 */

	
	constructor(scene, x, y, text, boxSprite) {
		
		super(scene, x, y);
		this.box = new Phaser.GameObjects.Sprite(scene, 600, 300, boxSprite, 0); 
		this.box.setScale(2,2);
		this.add(this.box);

		
		//let txt = scene.add.text(x, y, text);
    	scene.add.existing(this);

		//this.setScale().setInteractive();

		this.box.setInteractive();

		//console.log();

		this.box.on('pointerdown', (pointer) => {
			this.click(pointer);
		});

		// hitbox, Phaser.Geom.Rectangle.Contains(rect, pointer.x, pointer.y)
	}
	create() {
		
	  //const button1 = this.add.text(100, 100, text, { fill: '#0f0' });
	  //helloButton.setInteractive();

	}


	click (pointer) {
		console.log("TETORRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAS");
		console.log(pointer.x + " " + pointer.y);
	}
  }

	