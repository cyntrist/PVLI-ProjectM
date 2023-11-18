import Demo from './scenes/demo.js';

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
    mode: Phaser.Scale.NONE, // cyn: que alguien le pregunte a alguien por que si pongo fit pasan cosas malas
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY, 
    min: { // cyn: como le deje escalar se pone a hacer unas cosas rarísimas 
          width: 720,
          height: 480
      },
    max: {
          width: 1280,
          height: 720
      }
  },
  scene: [Demo],
  title: "MBTI",
  version: "1.0.0"
}

new Phaser.Game(config);
 