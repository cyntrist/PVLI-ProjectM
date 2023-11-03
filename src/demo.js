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
		let script = ["\n\n\                                                                                            <3 MY BELOVED TRUE INTEREST <3"]; // línea de título
		this.script = script; // para que sea alcanzable desde character y en el say() puedan añadir líneas
		const Elenco = {
			Camille: 0,
			Delilah: 1,
			Matthew: 2,
			Richard: 3
		}
		const padding = 40;

		//fondo
        scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);

		// sprites
		const sprites = [
			scene.add.sprite(0, padding, 'camilleph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'delilahph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'matthewph').setScale(0.5,0.5),
			scene.add.sprite(0, padding, 'richardph').setScale(0.5,0.5)
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

		for(let i = 0; i < characters.length; i++) { // colorea a todos los personajes
			characters[i].onFocus();
		}

		// ventana de diálogo
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
			dialogSpeed: 4.5,
			fontSize: 24,
			fontFamily: "lato"
		});

		// La biblia, la conversación, la gracia de la experiencia, el por qué existe este juego
		matthew.say("Buenas tardes y muy buenas tetas por cierto.");
		delilah.say("¡Matthew, no puedes ir diciéndole eso a la gente por la cara!")
		matthew.say("¿Qué tiene de malo? Es un cumplido.");
		richard.say("De hecho, Delilah tiene razón. Es algo que puede resultar descortés y como un auténtico pervertido... Algo no muy alejado de la realidad.");
		matthew.say("¡Pero si no he dicho nada malo! A ver, francesa, ¿a ti te ha molestado?");
		camille.say("...Pues mentira no es, no nos vamos a engañar. Obviamente tengo un cuerpazo, ¿o no?");
		richard.say("Ciertamente, no es algo que pueda negarse, no.");
		delilah.say("Si nos ponemos así no podemos decir que no, pero...");
		matthew.say("¡Veis! Lo que yo decía, es un pezado de cumplido.");
		script.push("\n\n>> FIN DE LA DEMO <<");
		//...

		let i = 0; // calienta que sales
		scene.dialog.setText(script[i], true); // imprime la línea de título
		scene.input.on('pointerdown', function () { // cada click 
			if (i < script.length - 1)  // si no se sale del array
			{
				i++; // el sigueinte mensaje
				const name = script[i].substring(0, 7); // PORQUE TODOS SUS NOMBRES OCUPAN JUSTO 7 LETRAS XDXDDXXDDX LLEVO COMO 4 HORAS Y YA NO SE QUE MÁS PROBAR
				switch (name) { // colorea a quien toque (y por consiguiente descolorea a quien no toque)
					case "Camille":
						camille.onFocus();
						camille.unfocusEveryoneElse(characters);
						break;
					case "Delilah":
						delilah.onFocus();
						delilah.unfocusEveryoneElse(characters);
						break;
					case "Matthew":
						matthew.onFocus();
						matthew.unfocusEveryoneElse(characters);
						break;
					case "Richard":
						richard.onFocus();
						richard.unfocusEveryoneElse(characters);
						break;
					default:
						camille.unfocusEveryone(characters);
						break;
				}
				//  Cynthia status update: Frenzy +500.
                scene.dialog.setText(script[i], true); // háblame como tú bien sabes
			}
		})
    }
}