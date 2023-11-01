import TypeWriterDemo from './typewritter.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 * Doc: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Core.html#.GameConfig
 */

let config = {
  width: 1280,              
  height: 720,            
  type: Phaser.CANVAS,      
  parent: document.getElementById('juego'),
  scale: {
    /* cyn: las siguientes tres lineas son la única combinación que he encontrado para que escale bien*/
    parent: 'juego',
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
    autoCenter: Phaser.Scale.CENTER_BOTH, 
    min: { // cyn: esto no funciona para absolutamente nada (probablemente por lo anterior) pero me gusta soñar
          width: 640,
          height: 480
      },
    max: {
          width: 1920,
          height: 1080
      }
  },
  scene: [TypeWriterDemo],
  title: "MBTI",
  version: "1.0.0"
}

new Phaser.Game(config);
 