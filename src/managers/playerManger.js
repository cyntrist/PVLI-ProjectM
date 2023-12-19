//import {Background} from "../objects/background.js"
export default class PlayerManager {
    /**
	 * Contructor
	 * @param {String} AffinitySprite // sprite de la afinidad
	 */

    constructor(cAff, dAff, mAff, rAff, AffinitySprite) {
        this.affinities = {
            camille: { points: cAff, scalingStat: "charisma" },
            delilah: { points: dAff, scalingStat: "kindness" },
            matthew: { points: mAff, scalingStat: "humor" },
            richard: { points: rAff, scalingStat: "intelligence" }
        }

        this.playerStats = { charisma: 1, kindness: 1, humor: 1, intelligence: 1, luck: 1 }

        this.affIncrease = 100;

        // creamos el sprite
		this.aff = new Phaser.GameObjects.Sprite(scene, x, y, boxSprite);
		this.box.setScale(2, 2);
		this.add(this.box);
    }

    increaseAffinity(charName) { //como parametro una string del nombre de personaje
        this.affinities[charName].points += this.affIncrease * this.playerStats[this.affinities[charName].scalingStat];
    }

    increasePlayerStats(statName) {
        this.playerStats[statName]++;
    }


}
