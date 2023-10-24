const config = {
  width: 1280,              
  height: 720,            
  type: Phaser.AUTO,      
  parent: document.getElementById('juego'),
  scale: {
    parent: 'juego',
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT ,
    autoCenter: Phaser.Scale.CENTER_BOTH, 
  }
}

var game = new Phaser.Game(config);
 