const FONT_SIZE = 24;
const FONT_FAMILY = "lato";
const WIDTH_FACTOR = 12;

/**
 * Clase que representa a una de las opciones dentro de una decisión en el diálogo
 * @extends Container
 */
export default class Decision extends Phaser.GameObjects.Container { 
    /**
	 * Constructor del botón
     * @param {Scene} scene - escena en la que se añade
	 * @param {int} x - posicion horizontal
     * @param {int} y - posicion vertical
     * @param {Sprite} imagen - key entre comillas simples a la imagen ya carcada en la escena para la apariencia de los botones
     * @param {int} width - anchura
     * @param {int} height - altura
     * @param {string} text - texto a representar
     * @param {int} corner - tamaño del frame del 3-slice
     * @param {int} id - numero en el array de la opcion
	*/
    constructor(scene, x, y, sprite, width, height, text, corner, value) {
		// super a la escena
		super(scene, x, y);

        this.nineslice = scene.add.nineslice(
            x, 
            y, 
            sprite, 
            0, 
            width, 
            height, 
            corner,
            corner
        )
        this.nineslice.setInteractive(); 
        this.text = scene.add.text(
            x - text.length * WIDTH_FACTOR/2 + text.length/1.5, 
            y - FONT_SIZE/2, 
            text, 
            { 
                fontFamily: FONT_FAMILY,
                fontSize: FONT_SIZE
            }
        );

        this.nineslice.on('pointerdown', function(){
            scene.eventEmitter.emit('decided', value);
        })

        this.on('destroy', function onDestroy() {
			console.log("ME MUEROOOO");
			this.nineslice.destroy();
            this.text.destroy();
		}); // esto funciona
	}
}
