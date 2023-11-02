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
		this.load.image('camilleph', './assets/images/personajes/camilleph.png');
		this.load.image('delilahph', './assets/images/personajes/delilahph.png');
		this.load.image('matthewph', './assets/images/personajes/matthewph.png');
		this.load.image('richardph', './assets/images/personajes/richardph.png');
    }

	create()
    {
		// parámetros
        const scene = this // referencia a esta misma escena
        const script = [ // array de frases (en un futuro me gustaría que le pudieras pasar a cada pj su frase y fuera algo rollo camille.say(blabla) pero bueno de momento asi)
            "Matthew:\nBuenas tardes y muy buenas tetas por cierto.",
            "Delilah:\n¡Matthew, no puedes ir diciéndole eso a la gente por la cara!",
			"Matthew:\n¿Qué tiene de malo? Es un cumplido.",
			"Richard:\nDe hecho, Delilah tiene razón. Es algo que puede resultar descortés y como un auténtico pervertido... Algo no muy alejado de la realidad.",
			"Matthew:\n¡Pero si no he dicho nada malo! A ver, francesa, ¿a ti te ha molestado?",
			"Camille:\n...Pues mentira no es, no nos vamos a engañar. Obviamente tengo un cuerpazo, ¿o no?",
			"Richard:\nCiertamente, no es algo que pueda negarse, no.",
			"Delilah:\nSi nos ponemos así no podemos decir que no pero...",
			"Matthew:\n¡Veis! Lo que yo decía, es un pezado de cumplido.",
			">> Fin de la demo <<",
			" "
        ]
		const { width, height } = this.canvas;

		//fondo
        scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);

		// sprites
		const spr_camille = scene.add.sprite(0, 0, 'camilleph');
		const spr_delilah = scene.add.sprite(0, 0, 'delilahph');
		const spr_matthew = scene.add.sprite(0, 0, 'matthewph');
		const spr_richard = scene.add.sprite(0, 0, 'richardph');

		// personajes
		const camille = new Character(scene, width/5, height - spr_camille.displayHeight/2, spr_camille);
		const delilah = new Character(scene, width*2/5, height - spr_delilah.displayHeight/2, spr_delilah);
		const matthew = new Character(scene, width*3/5, height - spr_matthew.displayHeight/2, spr_matthew);
		const richard = new Character(scene, width*4/5, height - spr_richard.displayHeight/2, spr_richard);

		//camille2.add(spr_camille);
		//delilah.add('delilah');
		//matthew.add('matthew');
		//richard.add('richard');

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
    }
}