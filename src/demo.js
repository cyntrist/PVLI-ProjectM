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
		this.load.image('clase', './assets/images/escenarios/clase2.jpg');
    }

	create()
    {
        const scene = this // referencia a esta misma escena
        const script = [
            "Camille:\nBuenas noches, muy buenas tetas por cierto.",
            "Matthew:\nEeeee o no eeeeeee amonooooo",
			"Richard:\nAkshually... it's \"¿Es o no es? ¡Vámonos!\"",
			"Delilah:\nPues los ajolotes hacen glugluglu. :-)",
			" "
        ]

        scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);
	    scene.dialog = new DialogText(this, {
			borderThickness: 6,
			borderColor: 0xF6F6F6,
			borderAlpha: 0.8,
            windowBorderRadius: 4,
			windowAlpha: 0.8,
			windowColor: 0xFF799A,
			windowHeight: 150,
			padding: 18,
            hasCloseBtn: false,
            closeBtnColor: 'white',
			dialogSpeed: 4.5,
			fontSize: 24,
			fontFamily: "lato"
		});

		//this.dialog.toggleWindow();
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