import DialogText from "../plugins/dialog_plugin.js";
import Character from "../objects/character.js"
import Button from "../objects/button.js";
import PlayerManager from "../managers/playerManger.js";
import DialogueManager from "../managers/dialogManager.js"

let Scenary = 'clase';
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
		this.load.image('movil', './assets/images/movil/movil.png');

		//this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/test_afinidad.json')
		this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/dia2_morning.json')
		this.load.image('9slice', './assets/images/ui/botones_decision_nineslice_muy_peque.png')
    }

	create()
    {
		let PM = new PlayerManager(0, 0, 0, 0);
		// ** PARÁMETROS Y CONFIG INICIAL ** //
		const dayData = this.cache.json.get('dia1Data'); // XD la conversación del día
		const { width, height } = this.canvas; // la anchura y altura del canvas
		const scene = this // referencia a esta misma escena
		this.width = width; this.height = height;
		const Elenco = { Camille: 0, Delilah: 1, Matthew: 2, Richard: 3} // enum para que queden más bonitas las asignaciones pero vamos es una tonteria
		const padding = 40; // espacio respecto al origen
		const sprites = [ // array de sprites
			scene.add.sprite(0, padding, 'camilleph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'delilahph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'matthewph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'richardph').setScale(0.5,0.5)
		]

		// creación de personajes
		const camille = new Character(scene, width*1/5, height - sprites[Elenco.Camille].displayHeight/2, sprites[Elenco.Camille], "Camille", 0);
		const delilah = new Character(scene, width*2/5, height - sprites[Elenco.Delilah].displayHeight/2, sprites[Elenco.Delilah], "Delilah", 1);
		const matthew = new Character(scene, width*3/5, height - sprites[Elenco.Matthew].displayHeight/2, sprites[Elenco.Matthew], "Matthew", 2);
		const richard = new Character(scene, width*4/5, height - sprites[Elenco.Richard].displayHeight/2, sprites[Elenco.Richard], "Richard", 3);
		// array de los personajes, pensado para las iteraciones dentro de Character
		const characters = { camille, delilah, matthew, richard } // corchetes array, brackets diccionario (objeto)
		// descolorea a todos los personajes antes de empezar
		camille.unfocusEveryone(characters); // camille siendo conejillo de indias

		// pone el fondo
        let bg = scene.add.image(0, 0, "clase").setScale(0.35, 0.35).setOrigin(0, 0);
		bg.depth = -2;

		
		// ** CREACION DE INTERFAZ ** //


		// crea un boton al pasillo
		let but1 = new Button(this, 590, 200, 'pasillo', 2, 'box', { "ClickCallback": () => this.ChangeScenary ("pasillo", scene),
																	"EnterCallback": () =>this.OverButton(but1),
																	"ExitCallback": () => this.ExitButton(but1) });
		but1.depth = 2;
		// crea un boton a la clase
		let but2 = new Button(this, 590, 250, 'clase', 2, 'box', { "ClickCallback": () => this.ChangeScenary ("clase", scene),
																	"EnterCallback": () =>this.OverButton(but2),
																	"ExitCallback": () => this.ExitButton(but2) });
		// crea el botón del movil
		let movil = new Button(this, 850, 700, ' ', 2, 'movil', { "ClickCallback": () => this.ChangeScene("movil", scene), 
																  "EnterCallback": () => this.OverMovile(),
																  "ExitCallback": () => this.ExitMovile() });
		movil.setScale(0.25, 0.25);

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
	
		// creacion del manager de dialogo
		let dialogManager = new DialogueManager(scene, PM, dayData, characters, '9slice');
    }

	update(){

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