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
		const { width, height } = this.canvas; // la anchura y altura del canvas

		////////////////////////////////
		////////    PRELOADER     //////
		////////////////////////////////
		// segmento sacado de:
		// https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
		// gracias a toni <3
		//progressbar
		let progressBar = this.add.graphics();
		let progressBox = this.add.graphics();
		let bar_width = width/2;
		let bar_height = 70;
		let bar_x = (width - bar_width)/2;
		let bar_y = (height - bar_height)/2;
		let size_diff = 10;
		progressBox.fillStyle(0x73c29b, 0.8);
		progressBox.fillRect(bar_x, bar_y, bar_width, bar_height);

		//loading text
		let loadingText = this.make.text({
			x: width / 2,
			y: bar_y + 150,
			text: 'Loading...',
			style: {
				font: '24px monospace',
				fill: '#FFFFFF'
			}
		});
		loadingText.setOrigin(0.5, 0.5);

		// percent text
		let percentText = this.make.text({
			x: width / 2,
			y: bar_y + 200,
			text: '0%',
			style: {
				font: 'bold 24px monospace',
				fill: '#FF799A'
			}
		});
		percentText.setOrigin(0.5, 0.5);

		// asset text
		let assetText = this.make.text({
			x: width / 2,
			y: height - 60,
			text: 'Asset:',
			style: {
				font: '18px monospace',
				fill: '#FFFFFF'
			}
		});
		assetText.setOrigin(0.5, 0.5);
		 
		// listeners
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(bar_x + size_diff, bar_y + size_diff, (bar_width - size_diff * 2) * value, bar_height - size_diff* 2);
		});
					
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});

		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
		});

		////////////////////////////////
		/////////   IMAGENES   /////////
		////////////////////////////////
		// Imágenes de los personajes
		this.load.image('camilleph', './assets/images/personajes/Camille_sprite.png');
		this.load.image('delilahph', './assets/images/personajes/Delilah_sprite.png');
		this.load.image('matthewph', './assets/images/personajes/Matthew_sprite.png');
		this.load.image('richardph', './assets/images/personajes/Richard_sprite.png');
		// Imágenes de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.image('clase', './assets/images/escenarios/clase_peque.png');
		this.load.image('pasillo', './assets/images/escenarios/pasillo_peque.png');
		this.load.image('fondo_negro', './assets/images/escenarios/fondo_negro.jpg');
		// Imágenes de UI
		this.load.image('box', './assets/images/escenarios/opciones2.png')
		this.load.image('movil', './assets/images/movil/movil.png');
		this.load.image('9slice', './assets/images/ui/botones_decision_nineslice_muy_peque.png');
		// Imagenes de afinidad
		this.load.image('corazon', './assets/images/ui/feedback_corazon.png');
		this.load.image('affCamille', './assets/images/ui/feedback_flecha_camille.png');
		this.load.image('affDelilah', './assets/images/ui/feedback_flecha_delilah.png');
		this.load.image('affMatthew', './assets/images/ui/feedback_flecha_matthew.png');
		this.load.image('affRichard', './assets/images/ui/feedback_flecha_richard.png');

		////////////////////////////////
		////////     SOUNDS     ////////
		////////////////////////////////
		//this.load.audio('blip', [ './assets/sounds/blip.ogg', './assets/sounds/blip.mp3' ]);
		//this.load.audio('click', [ './assets/sounds/click.ogg', './assets/sounds/click.mp3' ]);
		this.load.audio('bonk', [ './assets/sounds/bonk.ogg', './assets/sounds/bonk.mp3' ]);
		// this.load.audio('clack1', [ './assets/sounds/clack1.ogg', './assets/sounds/clack1.mp3' ]);
		this.load.audio('clack2', [ './assets/sounds/clack2.ogg', './assets/sounds/clack2.mp3' ]);
		this.load.audio('clack3', [ './assets/sounds/clack3.ogg', './assets/sounds/clack3.mp3' ]);

		//musiquita de fondo (IMPORTANTE! todo en minusculas y si hay varias palabras separar con guion bajo (esto ultimo no importa, solo es para que quede mas bonito))
		this.load.audio('base_music', ["/assets/sounds/musicas de fondo/right-place-loop-1/Right Place Loop 1.ogg"]);
		this.load.audio('main_music', ["/assets/sounds/musicas de fondo/dogs-and-cats/Dogs and Cats.mp3"]);
		this.load.audio('melon_music', ["./assets/sounds/musicas de fondo/a-short-story-loop-1/A Short Story loop 1.ogg"]);
		this.load.audio('movil_music', ["/assets/sounds/musicas de fondo/dogs-and-cats/Dogs and Cats.mp3"]);

		////////////////////////////////
		////////     DATA      /////////
		////////////////////////////////
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
		this.load.json('confMatthew', './assets/dialogue editor/Dialog Files/matthew_confession.json');
		this.load.json('confRichard', './assets/dialogue editor/Dialog Files/richard_confession.json');
    }

	create()
    {
		this.music  = this.sound.add("base_music", { loop: true, volume: 0.5 });
		this.music.play();

		// ** PARÁMETROS Y CONFIG INICIAL ** //
		// Scripts segun periodo de día
		const day1_morning_data	 = this.cache.json.get('day1_morning_data'); 
		const day1_midday_data	 = this.cache.json.get('day1_midday_data'); 
		const day2_morning_data	 = this.cache.json.get('day2_morning_data'); 
		const day2_midday_data	 = this.cache.json.get('day2_midday_data'); 
		const day3_morning_data	 = this.cache.json.get('day3_morning_data'); 
		const day3_midday_data	 = this.cache.json.get('day3_midday_data'); 
		const day4_morning_data	 = this.cache.json.get('day4_morning_data'); 
		const day4_midday_data	 = this.cache.json.get('day4_midday_data'); 
		const day5_morning_data	 = this.cache.json.get('day5_morning_data'); 
		const day5_midday_data	 = this.cache.json.get('day5_midday_data'); 
		const confession_context = this.cache.json.get('confContext'); 
		const camille_confession = this.cache.json.get('confCamille'); 
		const delilah_confession = this.cache.json.get('confDelilah'); 
		const matthew_confession = this.cache.json.get('confMatthew'); 
		const richard_confession = this.cache.json.get('confRichard');
		const cannon_ending		 = this.cache.json.get('cannon_ending');  

		const dayDatas = { 
			//day1_morning_data, 
			//day1_midday_data,
			day2_morning_data, 
			day2_midday_data,
			day3_morning_data,
			day3_midday_data, 
			day4_morning_data,
			day4_midday_data,
			day5_morning_data,
			day5_midday_data,
			confession_context,
			camille_confession,
			delilah_confession,
			matthew_confession,
			richard_confession,
			cannon_ending
		}; // !!!!!!!!!IMPORTANTE!! añadir aquí el resto de jsons que se generen 
		
		// Parámetros de la escena
		const { width, height } = this.canvas; // la anchura y altura del canvas
		const scene = this // referencia a esta misma escena
		this.width = width; this.height = height;
		const padding = 40; // espacio respecto al origen

		// Parámetros de los personajes
		const sprites = [ // array de sprites
			scene.add.sprite(0, padding, 'camilleph').setScale(1.1,1.1),
			scene.add.sprite(0, padding, 'delilahph').setScale(1.1,1.1),
			scene.add.sprite(0, padding + 60, 'matthewph').setScale(1.1,1.1),
			scene.add.sprite(0, padding, 'richardph').setScale(1.1,1.1)
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
		let bg = scene.add.image(0, 0, "fondo_negro");
		bg.depth = -2;

		// crea el botón del movil
		let movil = new Button(this, 850, 700, ' ', 2, 'movil', { "ClickCallback": () => this.ChangeScene("movil", scene), 
																  "EnterCallback": () => this.OverMovile(),
																  "ExitCallback": () => this.ExitMovile() });
		movil.setScale(0.25, 0.25);

		//Tween del movil cuando el ratón esté encima
		this.movilEnterTween = this.tweens.add({
			targets: movil,
			ease: 'Sine.easeInOut',
			duration: 100,
			y: 650,
			persist: true
		})

		//Tween del movil cuando el ratón sale del botón
		this.movilExitTween = this.tweens.add({
			targets: movil,
			ease: 'Sine.easeInOut',
			duration: 100,
			y: 700,
			persist: true
		})

		//Afinidades
		const images = [
			scene.add.image(1200, 100, "affCamille").setScale(0.25).setVisible(false),
			scene.add.image(1180, 100, "affDelilah").setScale(0.25).setVisible(false),
			scene.add.image(1160, 100, "affMatthew").setScale(0.25).setVisible(false),
			scene.add.image(1140, 100, "affRichard").setScale(0.25).setVisible(false)
		]
		this.images = images;

		//Tween de la afinidad
		this.affinityTween = this.tweens.add({
			targets: images,
			duration: 200,
			y: '-=20',
			ease: 'Sine.easeInOut',
			yoyo: true,
			repeat: 2,
			persist: true,
			onComplete: function () {
				for (let i = 0; i < images.length; i++) {
					images[i].setVisible(false);
				  }
			  }
		})

		// ** MANAGERS WOOOOOOOOOOOOOOOOOOOOOOO (!)  ** //
		let playerManager = new PlayerManager(0, 0, 0, 0);
		let dialogManager = new DialogueManager(scene, playerManager, dayDatas, characters, '9slice', 'bonk');
	}

	update() { 
		if(!this.music.isPlaying) {
			this.music.play()
		}
	}
	
	ChangeMusic(musicName){
		this.music.pause();
		this.music  = this.sound.add(musicName, { loop: true, volume: 0.5});
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

	/**
	 * 
	 * @param {String} character - nombre del personaje
	 */
	affinity(character) {
		//pj es el string con el nombre del personaje al que le afecta la sub de afinidad
		//Lo que yo quiero hacer es acceder a las imagenes (declarado arriba estan las 4 flechas de colores) y hacer visible la que toca
		let index = -1;
		switch(character)
		{
			case "camille": index = 0; break;
			case "delilah": index = 1; break;
			case "matthew": index = 2; break;
			case "richard": index = 3; break;
		}
		this.images[index].setVisible(true);
		//Se ejecuta el tween (Se aplica sobre todas las flechas pero solo se va a ver la que esté visible)
		this.affinityTween.play();
		//se desactivan al acabar el tween
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