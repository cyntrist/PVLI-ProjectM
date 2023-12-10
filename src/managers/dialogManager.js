import DialogText from "../plugins/dialog_plugin.js";
import Character from "../objects/character.js"
import Decision from "../objects/decision.js";
/**
 * Clase que maneja la lógica de diálogo
 * @extends Container
 */
export default class DialogueManager extends Phaser.GameObjects.Container {
    /**
     * @param {*} scene - 
     * @param {*} dayData - json del dia
     * @param {*} characters - objeto de objetos character
     * @param {*} dialog - ventana de dialogo (asume que ya existe)
     * @param {*} nineslice - key al sprite para el nineslice de los botones de las decisiones
     */
    constructor(scene, dayData, characters, nineslice){
        super(scene, 0, 0);
        // crea la ventana de diálogo
		scene.dialog = new DialogText(scene, {
			borderThickness: 6,
			borderColor: 0xF6F6F6,
			borderAlpha: 0.8,
			windowBorderRadius: 4,
			windowAlpha: 0.95,
			windowColor: 0xFF799A,
			windowHeight: 150,
			padding: 18,
			hasCloseBtn: false,
			closeBtnColor: 'white',
			dialogSpeed: 4.4,
			fontSize: 24,
			fontFamily: "lato"
		});
		scene.dialog.depth = 2;
		
		// parámetros
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3";
		let i = 0; // para contar dos clicks antes de decidir, una guarra da pero son las 6 de la mañana bestie
		let node = dayData.root.next; // primer nodo
		let decision; // scope dentro del constructor, va a ser la decisión cuando la haya
		scene.dialog.setText(title, true); // imprime la línea de título
		scene.dialog.graphics.on('pointerdown', function () { // cada click evento
			//decision?.destroy(); // si decision existe, la destruye (deberia estar destruida, medida de seguridad)
			let currentNode = dayData[node]; // para hacerlo más legible (sigue siendo infumable pero bueno)
			let currentName = currentNode.name.toLowerCase(); // idem
			let currentCharacter = characters[currentName];  // idem
			currentCharacter?.onFocus(); // si existe current character, lo enfoca
			currentCharacter?.unfocusEveryoneElse(characters); // y desenfoca al resto
			if (currentNode.hasOwnProperty("next") || currentNode.hasOwnProperty("choices")) { // si es un nodo intermedio y/o tiene tiene elecciones
				if ( i < 1) 
					scene.dialog.setText(currentNode.name + ":\n" + currentNode.text.es, true);
				if (currentNode.hasOwnProperty("choices")) { 
					if (i >= 1) { // manera muy guarra de necesitar dos clics antes de que aparezca la decision
						decision = new Decision(scene, currentNode.choices, nineslice);
						i = 0;
						scene.dialog.setInteractable(false); // desactiva la interaccion del cuadro de diálog hasta que se escoga una opción en el evento decided de decisonButtono
					} 
					else i++;
				}
				else node = currentNode.next; // si no hay decisiones, continuación lineal, el nodo actual pasa a ser el siguiente
			}
			else {
				scene.dialog.setText(currentNode.text.es); // se escribe el último msj
				characters["camille"].unfocusEveryone(characters); // se desenfoca a todo el mundo para acabar, camille como conejillo de indias porque sí
			}
		})		

		/**
		 * Receptor del evento decided, que viene de decisionButton.
		 * Cuando una opcion es escogida, actualiza el nodo en corcondancia
		 */
		scene.eventEmitter.on('decided', function (valor) {
			console.log('OPCION DECIDIDA: ', valor);
			characters["camille"].focusEveryone(characters); // se enfoca a todo el mundo al hablar, camille como conejillo de indias porque sí
			scene.dialog?.setText("T/N:\n" + dayData[node].choices[valor].text.es, true); // escribe lo escogido
			node = dayData[node].choices[valor].next; // pasa al siguiente nodo
			scene.dialog.setInteractable(true); // devuelve la interaccion al cuadro de diálogo
			decision.destroy(); // destruye la decison
		});
    }
}