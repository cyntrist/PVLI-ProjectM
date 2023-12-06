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
     * @param {*} dayData -
     * @param {*} x - 
     * @param {*} x - 
     * @param {*} x - 
     */
    constructor(scene, dayData){
        super(scene, 0, 0);
        // ** CREACION DE INTERFAZ ** //
		// crea la ventana de diálogo
	    scene.dialog = new DialogText(this, {
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


		// ** DIALOGO MOMENTO: ESTO DEBERÁ IR EN EL DIALOGUE MANAGER EN EL FUTURO ** //
		let i = 0;
		let node = dayData.root.next; // primer nodo
		let decision;
		scene.dialog.setText(title, true); // imprime la línea de título
		scene.dialog.graphics.on('pointerdown', function () { // cada click 
			decision?.destroy();
			let currentNode = dayData[node];
			let currentName = currentNode.name.toLowerCase();
			let currentCharacter = characters[currentName]; 
			currentCharacter?.onFocus(); //muy importante el interrogante 
			currentCharacter?.unfocusEveryoneElse(characters);
			if (currentNode.hasOwnProperty("next") || currentNode.hasOwnProperty("choices")) { // si es un nodo intermedio y/o tiene tiene elecciones
				if ( i < 1) 
					scene.dialog.setText(currentNode.name + ":\n" + currentNode.text.es, true);
				if (currentNode.hasOwnProperty("choices")) { 
					if (i >= 1) { // manera muy guarra de necesitar dos clics antes de que aparezca la decision
						decision = new Decision(scene, currentNode.choices, '9slice');
						i = 0;
						scene.dialog.setInteractable(false);
					} 
					else i++;
				}
				else node = currentNode.next; // si no hay decisiones, continuación lineal, el nodo actual pasa a ser el siguiente
			}
			else {
				scene.dialog.setText(currentNode.text.es); // se escribe el último msj
				camille.unfocusEveryone(characters);
			}
		})		

		this.eventEmitter.on('decided', function (valor) {
			console.log('OPCION DECIDIDA: ', valor);
			camille.focusEveryone(characters);
			scene.dialog?.setText("T/N:\n" + dayData[node].choices[valor].text.es, true);
			node = dayData[node].choices[valor].next;
			scene.dialog.setInteractable(true);
			decision.destroy();
		});
    }
}