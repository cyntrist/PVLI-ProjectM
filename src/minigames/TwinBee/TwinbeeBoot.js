export default class TwinbeeBoot extends Phaser.Scene {
    constructor() {
        super({ key: 'TwinbeeBoot' });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        const { width, height } = this.canvas; // la anchura y altura del canvas

        // #region PRELOADER que viene calentito de casaaaaa siiiiiiii
        // segmento sacado de:
        // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        // gracias a toni <3
        //progressbar
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        let bar_width = width / 2;
        let bar_height = 70;
        let bar_x = (width - bar_width) / 2;
        let bar_y = (height - bar_height) / 2;
        let size_diff = 10;
        progressBox.fillStyle(0xFF799A, 0.8);
        progressBox.fillRect(bar_x, bar_y, bar_width, bar_height);

        //loading text
        let loadingText = this.make.text({
            x: width / 2,
            y: bar_y + 150,
            text: 'Loading...',
            style: {
                font: '24px monospace',
                fill: '#FFFFFF'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        // percent text
        let percentText = this.make.text({
            x: width / 2,
            y: bar_y + 200,
            text: '0%',
            style: {
                font: 'bold 24px monospace',
                fill: '#FF799A'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        // asset text
        let assetText = this.make.text({
            x: width / 2,
            y: height - 60,
            text: 'Asset:',
            style: {
                font: '18px monospace',
                fill: '#FFFFFF'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        // #endregion
        
        // Loading images
        this.load.image('background', '../assets/minigames/twinbee/images/background.png');
        this.load.image('bullet', '../assets/minigames/twinbee/images/bullet.png');
        this.load.image('green', '../assets/minigames/twinbee/images/green.png');

        //spritesheets
        this.load.spritesheet('enemy', '../assets/minigames/twinbee/images/enemy.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('explosion', '../assets/minigames/twinbee/images/explosion.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('twinbee', '../assets/minigames/twinbee/images/twinbee.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 3  });
        this.load.spritesheet('winbee', '../assets/minigames/twinbee/images/winbee.png', { frameWidth: 16, frameHeight: 16, startFrame: 0, endFrame: 3  });

        // Loading audio
        this.load.audio('deadSfx', '../assets/minigames/twinbee/sounds/dead.wav');
        this.load.audio('explosionSfx', '../assets/minigames/twinbee/sounds/explosion.wav');
        this.load.audio('luckySfx', '../assets/minigames/twinbee/sounds/lucky.wav');
        this.load.audio('shootSfx', '../assets/minigames/twinbee/sounds/shoot.wav');
    }

    createAnimations() {
        this.anims.create({
            key: 'twinIdle',
            frames: this.anims.generateFrameNumbers('twinbee', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'twinRight',
            frames: this.anims.generateFrameNumbers('twinbee', {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'twinLeft',
            frames: this.anims.generateFrameNumbers('twinbee', {start:2, end:2}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'twinShoot',
            frames: this.anims.generateFrameNumbers('twinbee', {start:3, end:3}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'winIdle',
            frames: this.anims.generateFrameNumbers('winbee', {start:0, end:0}),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: 'winRight',
            frames: this.anims.generateFrameNumbers('winbee', {start:1, end:1}),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: 'winLeft',
            frames: this.anims.generateFrameNumbers('winbee', {start:2, end:2}),
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: 'winShoot',
            frames: this.anims.generateFrameNumbers('winbee', {start:3, end:3}),
            frameRate: 0,
            repeat: -1
        });

        this.anims.create({
            key: 'enemyAnim',
            frames: this.anims.generateFrameNumbers('enemy', {start:0, end:3}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'explosionAnim',
            frames: this.anims.generateFrameNumbers('explosion', {start:0, end:2}),
            frameRate: 5,
            repeat: 2
        });
    }

    create() {
        this.createAnimations();
        this.scene.start('TwinbeeMenu');
    }
}