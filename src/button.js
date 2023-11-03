
/**
 * Clase que representa a un boton clickable para cambiar de escena.
 * @extends Container
 */
export default class Button extends Phaser.GameObjects.Container {
	/**
	 * Contructor del boton 
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} text // txt
	 * @param {String} boxSprite // sprite de la caja
	 * @param {number} nextbg // escenario al que va
	 */
	constructor(scene, x, y, text, boxSprite, nextbg) {
		// super a la escena
		super(scene, x, y);

		// crea la caja
		this.box = new Phaser.GameObjects.Sprite(scene, x, 300, boxSprite, 0); 
		this.box.setScale(2,2);
		this.add(this.box);

		const tryout = scene.add.text(x, 300, text);
		this.add(tryout); 

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
		//
		scene.nextBG = nextbg;
		scene.Scenary = text;
	}
  }

	