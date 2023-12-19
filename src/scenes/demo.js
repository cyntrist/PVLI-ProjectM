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

		// IMAGENES
		// Imágenes de los personajes
		this.load.image('camilleph', './assets/images/personajes/camille.png');
		this.load.image('delilahph', './assets/images/personajes/delilah.png');
		this.load.image('matthewph', './assets/images/personajes/matthew.png');
		this.load.image('richardph', './assets/images/personajes/richard.png');
		// Imágenes de fondo
		this.load.image('clase', './assets/images/escenarios/clase_peque.png');
		this.load.image('pasillo', './assets/images/escenarios/pasillo_peque.png');
		// Imágenes de UI
		this.load.image('box', './assets/images/escenarios/opciones2.png')
		this.load.image('movil', './assets/images/movil/movil.png');
		this.load.image('9slice', './assets/images/ui/botones_decision_nineslice_muy_peque.png');

		// SOUNDS
		//this.load.audio('blip', [ './assets/sounds/blip.ogg', './assets/sounds/blip.mp3' ]);
		//this.load.audio('click', [ './assets/sounds/click.ogg', './assets/sounds/click.mp3' ]);
		this.load.audio('bonk', [ './assets/sounds/bonk.ogg', './assets/sounds/bonk.mp3' ]);
		// this.load.audio('clack1', [ './assets/sounds/clack1.ogg', './assets/sounds/clack1.mp3' ]);
		this.load.audio('clack2', [ './assets/sounds/clack2.ogg', './assets/sounds/clack2.mp3' ]);
		this.load.audio('clack3', [ './assets/sounds/clack3.ogg', './assets/sounds/clack3.mp3' ]);

		// DATA
		// Tests
		//this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/dia1_midday.json')
		//this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/test_afinidad.json')

		// Morning
		this.load.json('day1_morning_data', './assets/dialogue editor/Dialog Files/dia1_morning.json');
		this.load.json('day2_morning_data', './assets/dialogue editor/Dialog Files/dia2_morning.json');
		this.load.json('day3_morning_data', './assets/dialogue editor/Dialog Files/dia3_morning.json');
		this.load.json('day4_morning_data', './assets/dialogue editor/Dialog Files/dia4_morning.json');
		this.load.json('day5_morning_data', './assets/dialogue editor/Dialog Files/dia5_morning.json');

		// Midday
		this.load.json('day1_midday_data', './assets/dialogue editor/Dialog Files/dia1_midday.json');
		this.load.json('day2_midday_data', './assets/dialogue editor/Dialog Files/dia2_midday.json');
		this.load.json('day3_midday_data', './assets/dialogue editor/Dialog Files/dia3_midday.json');
		this.load.json('day4_midday_data', './assets/dialogue editor/Dialog Files/dia4_midday.json');
		this.load.json('day5_midday_data', './assets/dialogue editor/Dialog Files/dia4_midday.json');

		// Confessions
		this.load.json('confContext', './assets/dialogue editor/Dialog Files/confession_context.json');
		this.load.json('cannon_ending', './assets/dialogue editor/Dialog Files/cannon_ending.json');
		this.load.json('confCamille', './assets/dialogue editor/Dialog Files/camille_confession.json');
		this.load.json('confDelilah', './assets/dialogue editor/Dialog Files/delilah_confession.json');
		// this.load.json('confMatthew', './assets/dialogue editor/Dialog Files/matthew_confession.json');
		// this.load.json('confRichard', './assets/dialogue editor/Dialog Files/richard_confession.json');
    }

	create()
    {
		// ** PARÁMETROS Y CONFIG INICIAL ** //
		// Scripts segun periodo de día
		const day1_morning_data = this.cache.json.get('day1_morning_data'); 
		const day1_midday_data = this.cache.json.get('day1_midday_data'); 
		const day2_morning_data = this.cache.json.get('day2_morning_data'); 
		const day2_midday_data = this.cache.json.get('day2_midday_data'); 
		const day3_morning_data = this.cache.json.get('day3_morning_data'); 
		const day3_midday_data = this.cache.json.get('day3_midday_data'); 
		const day4_morning_data = this.cache.json.get('day4_morning_data'); 
		const day4_midday_data = this.cache.json.get('day4_midday_data'); 
		const day5_morning_data = this.cache.json.get('day5_morning_data'); 
		const day5_midday_data = this.cache.json.get('day5_midday_data'); 
		const confession_context = this.cache.json.get('confContext'); 
		const cannon_ending = this.cache.json.get('cannon_ending'); 
		const camille_confession = this.cache.json.get('confCamille'); 
		const delilah_confession = this.cache.json.get('confDelilah'); 
		// const matthew_confession = this.cache.json.get('confMatthew'); 
		// const richard_confession = this.cache.json.get('confRichard'); 

		const dayDatas = { 
			day1_morning_data, 
			day1_midday_data,
			day2_morning_data, 
			day2_midday_data,
			day3_morning_data,
			day3_midday_data, 
			day4_morning_data,
			day4_midday_data,
			day5_morning_data,
			day5_midday_data,
			confession_context,
			cannon_ending,
			camille_confession,
			delilah_confession,
			//matthew_confession,
			//richard_confession
		}; // !!!!!!!!!IMPORTANTE!! añadir aquí el resto de jsons que se generen 
		
		// Parámetros de la escena
		const { width, height } = this.canvas; // la anchura y altura del canvas
		const scene = this // referencia a esta misma escena
		this.width = width; this.height = height;
		const padding = 40; // espacio respecto al origen

		// Parámetros de los personajes
		const sprites = [ // array de sprites
			scene.add.sprite(0, padding, 'camilleph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'delilahph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'matthewph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'richardph').setScale(0.5,0.5)
		]
		// Creación de personajes
		const camille = new Character(scene, width*1/5, height - sprites[0].displayHeight/2, sprites[0], "Camille", 1);
		const delilah = new Character(scene, width*2/5, height - sprites[1].displayHeight/2, sprites[1], "Delilah", 2);
		const matthew = new Character(scene, width*3/5, height - sprites[2].displayHeight/2, sprites[2], "Matthew", 3);
		const richard = new Character(scene, width*4/5, height - sprites[3].displayHeight/2, sprites[3], "Richard", 4);
		// DICCIONARIO (!IMPORTANTE!) de los personajes
		const characters = { camille, delilah, matthew, richard } // corchetes array, brackets diccionario (objeto)
		// descolorea a todos los personajes antes de empezar
		Character.unfocusEveryone(characters); // camille siendo conejillo de indias
		// ** CREACION DE INTERFAZ ** //
		// pone el fondo
		this.nextBG = 1;
		this.currentBG = 1;
		let bg = scene.add.image(0, 0, "clase").setScale(0.8, 0.8).setOrigin(0, 0);
		bg.depth = -2;

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

		// ** MANAGERS WOOOOOOOOOOOOOOOOOOOOOOO (!)  ** //
		let playerManager = new PlayerManager(0, 0, 0, 0);
		let dialogManager = new DialogueManager(scene, playerManager, dayDatas, characters, '9slice', 'bonk');
	}

	/*update() { 
		if(this.nextBG === 1 &&  Scenary != 'clase') Scenary = 'clase';
		else if(this.nextBG === 2 && Scenary != 'pasillo') Scenary = 'pasillo';
		if(this.nextBG != this.currentBG){
			let bg = this.add.image(0, 0, Scenary).setScale(0.35, 0.35).setOrigin(0, 0);
			bg.depth = -2;
			this.currentBG = this.nextBG;
		}
	}*/
	
	// cambia el escenario (la imagen de fondo)
	ChangeScenary (bgName){
		// crea una imagen en la escena dada 
		let bg = this.add.image(0, 0, bgName).setScale(0.35, 0.35).setOrigin(0, 0);
		// ajusta la capa
		bg.depth = -2;
	}

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);
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