/**
 * Clase que representa el sombrero de los p�jaros
 * @extends Spite
 */
export default class Arrow extends Phaser.GameObjects.Sprite {
	/**
	 * Contructor del sombrero
	 * @param {Scene} scene, escena en la que se a�ade el sombrero
	 * @param {number} arrowID, identificador para la apariencia de la flecha, corresponde al frame del Spritesheet
	 */
	constructor(scene, hatId) {
		// Llamamos al constructor del padre {Sprite}
		super(scene, 0, 0, 'arrow', arrowId);

		// A�adimos el sombrero a la escena y lo hacemos interactivo (podremos comprobar si se ha pulsado sobre el sombrero)
		this.scene.add.existing(this);
		this.setInteractive();

		// Escuchamos el evento 'pointerdown'. El sombrero ser� interactivo, por lo que podremos saber si se pulsa en �l y hacer lo que sea necesario
		// El segundo par�metro de la funci�n "on()" tenemos que pasar la funci�n que queramos ejecutar si pasa el evento (es un callback). En este caso definimos una funci�n an�nima arrow que ejecutar� la funci�n "explode()"
		// Para estas cosas mirad la documentaci�n, por ejemplo del evento "pointerdown" https://newdocs.phaser.io/docs/3.54.0/Phaser.Input.Events.POINTER_DOWN  (se ve que lleva asociado ese objeto pointer con las coordenadas de la pulsaci�n)
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
	 * Acci�n para moverse de escenario
	 */
	move() {
		console.log("me voy chau chauuuuu");
	}


}