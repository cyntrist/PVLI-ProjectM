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
		// Imágenes de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.image('clase', './assets/images/escenarios/clase_peque.png');
		this.load.image('pasillo', './assets/images/escenarios/pasillo_peque.png');
		// Imágenes de UI
		this.load.image('box', './assets/images/escenarios/opciones2.png')
		this.load.image('movil', './assets/images/movil/movil.png');
		this.load.image('9slice', './assets/images/ui/botones_decision_nineslice_muy_peque.png');
		// Imagenes de afinidad
		this.load.image('corazon', './assets/images/ui/feedback versiones grandes/feedback_corazon.png');
		this.load.image('affCamille', './assets/images/ui/feedback versiones grandes/feedback_flecha_camille.png');
		this.load.image('affDelilah', './assets/images/ui/feedback versiones grandes/feedback_flecha_delilah.png');
		this.load.image('affMatthew', './assets/images/ui/feedback versiones grandes/feedback_flecha_matthew.png');
		this.load.image('affRichard', './assets/images/ui/feedback versiones grandes/feedback_flecha_richard.png');

		// SOUNDS
		//this.load.audio('blip', [ './assets/sounds/blip.ogg', './assets/sounds/blip.mp3' ]);
		//this.load.audio('click', [ './assets/sounds/click.ogg', './assets/sounds/click.mp3' ]);
		this.load.audio('bonk', [ './assets/sounds/bonk.ogg', './assets/sounds/bonk.mp3' ]);
		// this.load.audio('clack1', [ './assets/sounds/clack1.ogg', './assets/sounds/clack1.mp3' ]);
		this.load.audio('clack2', [ './assets/sounds/clack2.ogg', './assets/sounds/clack2.mp3' ]);
		this.load.audio('clack3', [ './assets/sounds/clack3.ogg', './assets/sounds/clack3.mp3' ]);

		//musiquita de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.audio('base_music', ["/assets/sounds/right-place-loop-1/Right Place Loop 1.ogg"]);
		this.load.audio('main_music', ["/assets/sounds/dogs-and-cats/Dogs and Cats.mp3"]);
		this.load.audio('melon_music', ["./assets/sounds/a-short-story-loop-1/A Short Story loop 1.ogg"]);
		this.load.audio('movil_music', ["/assets/sounds/dogs-and-cats/Dogs and Cats.mp3"]);

		// DATA
		// Tests 
		//this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/dia1_midday.json')
		//this.load.json('dia1Data', './assets/dialogue editor/Dialog Files/test_afinidad.json')

		// Morning
		this.load.json('dia1mData', './assets/dialogue editor/Dialog Files/dia1_morning.json');
		this.load.json('dia2mData', './assets/dialogue editor/Dialog Files/dia2_morning.json');
		this.load.json('dia3mData', './assets/dialogue editor/Dialog Files/dia3_morning.json');
		this.load.json('dia4mData', './assets/dialogue editor/Dialog Files/dia4_morning.json');
		this.load.json('dia5mData', './assets/dialogue editor/Dialog Files/dia5_morning.json');

		// Midday
		this.load.json('dia1mdData', './assets/dialogue editor/Dialog Files/dia1_midday.json');
		this.load.json('dia2mdData', './assets/dialogue editor/Dialog Files/dia2_midday.json');
		this.load.json('dia3mdData', './assets/dialogue editor/Dialog Files/dia3_midday.json');
		this.load.json('dia4mdData', './assets/dialogue editor/Dialog Files/dia4_midday.json');
		this.load.json('dia5mdData', './assets/dialogue editor/Dialog Files/dia4_midday.json');

		// Confessions
		// this.load.json('confContext', './assets/dialogue editor/Dialog Files/dia1_midday.json');
		// this.load.json('confCamille', './assets/dialogue editor/Dialog Files/dia2_midday.json');
		// this.load.json('confDelilah', './assets/dialogue editor/Dialog Files/dia3_midday.json');
		// this.load.json('confMatthew', './assets/dialogue editor/Dialog Files/dia4_midday.json');
		// this.load.json('confRichard', './assets/dialogue editor/Dialog Files/dia4_midday.json');
    }

	create()
    {
		this.music  = this.sound.add("base_music", { loop: true });
		this.music.play();

		// ** PARÁMETROS Y CONFIG INICIAL ** //
		// Scripts segun periodo de día
		const day1mData = this.cache.json.get('dia1mData'); 
		const day1mdData = this.cache.json.get('dia1mdData'); 
		const day2mData = this.cache.json.get('dia2mData'); 
		const day2mdData = this.cache.json.get('dia2mdData'); 
		const day3mData = this.cache.json.get('dia3mData'); 
		const day3mdData = this.cache.json.get('dia3mdData'); 
		const day4mData = this.cache.json.get('dia4mData'); 
		const day4mdData = this.cache.json.get('dia4mdData'); 
		const day5mData = this.cache.json.get('dia5mData'); 
		const day5mdData = this.cache.json.get('dia5mdData'); 
		// const confession_context = this.cache.json.get('confContext'); 
		// const camille_confession = this.cache.json.get('confCamille'); 
		// const delilah_confession = this.cache.json.get('confDelilah'); 
		// const matthew_confession = this.cache.json.get('confMatthew'); 
		// const richard_confession = this.cache.json.get('confRichard'); 

		const dayDatas = { 
			day1mData, 
			day1mdData,
			day2mData, 
			day2mdData,
			day3mData,
			day3mdData, 
			day4mData,
			day4mdData,
			day5mData,
			day5mdData,
			//confession_context,
			//camille_confession,
			//delilah_confession,
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
		const camille = new Character(scene, width*1/5, height - sprites[0].displayHeight/2, sprites[0], "Camille");
		const delilah = new Character(scene, width*2/5, height - sprites[1].displayHeight/2, sprites[1], "Delilah");
		const matthew = new Character(scene, width*3/5, height - sprites[2].displayHeight/2, sprites[2], "Matthew");
		const richard = new Character(scene, width*4/5, height - sprites[3].displayHeight/2, sprites[3], "Richard");
		// DICCIONARIO (!IMPORTANTE!) de los personajes
		const characters = { camille, delilah, matthew, richard } // corchetes array, brackets diccionario (objeto)
		// descolorea a todos los personajes antes de empezar
		camille.unfocusEveryone(characters); // camille siendo conejillo de indias
		
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
	
		//Afinidades
		const images = [
			scene.add.image(1200, 100, "affCamille").setScale(0.25).setVisible(false),
			scene.add.image(1200, 100, "affDelilah").setScale(0.1).setVisible(false),
			scene.add.image(1200, 100, "affMatthew").setScale(0.1).setVisible(false),
			scene.add.image(1200, 100, "affRichard").setScale(0.1).setVisible(false)
		]

		//Tween de la afinidad
		this.affinityTween = this.tweens.add({
			targets: images[3],
			duration: 200,
			y: '-=20',
			yoyo: true,
			repeat: 2,
			persist: true
		})

		// ** MANAGERS WOOOOOOOOOOOOOOOOOOOOOOO (!)  ** //
		let playerManager = new PlayerManager(0, 0, 0, 0, 'corazon', 'affCamille', 'affDelilah', 'affMatthew', 'affRichard', 10 ,700, scene );
		let dialogManager = new DialogueManager(scene, playerManager, dayDatas, characters, '9slice', 'bonk');
    }

	update() { 
		if(!this.music.isPlaying) {
			this.music.play()
		}
	}
	
	ChangeMusic(musicName){
		this.music.pause();
		this.music  = this.sound.add(musicName, { loop: true });
		this.music.play();
	}


	// cambia el escenario (la imagen de fondo)
	ChangeScenary (bgName){
		// crea una imagen en la escena dada 
		let bg = this.add.image(0, 0, bgName).setScale(0.8, 0.8).setOrigin(0, 0);
		// ajusta la capa
		bg.depth = -2;
	}

	ChangeScene(newScene, escena){
		escena.scene.switch(newScene);
		this.music.pause();
	}

	Affinity(pj) {

		//pj es el string con el nombre del personaje al que le afecta la sub de afinidad
		//Lo que yo quiero hacer es acceder a las imagenes (declarado arriba estan las 4 flechas de colores) y hacer visible la que toca
		this.images[0].setVisible(true);

		//Se ejecuta el tween (Se aplica sobre todas las flechas pero solo se va a ver la que esté visible)
		this.affinityTween.play();

		//la idea ahora es desactivarlo de nuevo para que no se vea ninguna
		this.images[0].setVisible(false);
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