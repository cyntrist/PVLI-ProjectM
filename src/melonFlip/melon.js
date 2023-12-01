


export default class Melon extends Phaser.GameObjects.Container{

    // 
    constructor(scene, x, y, melonSprite) {
		// super a la escena
		super(scene, x, y);

        this.melon = new Phaser.GameObjects.Sprite(scene, x, y, melonSprite); 

        //this.melon = this.matter.add.image(x, y, melonSprite);

		this.melon.setScale(0.5, 0.5);

        this.add(this.melon);

        scene.add.existing(this);

    }


    // añade la fuerza indicada al objeto mediante un vector
    applyForce(force)
    {
        // no se que hace xd
        this._tempVec2.set(this.body.position.x, this.body.position.y);

        // aplica la fuerza
        Body.applyForce(this.body, this._tempVec2, force);

        // lo devuelve
        return this;
    }


}