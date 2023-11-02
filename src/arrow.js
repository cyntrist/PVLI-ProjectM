/**
 * Clase que representa el sombrero de los p�jaros
 * @extends Spite
 */
export default class Arrow extends Phaser.GameObjects.Sprite {
	/**
	 * Contructor del sombrero
	 * @param {Scene} scene, escena en la que esta la flecha
	 * @param {number} x // posicion x
	 * @param {number} y // posicion y
	 * @param {String} current // escenario en el que esta
	 * @param {String} target // escena a la que va
	 * @param {number} spriteID
	 */
	constructor(scene, x, y, current, target, spriteID) {
		// Llamamos al constructor del padre {Sprite}
		super(scene, x, y, 'arrow', spriteID);

		// añadir flecha y hacerla interactiva
		this.scene.add.existing(this);
		this.setInteractive();

		

		// Escuchamos el evento 'pointerdown'. El sombrero ser� interactivo, por lo que podremos saber si se pulsa en �l y hacer lo que sea necesario
		// El segundo par�metro de la funci�n "on()" tenemos que pasar la funci�n que queramos ejecutar si pasa el evento (es un callback). En este caso definimos una funci�n an�nima arrow que ejecutar� la funci�n "explode()"
		// Para estas cosas mirad la documentaci�n, por ejemplo del evento "pointerdown" https://newdocs.phaser.io/docs/3.54.0/Phaser.Input.Events.POINTER_DOWN  (se ve que lleva asociado ese objeto pointer con las coordenadas de la pulsaci�n)
		

		this.on('pointerdown', (pointer) => {
			this.move(pointer);
		});

		console.log(x + " " + y);
	

	}

	/**
	 * preUpdate de la flecha
	 * @param {number} t 
	 * @param {number} dt 
	 */
	preUpdate(t, dt){
		super.preUpdate(t, dt) // IMPORTANTE llamar al super.preUpdate del padre cuando somos sprites. Si no se llama, no habrá animación!!!!!!!!!!!!!

	}


	/**
	 * Acci�n para moverse de escenario
	 */
	move() {
		console.log("me voy chau chauuuuu");
	}


}