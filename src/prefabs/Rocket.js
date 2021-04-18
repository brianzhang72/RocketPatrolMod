//Rocket player prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        //add object to scene
        //referecing the object it is enclosed in, which is the rocket class
        scene.add.existing(this);
        this.isFiring = false;  //track rocket firing status, if true we cannot move
        this.moveSpeed = 10;     //pixels per frame
        this.tempX = this.x;
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.combo = 0;
    }

    update(){
        //left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width && this.rotation>-1){
                //this.x -= this.moveSpeed;
                this.rotation -=0.1;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width && this.rotation<1){
                //this.x += this.moveSpeed;
                this.rotation +=0.1;
            }
        }
        //fire button
        //just down command only activates when it is pressed down once
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); //play firing sfx
        }
        //if fired, moves the rocket up
        if(this.isFiring && this.y >= borderUISize*3 +borderPadding){
            this.y -= this.moveSpeed;
            //Since 0.75 rotation is the "90 degrees" so to speak, 
            //the x should travel as fast as y if the rotation is at 0.75
            //so 1/0.75 = 1.33 and if the rotation is 0.75 then the moveSpeed is the same
            this.x += this.rotation*1.33*this.moveSpeed; 
        }
        //reset on miss
        if(this.y<= borderUISize*3 + borderPadding){
            this.reset();
            this.combo = 0;
        }
    }

    //reset rocket to ground, make this a function for redundant code
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding + 5;
        this.x = this.tempX;
    }
}