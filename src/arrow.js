/**
 * Clase que representa el sombrero de los pájaros
 * @extends Spite
 */
export default class Arrow extends Phaser.GameObjects.Sprite {
	/**
	 * Contructor del sombrero
	 * @param {Scene} scene, escena en la que se añade el sombrero
	 * @param {number} arrowID, identificador para la apariencia de la flecha, corresponde al frame del Spritesheet
	 */
	constructor(scene, hatId) {
		// Llamamos al constructor del padre {Sprite}
		super(scene, 0, 0, 'arrow', arrowId);

		// Añadimos el sombrero a la escena y lo hacemos interactivo (podremos comprobar si se ha pulsado sobre el sombrero)
		this.scene.add.existing(this);
		this.setInteractive();

		// Escuchamos el evento 'pointerdown'. El sombrero será interactivo, por lo que podremos saber si se pulsa en él y hacer lo que sea necesario
		// El segundo parámetro de la función "on()" tenemos que pasar la función que queramos ejecutar si pasa el evento (es un callback). En este caso definimos una función anónima arrow que ejecutará la función "explode()"
		// Para estas cosas mirad la documentación, por ejemplo del evento "pointerdown" https://newdocs.phaser.io/docs/3.54.0/Phaser.Input.Events.POINTER_DOWN  (se ve que lleva asociado ese objeto pointer con las coordenadas de la pulsación)
		this.on('pointerdown', (pointer) => {
			this.move(pointer);
		});

	}

	/**
	 * preUpdate del sombrero
	 * @param {number} t 
	 * @param {number} dt 
	 */
	preUpdate(t, dt) {
		

	
	}


	/**
	 * Acción para moverse de escenario
	 */
	move() {
		console.log("me voy chau chauuuuu");
	}


}