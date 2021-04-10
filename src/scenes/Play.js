class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png',{
            //sprite sheet is divided into width and height 
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
    }

    create() {
        //whichever image is created first gets pushed to the back of the web browser

        //place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);
        
        //green UI background rectangle
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, 
        borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        //white rectangle
        //set origin puts the origin at whatver you waant, default to center
        this.add.rectangle(0, 0,game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width,
        borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
        0xFFFFFF).setOrigin(0, 0);

        //add Rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize
        - borderPadding, 'rocket').setOrigin(0.5,0);
        
        //add spaceship(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 
            'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5
            +borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderPadding*4 + borderUISize*6, 
            'spaceship', 0, 10).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation config
        this.anims.create({
            //key is the name, frames it what sprite we want to access
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion', {
                //frames in order
                start: 0,
                end: 9,
                first:0
            }),
            //framerate of the animation
            frameRate: 30
        });

        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //binding a score left property to the scene
        this.scoreLeft = this.add.text(borderUISize+borderPadding,borderUISize+borderPadding*2,
            this.p1Score, scoreConfig);

        //GAME OVER flag telling the game to stop moving
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
        //time delayed call calls the function after the time is up
        this.clock = this.time.delayedCall(game.settings.gameTimer, () =>{ //1000 = 1 second, timer depends on difficulty
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart or <- for Menu',
            scoreConfig).setOrigin(0.5);
            this.gameOver = true; //the game no longer plays
        }, null, this);
    }

    update(){
        //check the key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart(); //resets the scene
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene"); //Goes back to the menu scene
        }
        //scroll the texture around the sprite every frame, giving the expression of scrolling
        this.starfield.tilePositionX -=starSpeed;

        if(!this.gameOver){// when the game over is triggered, the objects no longer can move
            //update rocket position
            this.p1Rocket.update();
            //update spaceship x3
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

    }

    checkCollision(rocket, ship){
        //simple AABB checking
        if( rocket.x<ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y >ship.y){
                return true;
        }else{
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide the ship before resetting the poistion
        ship.alpha = 0; //transparent
        //create delicious explosion on the ship position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode'); //plays the animation 
        boom.on('animationcomplete', () => {
            ship.reset();   //put the ship back into the loop
            ship.alpha = 1;
            boom.destroy(); //destroys the animation
        });
          // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion'); //when the ship is hit play the explosion sfx      
    }
}