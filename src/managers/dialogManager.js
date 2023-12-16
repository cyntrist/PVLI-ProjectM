import DialogText from "../plugins/dialog_plugin.js";
import Character from "../objects/character.js"
import Decision from "../objects/decision.js";
import PlayerManager from "./playerManger.js";
/**
 * Clase que maneja la lógica de diálogo
 * @extends Container
 */
export default class DialogueManager extends Phaser.GameObjects.Container {
	/**
	 * @param {*} scene - 
	 * @param {*} playerManager - playerManager de la escena
	 * @param {*} dayData - json del dia
	 * @param {*} characters - objeto de objetos character
	 * @param {*} dialog - ventana de dialogo (asume que ya existe)
	 * @param {*} nineslice - key al sprite para el nineslice de los botones de las decisiones
	 * @param {*} sound - key al sonido para cada avance en el diálogo
	 */
	constructor(scene, playerManager, dayData, characters, nineslice, sound) {
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

		// sonido al pasar cada mensaje
		const blip = scene.sound.add(sound);

		// parámetros
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3";
		let i = 0; // para contar dos clicks antes de decidir, una guarra da pero son las 6 de la mañana bestie
		let node = dayData.root.next; // primer nodo
		let decision; // scope dentro del constructor, va a ser la decisión cuando la haya
		scene.dialog.setText(title, true); // imprime la línea de título

		// para interceptar comportamientos indeseados
		scene.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		scene.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		scene.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		if (Phaser.Input.Keyboard.JustDown(scene.spacebar) 
		 || Phaser.Input.Keyboard.JustDown(scene.up)
		 || Phaser.Input.Keyboard.JustDown(scene.down)) {}

		 // LOGICA DE VERDAD POR FIN VAMOSSSSSSSSSSSSSSS
		function forward() 
		{ // cada click evento
			if (scene.dialog?.getInteractable()) 	
			{
				let currentNode = dayData[node]; // para hacerlo más legible (sigue siendo infumable pero bueno)
				let currentName = currentNode.name.toLowerCase(); // idem
				let currentCharacter = characters[currentName];  // idem
				currentCharacter?.onFocus(); // si existe current character, lo enfoca
				currentCharacter?.unfocusEveryoneElse(characters); // y desenfoca al resto

				if (currentNode?.hasOwnProperty("next")
				 || currentNode?.hasOwnProperty("choices")
				 || currentNode?.hasOwnProperty("conditions")
				 || currentNode?.hasOwnProperty("signals")) 
				 { // si es un nodo intermedio y/o tiene tiene elecciones
					blip?.play();

					if (i < 1) {
						scene.dialog.setText(currentNode.name + ":\n" + currentNode.text.es, true);
					}

					if (currentNode.hasOwnProperty("signals")) {
						scene.eventEmitter?.emit(currentNode.signals.eventName.String, currentNode.signals[currentNode.signals.eventName.String].Number) //primer parametro es el nombre del evento y el segundo es el valor que se quiere (por como funciona el editor de nodos es lo que hay)
						/*"signals": {
							"parent": "1c73a86e-0677-495c-a560-63f69179dbfa",
							"eventName": {
								"String": "\"affinityUp\""	//este parametro indica el nombre del evento para poder acceder a el y al valor que se le quiere pasar
							},
							"affinityUp": {
								"Number": "1"		//este otro parametro es el valor que se quiere
							}
						}*/
					}

					if (currentNode.hasOwnProperty("choices")) {
						if (i >= 1) { // manera muy guarra de necesitar dos clics antes de que aparezca la decision
							decision = new Decision(scene, currentNode.choices, nineslice);
							i = 0;
							scene.dialog.setInteractable(false); // desactiva la interaccion del cuadro de diálog hasta que se escoga una opción en el evento decided de decisonButtono
						}
						else i++;
					}
					else if (currentNode.hasOwnProperty("conditions")) {
						let _conditions = currentNode.conditions //hacemos un array con todas las condiciones 
						let conditionCheck = false; //flag para solo comprobar una condicion
						let j = 0;
						//console.log(j < _conditions.length && !conditionCheck)
						while (j < _conditions.length && !conditionCheck) {
							if (CheckConditions(_conditions[j], playerManager)) { //si se cumple la condicion entonces hacemos que el siguiente nodo sea el que esta indica
								node = _conditions[j].next;
								conditionCheck = true;
							}
							j++; //si no se cuumple avanzamos a la siguiente condicion
						}
					}
					else node = currentNode?.next; // si no hay decisiones, continuación lineal, el nodo actual pasa a ser el siguiente
				}
				else {
					scene.dialog.setText(currentNode.text.es); // se escribe el último msj
					//characters["camille"].unfocusEveryone(characters); // se desenfoca a todo el mundo para acabar, camille como conejillo de indias porque sí
				}
			} 
		};

		function backward() {
			console.log("Estoy echando para atraaaaaaaaaaaaaas chuuuuchuu");
		}

		function callback() {
			if (scene.input.activePointer.rightButtonDown()) {
				backward();
			}
			else {
				forward();
			}
		}
		scene.input.mouse.disableContextMenu();
		scene.input.keyboard.on('keydown-SPACE', forward); // barra espaciadora
		scene.input.keyboard.on('keydown-UP', backward); // flecha arriba
		scene.dialog.graphics.on('pointerdown', callback); // click en el cuadro de diálogo, independiente de cual sea

		/**
		 * Receptor del evento decided, que viene de decisionButton.
		 * Cuando una opcion es escogida, actualiza el nodo en corcondancia
		 */
		scene.eventEmitter.on('decided', function (valor) {
			blip?.play();
			console.log('OPCION DECIDIDA: ', valor);
			characters["camille"]?.focusEveryone(characters); // se enfoca a todo el mundo al hablar, camille como conejillo de indias porque sí
			scene.dialog?.setText("T/N:\n" + dayData[node].choices[valor].text.es, true); // escribe lo escogido
			node = dayData[node].choices[valor].next; // pasa al siguiente nodo
			scene.dialog?.setInteractable(true); // devuelve la interaccion al cuadro de diálogo
			decision?.destroy(); // destruye la decison
		});

		/**
		 * Receptor del evento affinityUp, que viene de esta misma clase.
		 * Cuando se recoge una señal de este tipo, sube la afinidad del personaje indicado
		 */
		scene.eventEmitter.on('affinityUp', function (valor) {
			if (valor >= 0 && valor <= 3) //0 camille, 1 delilah, 2 matthew, 3 richard, cualquier valor que no sea de esos no suma (no entra en el caso, no porque haya proteccion contra eso en el player manager, no es un caso que vaya a ocurrir pero nunca se sabe)
				playerManager?.increaseAffinity(valor);
		});
	}
}

function CheckConditions(condicion, playerManager) { 
	let affVal = playerManager.affinities[condicion.charNum.value]; //afinidad del personaje a mirar, charNum es un parametro del nodo de condicion pero que no se evalua, solo es para guardar informacion
	if (condicion.affValue.operator == "lower") //dependiendo del operador de la condicion se comprueba una cosa u otra
		return affVal < condicion.affValue.value; //el value es el valor con el que se quiere comparar la afinidad actual
	else if (condicion.affValue.operator == "equal")
		return affVal == condicion.affValue.value;
	else
		return affVal > condicion.affValue.value;
}