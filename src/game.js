import Demo from './scenes/Demo.js';
import Movil from './scenes/Movil.js';
import MainMenu from './scenes/MainMenu.js';
import MelonFlippeador from './scenes/MelonFlippeador.js';

// circuos  
import CircusBoot from './minigames/Circus/CircusBoot.js';
import CircusMenu from './minigames/Circus/CircusMenu.js';
import CircusLevel from './minigames/Circus/CircusLevel.js';

// twinbee

// import TwinbeeBoot from './minigames/TwinBee/TwinbeeBoot.js';
// import TwinbeeMenu from './minigames/TwinBee/TwinbeeMenu.js';
// import TwinbeeLevel from './minigames/TwinBee/TwinbeeLevel.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {
  width: 1280,
  height: 720,
  type: Phaser.AUTO,
  parent: 'juego',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER
  },

  scene: [MainMenu, Demo, Movil, MelonFlippeador, CircusBoot, CircusMenu, CircusLevel,
    //TwinbeeBoot, TwinbeeMenu, TwinbeeLevel
  ],
  physics: {
    default: 'arcade', // elegir motor
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
    /*
    matter: {
      gravity: { y: 2 },
      setBounds: {
        left: true,
        right: true,
        top: true,
        bottom: true,
      }
      */
  },
  title: "MBTI",
  version: "1.0.0"
}

new Phaser.Game(config);
