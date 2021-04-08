class Play extends Phaser.Scene{
    constructor() {
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png')
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

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        //scroll the texture around the sprite every frame, giving the expression of scrolling
        this.starfield.tilePositionX -=starSpeed;

        //update rocket position
        this.p1Rocket.update();

    }
}