import Button from "../objects/button.js";

/**
 * Clase que representa a una decision en el diálogo, compuesta por diferentes botones
 * @extends Container
 */
export default class Button extends Phaser.GameObjects.Container {
	/**
	 * Constructor de la decisión
	 * X e Y deberian ser siempre fijas y relativas, no poro parametros
	 * @param {Choices} array de objetos (o simplemente objeto?) con keys a los diferentes textos de las opciones de diálogo
     * ...
	 */
    constructor(scene, x, y, text, boxSprite, nextbg) {
		// super a la escena
		super(scene, x, y);
	}
}
