class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed         //pixels per frame
    }
    update(speedMultiplier){
        //move spaceship left

        this.x -= this.moveSpeed * speedMultiplier;
        // wrap around left to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }

    //position reset
    reset(){
        this.x = game.config.width;
        this.y = 150+Math.random()*250; //randomizes the location of the spawn
    }
}