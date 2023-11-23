export class playerManager {
	/**
	 * Puntos de afinidad con cada personaje (no me convencen los nombres de las variables, pedir consejo)
	 * @param {number} camAffinity //Camille
	 * @param {number} delAffinity //Delilah
	 * @param {number} matAffinity //Matthew
     * @param {number} ricAffinity //Richard
     * 
     * Stats del jugador
     * @param {number} charisma
     * @param {number} kindness
     * @param {number} intelligence
     * @param {number} humor
     * @param {number} luck
     * 
     * Cantidad en la que se incrementa la afinidad
     * @param {number} affIncrease
     */

    


    //tambien he pensado en hacerlo con un array para que todo lo relacionado con la afinidad este generalizado
    //    affinities = [0, 0, 0, 0]; // 0 Camille, 1 Delilah, 2 Matthew, 3 Richard

        constructor (cAff, dAff, mAff, rAff){ 
            camAffinity = cAff;
            delAffinity = dAff;
            matAffinity = mAff;
            ricAffinity = rAff;
            affIncrease = 100;
        }

        increaseAffinity(charNum){ //como parametro el numero del personaje: 0 cam, 1 del, 2 mat, 3 ric
            switch(charNum){
                case (0):
                    camAffinity += affIncrease * charisma;
                case (1): 
                    delAffinity += affIncrease * kindness;
                case (2):
                    matAffinity += affIncrease * humor;
                case (3):
                    ricAffinity += affIncrease * intelligence;
            }    
        }

        increasePlayerStats(statNum){
            switch(statNum){
                case (0):
                    charisma++;
                case (1): 
                    kindness++;
                case (2):
                    humor++;
                case (3):
                    intelligence++;
                case (4):
                    luck++;
            }
        }
  }
