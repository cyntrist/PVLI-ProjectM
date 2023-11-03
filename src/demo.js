import DialogText from "./dialog_plugin.js";
import { Button } from "./button.js";

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

        let bg = scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);
		bg.depth = 0;


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

		let dialoguetxt = scene.dialog;
		dialoguetxt.depth = 2;

		console.log(scene.dialog.depth);

		//this.dialog.toggleWindow();
        let i = 0;
		scene.dialog.setText(script[i], true);

        scene.input.on('pointerdown', function () {
            for (i = i; i < script.length; i++)
                scene.dialog.setText(script[i], true);
        });

		// crea un boton
		let but = new Button(this, 500, 200, 'TETAAAAAAAAAAAAAAAAAAAS', 'box');
		but.depth = 2;
    }

	changeBG(bg1){
		//new Background(scene, 0, 0, bg1);

		this.add.image(0, 0, bg1).setScale(0.35, 0.35).setOrigin(0, 0);
	}
}