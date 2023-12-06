//import {Background} from "../objects/background.js"
export default class PlayerManager {
    constructor(cAff, dAff, mAff, rAff) {

        /*this.affinities = {
            0: { points: cAff, scalingStat: "charisma" },
            1: { points: dAff, scalingStat: "kindness" },
            2: { points: mAff, scalingStat: "humor" },
            3: { points: rAff, scalingStat: "intelligence" }
        }*/
        this.affinities = [cAff, dAff, mAff, rAff]

        //this.playerStats = { charisma: 1, kindness: 1, humor: 1, intelligence: 1, luck: 1 }
        this.playerStats = [1, 1, 1, 1, 1]

        this.affIncrease = 100;
    }

    increaseAffinity(charNum) { //como parametro una string del nombre de personaje
        //this.affinities[charNum].points = this.affinities[charNum].points + this.affIncrease * this.playerStats[this.affinities[charNum].scalingStat];
        this.affinities[charNum] += this.affIncrease * this.playerStats[charNum];
    }

    increasePlayerStats(statNum) {
        this.playerStats[statNum]++;
    }


}
