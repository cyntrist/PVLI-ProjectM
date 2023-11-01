/**
 * Clase para el efecto de texto escrito en pantaña.
 * @extends Scene
 */
export default class Typewritter extends Phaser.Scene
{ 
    constructor()
	{
		super('TypeWritter')
	}

	preload()
	{
        this.canvas = this.sys.game.canvas;
        let textbox = this.load.image('cajatxt', './assets/images/escenarios/cajaDeTexto.png');
		let fondo = this.load.image('clase', './assets/images/escenarios/clase2.jpg');
    }

	create()
    {
        let { width, height } = this.canvas;
        const padding = 90
        const textboxsize = 150

        this.add.image(0, 0, 'clase').setScale(0.35, 0.35).setOrigin(0, 0);
        this.add.image(width/2, height - textboxsize, 'cajatxt').setScale(0.95,0.95);
        this.label = this.add.text( padding, height - padding - textboxsize, '', {
            fontFamily: 'lato',
            fontSize: 20,
            fill: 'black'
        })
        .setWordWrapWidth(width - padding*2)
        this.typewriteText("Camille:\n\nBuenas noches, muy buenas tetas por cierto.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
    }

    typewriteText(text)
    {
        const length = text.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                this.label.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 10
        })
    }

    typewriteTextWrapped(text)
    {
        const lines = this.label.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
    }
}