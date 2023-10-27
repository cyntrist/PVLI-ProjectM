import TypeWriterDemo from './typewritter.js';

const config = {
  width: 1280,              
  height: 720,            
  type: Phaser.AUTO,      
  parent: document.getElementById('juego'),
  scale: {
    parent: 'juego',
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
    autoCenter: Phaser.Scale.CENTER_BOTH, 
  },
  scene: TypeWriterDemo,
  title: "MBTI",
  version: "1.0.0"
}

var game = new Phaser.Game(config);
 