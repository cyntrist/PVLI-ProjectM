

const OPTION_HEIGHT = 50; // altura de cada opcion de decision
const CORNER_SLICE = 350; // pixeles que ocupa el width/height de cada casilla de nineslice

/**
 * Clase que representa a una decision en el diálogo, compuesta por diferentes botones
 * @extends Container
 */
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
		super(scene, 100, 100);
		let option_width = 300; // en vez de 300, calculo de que opcion es más larga 
		let este = this;
		let eleccionMasLarga = this.longest(choices);
		console.log(eleccionMasLarga);
		option_width = eleccionMasLarga.length;
		console.log(option_width);
		/*
		for (let i = 0; i < choices.length; i++) {
            let button = este.add.nineslice(
				scene.width, scene.height * (i + 1) / choices.length,   // this is the starting x/y location
				option_width, OPTION_HEIGHT,   // the width and height of your object // ESTO DEBERIA SER EL WIDTH DE LA OPCION MÁS LARGA Y EL HEIGHT FIJO
				sprite, // a key to an already loaded image
				CORNER_SLICE,         // the width and height to offset for a corner slice
				24          // (optional) pixels to offset when computing the safe usage area
			)
			scene.add(button); // añade cada boton a la escena
        }*/
	}

	/**
	 * Método para consultar el string más largo de un array de strings
	 * @param {*} choices - array de nodos para comparar longitud de sus textos
	 * @returns el string más largo del array
	 */
	longest(choices) {
		let longestLength = choices[0].text.es.length; // valor de longitud mayor (entero)
		let longest = choices[0].text.es;  // string mayor en cuestion (string)
	  
		for (let i = 1; i < choices.length; i++) { // itera sobre el array
		  var currentLength = choices[i].text.es.length;  // longitud actual
	  
		  if (currentLength > longestLength) { // si la longitud actual es mayor que la mayor hasta el momento
			longest = choices[i].text.es; // actualiza el valor a retornar
			longestLength = currentLength; // actualiza la longitud maxima
		  }
		}
	  
		return longest; // Return the longest string found
	  }
}
