
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
	constructor(scene, x, y, text, boxSprite, nextbg, { clickCallback, overCallback }) {
		// super a la escena
		super(scene, x, y);

		// crea la caja
		this.box = new Phaser.GameObjects.Sprite(scene, x, y, boxSprite);
		this.box.setScale(2, 2);
		this.add(this.box);

		x -= 30
		y -= 10;
		const tryout = scene.make.text({
			x,
			y,
			text,
			style: {
				fontSize: 20,
				fontFamily: 'lato'
			}
		})
		this.add(tryout);

		// añade el container
		scene.add.existing(this);

		// lo hace interactivo
		this.box.setInteractive();

		// interaccion con la caja
		if (clickCallback)
			this.box.on('pointerdown', clickCallback);

		//Reconoce que el ratón está encima de la función
		if (overCallback)
			this.box.on('pointerover', overCallback);


	}


}

