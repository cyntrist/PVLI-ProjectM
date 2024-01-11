import Button from '../../objects/button.js';

export default class TwinbeeMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'TwinbeeMenu' });
    }

    init(data) {

    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // musica
        this.sound.stopAll();
        //this.sound.add('menuMusic', { loop: true }).play();

        const color1 = Phaser.Display.Color.RandomRGB();
        const color2 = Phaser.Display.Color.RandomRGB();
        const color3 = Phaser.Display.Color.RandomRGB();

        // titulo
        this.add.text(width / 2, 50, "TwinBee", {
            fontFamily: 'gummy',
            fontSize: 48,
        }).setOrigin(0.5, 0.5).setStroke(color1.rgba, 12).setShadow(2, 2, "#333333", 2, true, true);

        // botones dificultad
        let oneplayer = this.add.text(width / 2, height - 60, "1-Player", {
            fontFamily: 'gummy',
            fontSize: 24,
            color: color2.rgba
        }).setOrigin(0.5, 0.5).setInteractive().setStroke(color3.rgba, 8);
        // botones dificultad
        let twoplayers = this.add.text(width / 2, height - 20, "2-Player", {
            fontFamily: 'gummy',
            fontSize: 24,
            color: color3.rgba
        }).setOrigin(0.5, 0.5).setInteractive().setStroke(color2.rgba, 8);

        oneplayer.on('pointerdown', () => {
            scene.scene.start('TwinbeeLevel', { data: 1 });
        });

        twoplayers.on('pointerdown', () => {
            scene.scene.start('TwinbeeLevel', { data: 2 });
        });

        let but1 = new Button(this, 100, 320, ' ', 2, 'goBackBox', { "ClickCallback": () => {
            this.sound.stopAll();
            this.scene.switch('movil');
        }});
    }
}