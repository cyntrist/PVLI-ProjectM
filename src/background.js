export class Background extends Phaser.scene.GameObjects.image {
	
	/**
	 * Contructor del sombrero
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} bg// txt
	 * 
	 */

	constructor(scene, x, y, bg) {
		
		// super a la escena
		super(scene, x, y);

        scene.add.image(x, y, bg).setScale(0.35, 0.35).setOrigin(0, 0);

		// añade el container
    	scene.add.existing(this);
	}
  }

	