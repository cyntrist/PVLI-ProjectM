import DialogText from "../plugins/dialog_plugin.js";
import Character from "../objects/character.js"
import Button from "../objects/button.js";
import Decision from "../objects/decision.js";

// int o numero para marcar el escenario
	// 0 -> clase
	// 1 -> pasillo
	const scenaries = ["clase", "pasillo"];//['clase', 'pasillo'];
	let Scenary = 'clase';

/**
 * Escena demo.
 * @extends Scene
 */
export default class Demo extends Phaser.Scene
{ 
    constructor()
	{
		super({ key: 'Demo'})
	}

    // Carga de assets
	preload() 
	{
		this.canvas = this.sys.game.canvas;
		this.load.image('camilleph', './assets/images/personajes/camille.png');
		this.load.image('delilahph', './assets/images/personajes/delilah.png');
		this.load.image('matthewph', './assets/images/personajes/matthew.png');
		this.load.image('richardph', './assets/images/personajes/richard.png');
		this.load.image('clase', './assets/images/escenarios/clase2.png');
		this.load.image('pasillo', './assets/images/escenarios/pasillo.png');
		this.load.image('box', './assets/images/escenarios/opciones2.png')
		this.load.json('dia1Data', './src/json/dia1_test.json')
		this.load.image('decisionslice', './assets/images/ui/botones_decision_nineslice.png')
    }

	create()
    {
		// ** PARÁMETROS Y CONFIG INICIAL ** //
		const dayData = this.cache.json.get('dia1Data'); // XD la conversación del día
		const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this // referencia a esta misma escena
		let title = "\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3"; // línea de título, array que va a llevar todo el title del juego
		const Elenco = { Camille: 0, Delilah: 1, Matthew: 2, Richard: 3} // enum para que queden más bonitas las asignaciones pero vamos es una tonteria
		const padding = 40; // espacio respecto al origen, pensado para los sprites placeholder
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
		// colorea a todos los personajes antes de empezar
		camille.unfocusEveryone(characters); // camille siendo conejillo de indias
		// pone el fondo
		this.nextBG = 1;
		this.currentBG = 1;
        let bg = scene.add.image(0, 0, Scenary).setScale(0.35, 0.35).setOrigin(0, 0);
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
		let but1 = new Button(this, 590, 200, 'pasillo', 'box', 2);
		but1.depth = 2;
		// crea un boton a la clase
		let but2 = new Button(this, 590, 250, 'clase', 'box', 1);
		but2.depth = 2;



		// ** CREACION DE DIALOGO MOMENTO: ** //
		let node = dayData.root.next; // primer nodo
		// ** INPUT MOMENTO ** //
		let i = 0; // calienta que sales
		scene.dialog.setText(title, true); // imprime la línea de título
		scene.input.on('pointerdown', function () { // cada click 
			let currentNode = dayData[node];
			let currentName = currentNode.name.toLowerCase();
			let currentCharacter = characters[currentName]; 
			currentCharacter?.onFocus(); //muy importante el interrogante 
			currentCharacter?.unfocusEveryoneElse(characters);
			if (currentNode.hasOwnProperty("next") || currentNode.hasOwnProperty("choices")) { // si es un nodo intermedio y/o tiene tiene elecciones
				scene.dialog.setText(currentNode.name + ":\n" + currentNode.text.es, true);
				if (dayData[node].hasOwnProperty("choices")) { 
					let option = new Decision(scene, currentNode.choices, 'decisionSlice');
					//node = dayData[node].choices[ultimaOpcion].next; // el nodo actual pasa a ser el último de las opciones
					//node = currentNode.choices[option].next;
				}
				else node = currentNode.next; // si no hay decisiones, continuación lineal, el nodo actual pasa a ser el siguiente
			}
			else scene.dialog.setText(dayData[node].text.es); // se escribe el último msj
		})		
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
}