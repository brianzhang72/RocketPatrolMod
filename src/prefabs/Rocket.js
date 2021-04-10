//Rocket player prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        //referecing the object it is enclosed in, which is the rocket class
        scene.add.existing(this);
        this.isFiring = false;  //track rocket firing status, if true we cannot move
        this.moveSpeed = 10;     //pixels per frame
    }

    update(){
        //left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            }
        }
        //fire button
        //just down command only activates when it is pressed down once
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
        }
        //if fired, moves the rocket up
        if(this.isFiring && this.y >= borderUISize*3 +borderPadding){
            this.y -= this.moveSpeed;
        }
        //reset on miss
        if(this.y<= borderUISize*3 + borderPadding){
            this.reset();
        }
    }

    //reset rocket to ground, make this a function for redundant code
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}