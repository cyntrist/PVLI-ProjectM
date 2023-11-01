import DialogText from "./dialog_plugin.js";
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
        let scene = this // referencia a esta misma escena
        let script = [
            "Camille:\nBuenas noches, muy buenas tetas por cierto.",
            "Camille:\nJODER ESTOY HASTA LA PUTA POLLA LLEVO TODO EL DIA PARA ESTO ODIO JAVASCRIPT"
        ]

        scene.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);
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

		//this.dialog.toggleWindow();
        let i = 0;
		scene.dialog.setText(script[i], true);

        scene.input.on('pointerdown', function () {
            for (i = i; i < script.length; i++)
                scene.dialog.setText(script[i], true);
        });
    }

    update() 
    {
        //this.dialog.setText("Camille:\nEstoy hasta la polla.", true)
    }
}