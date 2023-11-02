/**
 * Clase que representa a un personaje en pantalla.
 * @extends Container
 */
export default class Character extends Phaser.GameObjects.Container {
	/**
	 * Contructor del personaje
	 * @param {Scene} scene, escena en la que aparece
     * @param {number} x - posición X
	 * @param {number} y - posicion Y
	 * @param {String} nombre - nombre del personaje
     * @param {sprite} sprite - su imagen
	 */

    constructor(scene, x, y, nombre, sprite) {
        super (scene, x, y);
        //...
    }

}
