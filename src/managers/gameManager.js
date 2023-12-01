import PlayerManager from './managers/playerManger.js';
import DialogueManager from './managers/dialogManager.js';
//El director de orquesta
export default class GameManager{
	
    constructor() {
        var PM = new PlayerManager(0, 0, 0, 0)
        //var DM = new DialogueManager();
    }

    //periodo 1: hacer llamada a lo que sea que vaya a sacar el dialogo y le cede el control, lo que maneja el dialogo
    //va a estar haaciendo su movida hasta que termina (y si por ejemplo tiene que dar puntos de afinidad se encarga de 
    //ello accediendo al player manager), momento en el que avisa al game manager

    //periodo 2: el gamemanager se encarga de cambiar el escenario y de llamar a la siguiente conversacion, se repite lo mismo
    //que con el periodo 1

    //periodo 3: we are completely fucked

    //periodo 4: pues mas de lo mismo que el 3 pero con menos libertad
}
