import Button from "../objects/button.js";
import NineSlice from "../plugins/nineslice.js";
//import { Plugin as NineSlicePlugin } from 'phaser3-nineslice' 
/**
 * Clase que representa a una decision en el diálogo, compuesta por diferentes botones
 * @extends Container
 */

const OPTION_HEIGHT = 50;
const CORNER_SLICE = 350; // pixeles que ocupa el width/height de cada casilla de nineslice

export default class Button extends Phaser.GameObjects.Container {
	/**
	 * Constructor de la decisión
	 * X e Y deberian ser siempre fijas y relativas, no poro parametros
	 * @param {Choices} opciones - array de objetos (o simplemente objeto?) con keys a los diferentes textos de las opciones de diálogo
     * @param {Sprite} imagen - key entre comillas simples a la imagen ya carcada en la escena para la apariencia de los botones
	 * @param {int} eleccion - índice de la opcion escogida de opciones
	*/
    constructor(scene, choices, sprite) {
		// super a la escena
		super(scene, x, y);
		let option_width = 300; // en vez de 300, calculo de que opcion es más larga 
		let este = this;
		for (let i = 0; i < choices.length; i++) {
            let button = este.add.nineslice(
				scene.width, scene.height * (i + 1) / choices.length,   // this is the starting x/y location
				option_width, OPTION_HEIGHT,   // the width and height of your object // ESTO DEBERIA SER EL WIDTH DE LA OPCION MÁS LARGA Y EL HEIGHT FIJO
				sprite, // a key to an already loaded image
				88,         // the width and height to offset for a corner slice
				24          // (optional) pixels to offset when computing the safe usage area
			)
			scene.add(button); // añade cada boton a la escena
        }
	}
}
