import CircusPlayer from "./circusPlayer.js";
import Ring from "./ring.js";
import Fire from "./fire.js";
import Platform from "./platform.js";

export default class CircusLevel extends Phaser.Scene {
    constructor() {
        super({ key: 'CircusLevel' });
    }

    init(data) {
        this.meters = data.length || 200;
        this.score = data.length * 100 || 0;
        this.highscore = data.highscore || 0;
    }

    preload() {
        this.canvas = this.sys.game.canvas;
    }

    create() {
        const { width, height } = this.canvas; // la anchura y altura del canvas
        const scene = this;

        // audio
        this.sound.stopAll();
        this.sound.add('stageMusic', { loop: true }).play();
        this.scoreSound = this.sound.add('scoreEffect', { loop: true });
        this.failSound = this.sound.add('failureEffect');
        this.winSound = this.sound.add('finalEffect');

        // suelo
        const floor = this.add.sprite(width * 2, height - 30, 'none').setVisible(false);
        this.floor = floor;
        this.addObstacle(floor);
        floor.body.setSize(width * scene.meters / 10 + 200, 200);

        // player
        this.player = new CircusPlayer(this, 100, floor.y - floor.height - 300);
        this.player.depth = 1;
        this.cameras.main.startFollow(this.player, 0, 1, 1, -width / 2 + 200, 150);
        this.physics.add.collider(this.player, this.player.lion);
        this.connectToPlayer(floor, null);
        this.collisionFlag = false;

        // bg y objetos
        this.rings = [];
        let bg1 = this.add.image(0, 200, 'bg1').setScale(1).setOrigin(0, 0);
        this.add.image(-bg1.width, 200, 'bg1').setScale(1).setOrigin(0, 0);
        for (let i = 0; i <= scene.meters / 10; i++) {
            this.add.image((i + 1) * bg1.width, 200, 'bg1').setScale(1).setOrigin(0, 0);

            // meters
            let container = scene.add.container(i * bg1.width + 120, height - 50);
            const rect = this.add.graphics();
            rect.fillStyle(0x000000); // negro
            rect.fillRect(-70, -25, 140, 50);  // fondo
            rect.lineStyle(5, 0xFF0000); // roja
            rect.strokeRect(-70, -25, 140, 50); // linea
            let text = this.add.text(0, 0, scene.meters - i * 10 + " M", {
                fontFamily: 'arcade_classic',
                fontSize: 24,
                color: 'red'
            }).setOrigin(0.5, 0.5)
            container.add(rect);
            container.add(text);

            // obstáculos
            // final
            if (i == scene.meters / 10) {
                let platform = new Platform(this, i * bg1.width + 120, floor.y - floor.height - 120);
                this.platform = platform;
                this.addObstacle(platform);
                this.connectToPlayer(platform, this.onWin)
            }
            // jarron y anillo
            else if (i > 2) {
                let fire = new Fire(this, i * bg1.width + 120, floor.y - floor.height - 120);
                this.addObstacle(fire);
                this.connectToPlayer(fire, this.onDie);

                let ring = new Ring(this, (i + 1) * bg1.width, height - 320);
                this.addObstacle(ring);
                this.connectToPlayer(ring, this.onDie);
                this.rings.push(ring);
            }
            // solo anillos
            else {
                let ring = new Ring(this, (i + 1) * bg1.width, height - 320);
                this.addObstacle(ring);
                this.connectToPlayer(ring, this.onDie); 
                this.rings.push(ring);
            }
        }

        // puntuacion y intervalo de bajada de puntuación
        scene.scoreText = scene.add.text(width / 2, 50, "SCORE: " + scene.score, {
            fontFamily: 'arcade_classic',
            fontSize: 24,
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        scene.highscoreText = scene.add.text(width / 2, 100, "HIGHSCORE: " + scene.highscore, {
            fontFamily: 'arcade_classic',
            fontSize: 24,
            color: 'red'
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        this.scoreInterval = setInterval(() => {
            scene.score -= 50;
            if (this.score <= 0) {
                clearInterval(this.scoreInterval);
            }
        }, 1000);        
    }

    preUpdate(time, deltaTime) {

    }

    update() {
        this.scoreText.setText("SCORE: " + this.score);
        this.highscoreText.setText("HIGHSCORE: " + this.highscore);
    }

    addObstacle(obstacle) {
        this.physics.world.enable(obstacle);
        obstacle.body.setAllowGravity(false);
        obstacle.body.setImmovable(true);
        this.physics.add.collider(obstacle, this.floor);
    }

    connectToPlayer(obstacle, callback) {
        this.physics.add.collider(this.player, obstacle, callback, null, this);
        this.physics.add.collider(this.player.lion, obstacle, callback, null, this);
    }

    onDie() {
        if (!this.collisionFlag) {
            this.sound.stopAll();
            this.failSound.play();
            this.player.die();
            this.endGame();
            this.collisionFlag = true;
        }
    }

    onWin() {
        if (!this.collisionFlag) {
            this.player.x = this.platform.x;
            this.player.y = this.platform.y - 70;
            this.sound.stopAll();
            this.winSound.play();
            this.player.win();
            this.highscoreUpdate();
            this.collisionFlag = true;
        }
    }

    stopRings() {
        this.rings.forEach(ring => {
            ring.die();
        });
    }

    highscoreUpdate() {
        this.stopRings();
        clearInterval(this.scoreInterval);
        setTimeout(() => {
            if (this.score > this.highscore) {
                this.scoreSound.play();
                this.highscore = 0;
                this.animateHighscore = setInterval(() => {
                    if (this.score < 50) {
                        this.highscore += this.score;
                        this.score = 0;
                    }
                    else {
                        this.score -= 50;
                        this.highscore += 50;
                    }

                    if (this.score === 0) {
                        this.tweens.add({
                            targets: this.highscoreText,
                            alpha: 0, // Configurar la opacidad a 0 (invisible)
                            duration: 500, // Duración de la animación (milisegundos)
                            yoyo: true, // Hacer que la animación se repita hacia atrás
                            repeat: -1, // Repetir indefinidamente
                        });
                        this.scoreSound.stop();
                        clearInterval(this.animateHighscore);
                        setTimeout(() => {
                            this.scene.start('CircusMenu', { highscore: this.highscore });
                        }, 5000);
                    }
                }, 1);
            }
            else {
                this.scoreAnimation = this.tweens.add({
                    targets: this.scoreText,
                    alpha: 0, // Configurar la opacidad a 0 (invisible)
                    duration: 500, // Duración de la animación (milisegundos)
                    yoyo: true, // Hacer que la animación se repita hacia atrás
                    repeat: -1, // Repetir indefinidamente
                });
            }
        }, 4000);
    }

    endGame() {
        this.stopRings();
        clearInterval(this.scoreInterval);
        setTimeout(() => {
            this.scene.start('CircusMenu', { highscore: this.highscore });
        }, 4000);
    }
}