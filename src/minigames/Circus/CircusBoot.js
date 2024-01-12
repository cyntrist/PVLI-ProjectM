export default class CircusBoot extends Phaser.Scene {
    constructor() {
        super({ key: 'CircusBoot' });
    }

    preload() {
        this.canvas = this.sys.game.canvas;
        const { width, height } = this.canvas; // la anchura y altura del canvas

        // #region PRELOADER
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
        this.load.image('bg1', '../../../assets/minigames/circus/sprites/background.png');
        this.load.image('bg2', '../../../assets/minigames/circus/sprites/background2.png');
        this.load.image('stars', '../../../assets/minigames/circus/sprites/stars.png');
        this.load.image('icon', '../../../assets/minigames/circus/sprites/icon.png');
        this.load.image('platform', '../../../assets/minigames/circus/sprites/platform.png');
        this.load.spritesheet('clown', '../../../assets/minigames/circus/sprites/clown.png', { frameWidth: 16, frameHeight: 24 });
        this.load.spritesheet('fire', '../../../assets/minigames/circus/sprites/fire.png', { frameWidth: 25, frameHeight: 31 });
        this.load.spritesheet('lion', '../../../assets/minigames/circus/sprites/lion.png', { frameWidth: 36, frameHeight: 16 });
        this.load.spritesheet('ring', '../../../assets/minigames/circus/sprites/ring.png', { frameWidth: 26, frameHeight: 80 });
        this.load.spritesheet('halfring', '../../../assets/minigames/circus/sprites/ring.png', { frameWidth: 13, frameHeight: 80 });

        // Loading audio
        this.load.audio('failureEffect', '../../../assets/minigames/circus/sounds/failure.mp3');
        this.load.audio('stageMusic', '../../../assets/minigames/circus/sounds/stage.mp3');
        this.load.audio('menuMusic', '../../../assets/minigames/circus/sounds/menu.mp3');
        this.load.audio('finalEffect', '../../../assets/minigames/circus/sounds/final.wav');
        this.load.audio('jumpEffect', '../../../assets/minigames/circus/sounds/jump.wav');
        this.load.audio('scoreEffect', '../../../assets/minigames/circus/sounds/score.wav');
    }

    createAnimations() {
        this.anims.create({
            key: 'clownIdle',
            frames: this.anims.generateFrameNumbers('clown', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'clownJump',
            frames: this.anims.generateFrameNumbers('clown', { start: 1, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'clownDie',
            frames: this.anims.generateFrameNumbers('clown', { start: 4, end: 4 }),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'clownWin',
            frames: this.anims.generateFrameNumbers('clown', { start: 2, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'fireAnim',
            frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'ringAnim',
            frames: this.anims.generateFrameNumbers('ring', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'halfRingAnim',
            frames: this.anims.generateFrameNumbers('halfring', { frames: [1, 3] }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'lionJump',
            frames: this.anims.generateFrameNumbers('lion', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'lionIdle',
            frames: this.anims.generateFrameNumbers('lion', { start: 2, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'lionWalk',
            frames: this.anims.generateFrameNumbers('lion', { start: 1, end: 2 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'lionDie',
            frames: this.anims.generateFrameNumbers('lion', { start: 3, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }

    create() {
        this.createAnimations();
        this.scene.start('CircusMenu');
    }
}