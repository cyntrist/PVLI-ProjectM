import DialogText from "../plugins/dialog_plugin.js";
import Character from "../objects/character.js"
import Button from "../objects/button.js";
import Decision from "../objects/decision.js";


/**
 * Escena demo.
 * @extends Scene
 * @namespace Phaser.Actions
 */

export default class Demo extends Phaser.Scene
{ 
    constructor()
	{
		super({ key: 'Demo'})
		this.eventEmitter = new Phaser.Events.EventEmitter();
	}

	// Carga de assets
	preload() {
		this.canvas = this.sys.game.canvas;
		this.load.image('camilleph', './assets/images/personajes/camille.png');
		this.load.image('delilahph', './assets/images/personajes/delilah.png');
		this.load.image('matthewph', './assets/images/personajes/matthew.png');
		this.load.image('richardph', './assets/images/personajes/richard.png');
		this.load.image('clase', './assets/images/escenarios/clase2.png');
		this.load.image('pasillo', './assets/images/escenarios/pasillo.png');
		this.load.image('box', './assets/images/escenarios/opciones2.png')
		this.load.json('dia1Data', './src/json/dia1_test.json')
		this.load.image('9slice', './assets/images/ui/botones_decision_nineslice_muy_peque.png')
    }

	create()
    {
		// ** PARÁMETROS Y CONFIG INICIAL ** //
		const dayData = this.cache.json.get('dia1Data'); // XD la conversación del día
		const { width, height } = this.canvas; // la anchura y altura del canvas
		const scene = this // referencia a esta misma escena
		this.width = width; this.height = height;
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3";
		const Elenco = { Camille: 0, Delilah: 1, Matthew: 2, Richard: 3} // enum para que queden más bonitas las asignaciones pero vamos es una tonteria
		const padding = 40; // espacio respecto al origen
		const sprites = [ // array de sprites
			scene.add.sprite(0, padding, 'camilleph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'delilahph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'matthewph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'richardph').setScale(0.5,0.5)
		]

		// creación de personajes
		const camille = new Character(scene, width*1/5, height - sprites[Elenco.Camille].displayHeight/2, sprites[Elenco.Camille], "Camille");
		const delilah = new Character(scene, width*2/5, height - sprites[Elenco.Delilah].displayHeight/2, sprites[Elenco.Delilah], "Delilah");
		const matthew = new Character(scene, width*3/5, height - sprites[Elenco.Matthew].displayHeight/2, sprites[Elenco.Matthew], "Matthew");
		const richard = new Character(scene, width*4/5, height - sprites[Elenco.Richard].displayHeight/2, sprites[Elenco.Richard], "Richard");
		// array de los personajes, pensado para las iteraciones dentro de Character
		const characters = { camille, delilah, matthew, richard } // corchetes array, brackets diccionario (objeto)
		// descolorea a todos los personajes antes de empezar
		camille.unfocusEveryone(characters); // camille siendo conejillo de indias

		// pone el fondo
		this.nextBG = 1;
		this.currentBG = 1;
        let bg = scene.add.image(0, 0, "clase").setScale(0.35, 0.35).setOrigin(0, 0);
		bg.depth = -2;

		
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

		// crea un boton al pasillo
		let but1 = new Button(this, 590, 200, 'pasillo', 'box', { "ClickCallback": () => this.ChangeScenary ("pasillo", scene),
																	"EnterCallback": () =>this.OverButton(but1),
																	"ExitCallback": () => this.ExitButton(but1) });
		but1.depth = 2;

		// crea un boton a la clase
		let but2 = new Button(this, 590, 250, 'clase', 'box', { "ClickCallback": () => this.ChangeScenary ("clase", scene),
																	"EnterCallback": () =>this.OverButton(but2),
																	"ExitCallback": () => this.ExitButton(but2) });
		but2.depth = 2;

		// crea el botón del movil
		//Cuando se pueda crear una contructora sin el número del escenario al que cambia o quitarselo totalmente
		let movil = new Button(this, 850, 700, ' ', 'movil', { "ClickCallback": () => this.ChangeScene("movil", scene), 
																  "EnterCallback": () => this.OverMovile(),
																  "ExitCallback": () => this.ExitMovile() });
		movil.setScale(0.25, 0.25);
		movil.depth = 2;

		//Tween del movil cuando el ratón esté encima
		this.movilEnterTween = this.tweens.add({
			targets: movil,
			duration: 100,
			y: 650,
			persist: true
		})

		//Tween del movil cuando el ratón sale del botón
		this.movilExitTween = this.tweens.add({
			targets: movil,
			duration: 100,
			y: 700,
			persist: true
		})
	

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

	update(){
		if(this.nextBG === 1 &&  Scenary != 'clase') Scenary = 'clase';
		else if(this.nextBG === 2 && Scenary != 'pasillo') Scenary = 'pasillo';
		if(this.nextBG != this.currentBG){
			let bg = this.add.image(0, 0, Scenary).setScale(0.35, 0.35).setOrigin(0, 0);
			bg.depth = -2;
			this.currentBG = this.nextBG;
		}

	}
	
	// cambia el escenario (la imagen de fondo)
	ChangeScenary (newImage, escena){

		// crea una imagen en la escena dada 
		let bg = escena.add.image(0, 0, newImage).setScale(0.35, 0.35).setOrigin(0, 0);

		// ajusta la capa
		bg.depth = -2;

	}

	ChangeScene(newScene, escena){
		escena.scene.start(newScene);
	}

	OverMovile() {
		this.movilEnterTween.play();
	}

	ExitMovile() {
		this.movilExitTween.play();
	}

	OverButton(but) {
		but.box.tint = "0xc24d6d" ;
		
	}

	ExitButton(but) {
		but.box.tint = "0xF6F6F6" ;
	}

	
}