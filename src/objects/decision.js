

const OPTION_HEIGHT = 50; // altura de cada opcion de decision
const CORNER_SLICE = 40; // pixeles que ocupa el width/height de cada casilla de nineslice
const FONT_SIZE = 24;
const FONT_FAMILY = "lato";
const WIDTH_FACTOR = 12;

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
		super(scene, 0, 0);
		let option_width = 300; // en vez de 300, calculo de que opcion es más larga 
		let longestNode = this.longest(choices);
		option_width = longestNode.text.es.length;	
		this.buttons = [];
		this.texts = [];

		for (let i = 0; i < choices.length; i++) {
			let currentOption = choices[i].text.es;
			let button = scene.add.nineslice(
				scene.width/2, 
				(scene.height - scene.dialog.windowHeight) * (i + 1)/(choices.length + 1), 
				'9slice', 0, option_width * WIDTH_FACTOR, 
				0, 
				CORNER_SLICE,
				CORNER_SLICE
			); 
			let text = scene.add.text(
				scene.width/2 - currentOption.length * WIDTH_FACTOR/2 + currentOption.length/1.5, 
				(scene.height - scene.dialog.windowHeight) * (i + 1)/(choices.length + 1) - FONT_SIZE/2, 
				currentOption, 
				{ 
					fontFamily: FONT_FAMILY,
					fontSize: FONT_SIZE
				}
			);
			this.buttons.push(button);
			this.texts.push(text);
		}

		// Escucha su propia destruccion para limpiar / Método destructor
		this.on('destroy', function onDestroy() {
			console.log("ME EJECUTOOO");
			for(let i = 0; i < this.texts.length; i++) {
				this.texts[i].destroy();
			}
			for(let i = 0; i < this.buttons.length; i++) {
				this.buttons[i].destroy();
			}
			this.buttons.length = 0;
			this.texts.length = 0;
		}); // esto funciona
	}

	/**
	 * Método para consultar el string más largo de un array de strings
	 * @param {*} choices - array de nodos para comparar longitud de sus textos
	 * @returns el nodo con el texto más grande del array
	 */
	longest(choices) {
		let longestLength = choices[0].text.es.length; // valor de longitud mayor (entero)
		let longest = choices[0];  // string mayor en cuestion (string)
	  
		for (let i = 1; i < choices.length; i++) { // itera sobre el array
		  let currentLength = choices[i].text.es.length;  // longitud actual
	  
		  if (currentLength > longestLength) { // si la longitud actual es mayor que la mayor hasta el momento
			longest = choices[i]; // actualiza el valor a retornar
			longestLength = currentLength; // actualiza la longitud maxima
		  }
		}
	  
		return longest; // Return the longest string found
	  }
}
