import DialogText from "./dialog_plugin.js";

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

    constructor(scene, x, y, sprite, nombre) {
        super (scene, x, y);
        this.add(sprite);
        this.sprite = sprite;
        this.nombre = nombre;
        this.sprite.setBlendMode(Phaser.BlendModes.DARKEN);
        this.onUnfocus();
        scene.add.existing(this);
    }

    say(escena, mensaje, personajes) {
        this.onFocus(); // focus en este personaje
        for (let i = 0; i < personajes.length; i++) { // al resto los oscurece (no pueden hablar dos personajes a la vez :P)
            if (personajes[i] !== this) {
                personajes[i].onUnfocus();
            }
        }
        escena.dialog.setText(this.nombre + ":\n" + mensaje, true); // blabla
    }

    onFocus() {
        this.focus = true;
        this.sprite.clearTint(); // sin filtro
    }

    onUnfocus() {
        this.focus = false;
        this.sprite.setTint(0x858585); // filtro oscuro
    }
}
