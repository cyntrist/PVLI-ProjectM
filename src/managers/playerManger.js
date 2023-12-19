//import {Background} from "../objects/background.js"
export default class PlayerManager {

    constructor(cAff, dAff, mAff, rAff) {
        this.affinities = {
            camille: { points: cAff, scalingStat: "charisma" },
            delilah: { points: dAff, scalingStat: "kindness" },
            matthew: { points: mAff, scalingStat: "humor" },
            richard: { points: rAff, scalingStat: "intelligence" }
        }

        this.playerStats = { charisma: 1, kindness: 1, humor: 1, intelligence: 1, luck: 1 }

        this.affIncrease = 100;

    }

    increaseAffinity(charName) { //como parametro una string del nombre de personaje
        this.affinities[charName].points += this.affIncrease * this.playerStats[this.affinities[charName].scalingStat];
    }

    increasePlayerStats(statName) {
        this.playerStats[statName]++;
    }


}
