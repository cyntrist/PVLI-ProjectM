import DialogText from "./dialog_plugin.js";
import { Button } from "./button.js";


// int o numero para marcar el escenario
	// 0 -> clase
	// 1 -> pasillo
	var scenaries = new Array("clase", "pasillo");//['clase', 'pasillo'];

	var Scenary = 'clase';

	// backgrounds
	var currentBG;
	var nextBG;

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
		this.load.image('clase', './assets/images/escenarios/clase2.jpg');
		this.load.image('pasillo', './assets/images/escenarios/pasillo.jpg');

		this.load.spritesheet('box', './assets/images/escenarios/opciones.png', {frameWidth: 111, frameHeight: 30})
    }

	create()
    {
        let scene = this // referencia a esta misma escena
        let script = [
            "Camille:\nBuenas noches, muy buenas tetas por cierto.",
            "Matthew:\nEeeee o no eeeeeee amonooooo"
        ]

		this.nextBG = 1;
		this.currentBG = 1;
        let bg = scene.add.image(0, 0, Scenary).setScale(0.35, 0.35).setOrigin(0, 0);
		bg.depth = -2;
		//Scenary = 1;
		
		//console.log(scenaries[0]);

	    scene.dialog = new DialogText(this, {
			borderThickness: 6,
			borderColor: 0xF6F6F6,
			borderAlpha: 1,
            windowBorderRadius: 4,
			windowAlpha: 1,
			windowColor: 0xFF799A,
			windowHeight: 150,
			padding: 18,
            hasCloseBtn: false,
            closeBtnColor: 'white',
			dialogSpeed: 4.5,
			fontSize: 24,
			fontFamily: "lato"
		});
		// capa 2
		let dialoguetxt = scene.dialog;
		dialoguetxt.depth = 2;

		//this.dialog.toggleWindow();
        let i = 0;
		scene.dialog.setText(script[i], true);

        scene.input.on('pointerdown', function () {
            for (i = i; i < script.length; i++)
                scene.dialog.setText(script[i], true);
        });

		// crea un boton al pasillo
		let but1 = new Button(this, 550, 200, 'pasillo', 'box', 2);
		but1.depth = 2;

		// crea un boton a la clase
		let but2 = new Button(this, 550, 100, 'clase', 'box', 1);
		but2.depth = 2;

    }

	update(){

		if(this.nextBG == 1) Scenary = 'clase';
		else if(this.nextBG == 2) Scenary = 'pasillo';
		 
		// ---------------------------
		if(this.nextBG != this.currentBG){
			// current scenary
			console.log(Scenary);

			let bg = this.add.image(0, 0, Scenary).setScale(0.35, 0.35).setOrigin(0, 0);
			bg.depth = -2;

			this.currentBG = this.nextBG;
		}
	}
}