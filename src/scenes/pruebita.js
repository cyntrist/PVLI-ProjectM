import {playerManager} from "../managers/playerManger";
/**
 * Escena demo.
 * @extends Scene
 */
export default class Pruebita extends Phaser.Scene
{ 
    constructor()
	{
		super({ key: 'Pruebita'})
	}

    // Carga de assets
	preload() 
	{
		this.canvas = this.sys.game.canvas;
		this.PM = new playerManager(0, 0, 0, 0);
    }

	create()
    {
		this.PM.increaseAffinity("Camille");
    }

	update(){
		
	}
}