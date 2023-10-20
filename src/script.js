const config = {
    width: 1200,             // anchura
    height: 700,            // altura
    parent: "container",    // ?
    type: Phaser.AUTO,      // auto pero deberiamos cabiarlo a canvas
    scene: {                //
        preload: preload,   //
        create: create,
        upadte: update
    }
}

var game = new Phaser.Game(config);


//
function preload ()
{
    console.log(" --- matthew --- \n\n tetorras ");

    console.log(" --- camille --- \n\n que cojones dices de tetorras guarro ");

    console.log(" --- matthew --- \n\n tetillas? ");

    console.log(" --- camille --- \n\n valido ");

    this.load.image('tetas', 'assets/images/concept art/concept_art_pjs_crop.png');
}

//
function create ()
{
    this.add.image(400, 300, 'tetas');
}

// 
function update ()
{

}
