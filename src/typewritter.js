export default class TypewriterDemo extends Phaser.Scene
{ 
    constructor()
	{
		super('typewriter')
	}

	preload()
	{

	}

	create()
    {
        this.label = this.add.text(100, 100, '')
        this.typewriteText('Hello, World!')

        /*
        this.label = this.add.text(100, 100, '')
		.setWordWrapWidth(100)

        this.typewriteTextWrapped('Hello, World!')
        */
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
            delay: 200
        })
    }

    typewriteTextWrapped(text)
    {
        const lines = this.label.getWrappedText(text)
        const wrappedText = lines.join('\n')

        this.typewriteText(wrappedText)
    }
}