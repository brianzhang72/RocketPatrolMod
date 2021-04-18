class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, type){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   //add to existing scene
        this.points = pointValue;   //store pointValue
        this.type = type;
        this.speedMultiplier;
        if(type == 2){
            this.rotation = -1.56;
        }
        this.moveSpeed = game.settings.spaceshipSpeed         //pixels per frame
    }
    update(speedMultiplier){
        //move spaceship left
        if(this.type == 1){
            this.x -= this.moveSpeed * speedMultiplier;
        // wrap around left to right edge
            if(this.x <= 0 - this.width){
                this.reset();
            }
        } else if(this.type == 2){
            this.x -= this.moveSpeed * speedMultiplier * .5;
        }
    }

    //position reset
    reset(){
        if(this.type ==1){
        this.x = game.config.width + Math.random()*800;
        this.y = 150+Math.random()*250; //randomizes the location of the spawn
        }else if (this.type==2){

        }
    }
}