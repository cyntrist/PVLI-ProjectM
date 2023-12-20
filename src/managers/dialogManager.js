import DialogText from "../plugins/dialog_plugin.js";
import Decision from "../objects/decision.js";
import Character from "../objects/character.js"
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
	constructor(scene, playerManager, dayDatas, characters, nineslice, sound) {
		super(scene, 0, 0);

		////////////////////////////////////////////////////////
		////////        PARÁMETROS IMPORTANTES         /////////
		////////////////////////////////////////////////////////

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

		// importante, todos los jsons parseados a un diccionario que contiene cada periodo de cada dia
		let dayData = dayDatas["dia1mData"]; // predeterminado
		let i = 0; // contador del periodo del día
		setDayData(i); // dia inicial, sea cual sea, en el diccionario
		
		// parámetros
		const blip = scene.sound.add(sound, { volume: 1 }); // sonido de diálogo
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3"; // primera línea de título (sí, es justo lo que estás pensando, tiene todos esos espacios para que esté centrada (lo siento mucho))
		let clicks = 0; // para contar dos clicks antes de decidir, una guarra da pero son las 6 de la mañana bestie
		let node = dayData.root.next; // primer nodo
		let decision; // scope dentro del constructor, va a ser la decisión cuando la haya
		scene.dialog.setText(title, false); // imprime la línea de título
		disableBehaviours();
		Character.onExitEveryone(characters);


		////////////////////////////////////////////////////////
		/////////////   FUNCIONES Y CALLBACKS   ////////////////
		////////////////////////////////////////////////////////

		 // !!! LOGICA DE VERDAD POR FIN VAMOSSSSSSSSSSSSSSS !!!
		// Controles:
		/** 
		 *  Barra espaciadora y click izquierdo avanzan el diálogo
		 *  Flecha hacia arriba y click derecho retroceden el diálogo hasta donde sea posible
		 */
		scene.input.keyboard.on('keydown-SPACE', forward); // barra espaciadora
		scene.input.keyboard.on('keydown-UP', backward); // flecha arriba
		scene.dialog.graphics.on('pointerdown', callback); // click en el cuadro de diálogo, independiente de cual sea

		/**
		 * Método para cambiar de JSON del que se están leyendo los nodos dentro  de un diccionario de los datos diarios.
		 * @param {*} index - índice del perido de día a cargar en el diccionario de días
		 */
		function setDayData(index) {
			let dayIndex = index; 
			let key = Object.keys(dayDatas)[dayIndex];
			dayData = dayDatas[key];
		}

		/** 
		  * callback que avanza el diálogo si y solo si el diálogo es interactuable
		  */
		function forward() 
		{ 
			// si el diálogo es interactuable y node existe
			if (scene.dialog?.getInteractable() && node != undefined) 	
			{ 
				// nodo actual, el personaje que habla y su nombre
				let currentNode = dayData[node]; // para hacerlo más legible (sigue siendo infumable pero bueno)
				let currentName = currentNode.name.toLowerCase(); // idem
				let currentCharacter = characters[currentName];  // idem

				// enfoque de personajes
				currentCharacter?.onFocus(); // si existe current character, lo enfoca
				currentCharacter?.unfocusEveryoneElse(characters); // y desenfoca al resto

				// si es un nodo intermedio y/o tiene tiene elecciones
				if (currentNode?.hasOwnProperty("next")
				 || currentNode?.hasOwnProperty("choices")
				 || currentNode?.hasOwnProperty("conditions")
				 || currentNode?.hasOwnProperty("signals")) 
				 { 
					// reproduce sonido con cada avance de diálogo
					blip?.play();

					// si solo ha habido un click, escribe el mensaje
					if (clicks < 1) 
						speak(currentNode);

					// si el nodo ha de emitir un evento, lo emite
					///////////     EVENTO      ////////////
					if (currentNode.hasOwnProperty("signals")) 
					{
						let currentEvent = currentNode?.signals?.eventName?.String;
						let currentValue = currentNode?.signals[currentEvent]?.String?.toLowerCase();
						console.log("EVENTOOOOO: " + currentEvent);
						console.log("VALOOOOOOR DEL EVENTOOOOOOO: " + currentValue);
						if (currentEvent == undefined) {
							console.log(currentNode);
							console.log(currentNode.signals);
						}
						scene.eventEmitter?.emit(currentEvent, currentValue); 
						//primer parametro es el nombre del evento y el segundo es el valor que se quiere (por como funciona el editor de nodos es lo que hay)
						/* 
						!!! FORMATO EN JSON !!!
						"signals": {
							"parent": "1c73a86e-0677-495c-a560-63f69179dbfa",
							"eventName": {
								"String": "\"affinityUp\""	//este parametro indica el nombre del evento para poder acceder a el y al valor que se le quiere pasar
							},
							"affinityUp": {
								"String": "camille"		//este otro parametro es el valor que se quiere
							}
						}
						*/
					}

					// si el nodo lleva a una decisión
					//////////     DECISION     ///////////
					if (currentNode.hasOwnProperty("choices")) {
						if (clicks >= 1) { // manera muy guarra de necesitar dos clics antes de que aparezca la decision
							decision = new Decision(scene, currentNode.choices, nineslice); // genera una nueva decisión
							clicks = 0; // resetea el contador de clicks
							scene.dialog.setInteractable(false); // desactiva la interaccion del cuadro de diálog hasta que se escoga una opción en el evento decided de decisonButtono
						}
						else clicks++;
					}

					// si el nodo contiene una condición
					//////////     CONDICION     //////////
					else if (currentNode.hasOwnProperty("conditions")) { // else porque por definicion no puede haber nodos con tanto decisiones como condiciones a la vez
						let _conditions = currentNode.conditions //hacemos un array con todas las condiciones 
						let conditionCheck = false; //flag para solo comprobar una condicion
						let i = 0; // contador de condición
						while (i < _conditions.length && !conditionCheck) {
							if (CheckConditions(_conditions[i], playerManager)) { //si se cumple la condicion entonces hacemos que el siguiente nodo sea el que esta indica
								node = _conditions[i].next;
								conditionCheck = true;
							}
							i++; //si no se cuumple avanzamos a la siguiente condicion
						}
					}

					// si no se cumple ninguna de las condiciones anteriores es simplemente continuacion lineal, tiene next
					//////////      NEXT     //////////
					else 
						node = currentNode?.next;
				}

				// si lo anterior no se cumple, significa que es el nodo final
				else {
					speak(currentNode);
					setDayData(++i);
					node = dayData.root.next;
					//Character.unfocusEveryone(characters); // se desenfoca a todo el mundo para acabar
				}
			} 
		};

		/**
		 * callback que retrocede en el diálogo hasta que se encuentre un nodo especial (con check, señal o decision)
		 * ESTÁ TAAAAN MAL HECHO PERO QUEDAN COMO 5 DÍAS Y HAY QUE TENER COMO 10 FUNCIONALIDADES MÁS POR FAVOR TEN PIEDAD 
		 */ 
		function backward() {
			if (scene.dialog?.getInteractable() // si el diálogo es interactuable
			 && node != undefined // si nodo existe
			 && !dayData[node]?.hasOwnProperty("signals") 	// si no estás justo en una señal
			 && !dayData[node]?.hasOwnProperty("conditions")// si no estás justo en una comprobación
			 && !dayData[node]?.hasOwnProperty("choices")) 	// si no estás justo antes de una decisión
			{ 
				// tiene que retroceder dos veces porque con cada click el nodo se deja en el siguiente para escribirlo lo primero... venga, va... no me mires asi...
				// referencia al nodo real (solo el ID)
				let real = dayData[node].parent;
				// referencia al nodo padre (solo el ID)
				let padre;
				// nodo padre (el objeto entero)
				let prevNode;
				// si tiene padre siquiera
				if (dayData[real]?.hasOwnProperty("parent")) { // me he fumao un petardacoooo con cada linea de codigo de este método del demonioooooooooooooOOOOooOoo
					padre = dayData[real].parent; // le asigna su referencia y su nodo
					prevNode = dayData[padre];
				}
				
				if (padre != undefined // si la referencia al padre existe
				&& padre != "root" // y no es la raiz (no estás el primer nodo)
				&& prevNode != undefined // si el padre existe
				&& !prevNode.hasOwnProperty("choices") // si no vas a volver a una decision
				&& !prevNode.hasOwnProperty("conditions") // ni a una condicion
				&& !prevNode.hasOwnProperty("signals")) {  // ni a una señal
					node = dayData[node].parent; // vuelve atrás
					speak(prevNode); // blablabla
				}
			}
		}

		/**
		 * callback para gestionar si el click es izquierdo o derecho
		 */
		function callback() {
			if (scene.input.activePointer.rightButtonDown()) { // click derecho
				backward(); // hacia atras
			}
			else { // si no es el click derecho sera el izquierdo XD o si no el medio pero nos da un poco igual tbh 
				forward();
			}
		}

		// escribir el texto en el cuadro de dialogo :-)
		function speak(currentNode) {
			let name = currentNode.name;
			const names = Object.values(characters).map(character => character.nombre);
			let valid = names.includes(name);
			let caracter = currentNode.text.es[0];
			if (name == undefined || !valid) // si el nombre del nodo es undefined, habla y/n
			{
				name = "Y/N";
				if (
					//caracter === '*' || 
					caracter === '(') {
					Character.unfocusEveryone(characters); 
				}
				else {
					Character.focusEveryone(characters); 
				}
			}
			scene.dialog?.setText(name + ":\n" + currentNode.text.es, true); // se escribe el último msj
		 }

		/** 
		 * para interceptar comportamientos indeseados 
		*/ 
		function disableBehaviours() {
			scene.input.mouse.disableContextMenu(); 
			scene.cursor = scene.input.keyboard.createCursorKeys();
			// no queremos menú de contexto en nuestro canvas, lo sentimos pero no está invitado a esta fiesta
			/*scene.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // su fiesta le espera arriba (mentira, tampoco queremos que el espacio o las flechas hagan scroll)
			scene.up = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP); // lo mismo pero para las flechas
			scene.down = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN); // lo mismo pero para las flechas
			if (Phaser.Input.Keyboard.JustDown(scene.spacebar) 
				|| Phaser.Input.Keyboard.JustDown(scene.up)
				|| Phaser.Input.Keyboard.JustDown(scene.down)) {}		*/
		}





		///////////////////////////////////////////
		/////////      LISTENERS !!!     //////////
		///////////////////////////////////////////
		// con sus callbacks
		
		/// BLOQUE DE ESCUCHA PARA ENTRADA Y SALIDA DE PERSONAJES
		// OJO: El FORMATO para lanzar un evento desde el programa de los JSON sería tal que:
		// EMIT eventName STRING characterEnter
		// EMIT characterEnter STRING camille
		// -------------
		// Nombre del evento: 'characterEnter'
		// Personaje: 'camille'
		// Ambos strings, excepto con los de everyoneExit/Enter, que no necesitan personajes
		scene.eventEmitter.on('characterEnter', function(character) {
			let name = character.toLowerCase();
			characters[name].onEnter(characters);
		}) 

		scene.eventEmitter.on('characterExit', function(character) {
			let name = character.toLowerCase();
			characters[name].onExit(characters);
		})
		
		scene.eventEmitter.on('everyoneEnter', function() {
			Character.onEnterEveryone(characters);
		}) 

		scene.eventEmitter.on('everyoneExit', function() {
			Character.onExitEveryone(characters);
		})

		/**
		 * Receptor del evento decided, que viene de decisionButton.
		 * Cuando una opcion es escogida, actualiza el nodo en corcondancia
		 */
		scene.eventEmitter.on('decided', function (valor) {
			blip?.play(); // si el sonido existe lo reproduce
			let decidida = dayData[node].choices[valor]
			Character.focusEveryone(characters); // se enfoca a todo el mundo al hablar
			speak(decidida);
			node = decidida.next; // pasa al siguiente nodo
			scene.dialog?.setInteractable(true); // devuelve la interaccion al cuadro de diálogo
			decision?.destroy(); // destruye la decison
		});

		/**
		 * Receptor del evento affinityUp, que viene de esta misma clase.
		 * Cuando se recoge una señal de este tipo, sube la afinidad del personaje indicado
		 */
		scene.eventEmitter.on('affinityUp', function (valor) {
			playerManager?.increaseAffinity(valor);

			//Colocamos el fedback de afinidad
			scene.affinity(valor);
		});

		scene.eventEmitter.on('changeBg', function (valor) {
			scene.ChangeScenary(valor);
		});

		scene.eventEmitter.on('changeMusic', function(valor){
			scene.ChangeMusic(valor);
		});
	}
}





function CheckConditions(condicion, playerManager) { 
	let charName
	switch(condicion.charNum.value) //por desgracia los nodos de condiciones no dejan tener como parametro una string asi que se utiliza la codificacion de los personajes usada anteriormente
	{
		case 0: charName = "camille"; break;
		case 1: charName = "delilah"; break;
		case 2: charName = "matthew"; break;
		case 3: charName = "richard"; break;
	}
	//console.log(charName);
	let affVal = playerManager.affinities[charName].points; //afinidad del personaje a mirar
	//console.log(affVal);
	if (condicion.affValue.operator == "lower") //dependiendo del operador de la condicion se comprueba una cosa u otra
		return affVal < condicion.affValue.value; //el value es el valor con el que se quiere comparar la afinidad actual
	else if (condicion.affValue.operator == "equal")
		return affVal == condicion.affValue.value;
	else
		return affVal > condicion.affValue.value;
}