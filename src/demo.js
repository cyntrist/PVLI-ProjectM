import DialogText from "./dialog_plugin.js";
import Character from "./character.js"

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
		this.load.image('clase', './assets/images/escenarios/clase2.jpg');
		this.load.image('camilleph', './assets/images/personajes/camille.png');
		this.load.image('delilahph', './assets/images/personajes/delilah.png');
		this.load.image('matthewph', './assets/images/personajes/matthew.png');
		this.load.image('richardph', './assets/images/personajes/richard.png');
    }

	create()
    {
		// parámetros
		const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this // referencia a esta misma escena
        const script = [ // array de frases (en un futuro me gustaría que le pudieras pasar a cada pj su frase y fuera algo rollo camille.say(blabla) pero bueno de momento asi)
            "Matthew:\nBuenas tardes y muy buenas tetas por cierto.",
            "Delilah:\n¡Matthew, no puedes ir diciéndole eso a la gente por la cara!",
			"Matthew:\n¿Qué tiene de malo? Es un cumplido.",
			"Richard:\nDe hecho, Delilah tiene razón. Es algo que puede resultar descortés y como un auténtico pervertido... Algo no muy alejado de la realidad.",
			"Matthew:\n¡Pero si no he dicho nada malo! A ver, francesa, ¿a ti te ha molestado?",
			"Camille:\n...Pues mentira no es, no nos vamos a engañar. Obviamente tengo un cuerpazo, ¿o no?",
			"Richard:\nCiertamente, no es algo que pueda negarse, no.",
			"Delilah:\nSi nos ponemos así no podemos decir que no, pero...",
			"Matthew:\n¡Veis! Lo que yo decía, es un pezado de cumplido.",
			"\n  >> Fin de la demo <<",
			" "
        ]
		const Elenco = {
			Camille: 0,
			Delilah: 1,
			Matthew: 2,
			Richard: 3
		}

		//fondo
        scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);

		// sprites
		const sprites = [
			scene.add.sprite(0, 30, 'camilleph').setScale(0.5,0.5),
			scene.add.sprite(0, 30, 'delilahph').setScale(0.5,0.5),
			scene.add.sprite(0, 30, 'matthewph').setScale(0.5,0.5),
			scene.add.sprite(0, 30, 'richardph').setScale(0.5,0.5)
		]

		// personajes
		const camille = new Character(scene, width*1/5, height - sprites[Elenco.Camille].displayHeight/2, sprites[Elenco.Camille], "Camille");
		const delilah = new Character(scene, width*2/5, height - sprites[Elenco.Delilah].displayHeight/2, sprites[Elenco.Delilah], "Delilah");
		const matthew = new Character(scene, width*3/5, height - sprites[Elenco.Matthew].displayHeight/2, sprites[Elenco.Matthew], "Matthew");
		const richard = new Character(scene, width*4/5, height - sprites[Elenco.Richard].displayHeight/2, sprites[Elenco.Richard], "Richard");

		const characters = [
			camille,
			delilah,
			matthew,
			richard
		]

		// ventana de diálogo
	    scene.dialog = new DialogText(this, {
			borderThickness: 6,
			borderColor: 0xF6F6F6,
			borderAlpha: 0.8,
            windowBorderRadius: 4,
			windowAlpha: 0.9,
			windowColor: 0xFF799A,
			windowHeight: 150,
			padding: 18,
            hasCloseBtn: false,
            closeBtnColor: 'white',
			dialogSpeed: 4.5,
			fontSize: 24,
			fontFamily: "lato"
		});

		matthew.say(scene, "Buenas tardes y muy buenas tetas por cierto.", characters);
		delilah.say(scene, "¡Matthew, no puedes ir diciéndole eso a la gente por la cara!", characters)
		matthew.say(scene, "¿Qué tiene de malo? Es un cumplido.", characters);

		/*
		// texto en pantalla
        let i = 0;
		scene.dialog.setText(script[i], true);
        scene.input.on('pointerdown', function () {
            if (i < script.length - 1) 
			{
				i++;
                scene.dialog.setText(script[i], true);
			}
        });
		*/
    }
}