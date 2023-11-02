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
     * @param {Sprite} sprite - identificador del sprite que se usará
     * @param {bool} focus - si estan hablando en el instante actual
	 */

    constructor(scene, x, y, sprite) {
        super (scene, x, y);
        this.add(sprite);
        scene.add.existing(this);
        //...
    }

}
