import Button from "../objects/button.js";
import NineSlice from "../plugins/nineslice.js";
//import { Plugin as NineSlicePlugin } from 'phaser3-nineslice' 
/**
 * Clase que representa a una decision en el diálogo, compuesta por diferentes botones
 * @extends Container
 */
export default class Button extends Phaser.GameObjects.Container {
	/**
	 * Constructor de la decisión
	 * X e Y deberian ser siempre fijas y relativas, no poro parametros
	 * @param {Choices} array de objetos (o simplemente objeto?) con keys a los diferentes textos de las opciones de diálogo
     * @param {Sprite} key entre comillas simples a la imagen ya carcada en la escena para la apariencia de los botones
	 */
    constructor(scene, x, y, text, boxSprite, nextbg) {
		// super a la escena
		super(scene, x, y);
	}
}
