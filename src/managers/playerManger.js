//import {Background} from "../objects/background.js"
export default class PlayerManager {

    /**
     * @param {*} cAFF - afinidad con camille
     * @param {*} dAff - afinidad con Delilah
     * @param {*} mAff - afinidad con Matthew
     * @param {*} rAff - afinidad con Richard
     * @param {*} cora - detalles para el tween de afinidad
     * @param {*} ac - feedback de camille
     * @param {*} ad - feedback de delilah
     * @param {*} am - feedback de matthew
     * @param {*} ar - feedback de richard
     * @param {*} x - pos x del tween
     * @param {*} y - pos y del tween
     * @param {*} scene - Escena a la que afecta
	 */

    constructor(cAff, dAff, mAff, rAff, cora, ac, ad, am, ar, x, y, scene) {

        //Array de afinidades
        this.affinities = {
            camille: { points: cAff, scalingStat: "charisma" },
            delilah: { points: dAff, scalingStat: "kindness" },
            matthew: { points: mAff, scalingStat: "humor" },
            richard: { points: rAff, scalingStat: "intelligence" }
        }

        //Array para el feedback
        this.feedback = { ac, ad, am, ar}
        this.playerStats = { charisma: 1, kindness: 1, humor: 1, intelligence: 1, luck: 1 }

        this.affIncrease = 100;

        
    }

    create() {
        //Hacer el feedback de afinidad
        this.affinityTween = tweens.add({
            /*targets: this.feedback[charName],
            duration: 100,
            y: 650,
            persist: true,*/
        })

    }

    increaseAffinity(charName) { //como parametro una string del nombre de personaje
        this.affinities[charName].points += this.affIncrease * this.playerStats[this.affinities[charName].scalingStat];

        //this.affinityTween.play();

    }

    increasePlayerStats(statName) {
        this.playerStats[statName]++;
    }

    

}
