
import melon from "../melonFlip/melon.js";

export default class MelonFlip extends Phaser.Scene{


    constructor() {
		super({ key: 'MelonFlip'});
	}


    preload (){

        // fondo
		this.load.image('fondo', './assets/images/escenarios/melonFlip.png');

        // melon flippeando
        this.load.image('melon', './assets/images/escenarios/melon.png');
        

    }

    create (){

        // pone el fondo
		let bg = this.add.image(0, 0, 'fondo').setScale(1, 1).setOrigin(0, 0);
		bg.depth = -2;

        let character = new melon(this, 10, 10, 'melon');

    }

    update (){

    }
    


}