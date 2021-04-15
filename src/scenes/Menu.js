class Menu extends Phaser.Scene{
    constructor() {
        super("menuScene");
    }
    preload(){
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('rulesUI', './assets/rulesUI.png');
        this.load.image('spacebar', './assets/spacebar.png');
        this.load.image('title', './assets/title.png');
    }
    create() {
        this.rules = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'rulesUI').setOrigin(0, 0);
        this.title = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'title').setOrigin(0, 0);
        this.space = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'spacebar').setOrigin(0, 0);
        // define keys for choosing the difficulty the game would be set at
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.temp = 0;
        //change scenes
        //this.scene.start("playScene");
    }
    update(){
        //if (Phaser.Input.Keyboard.JustDown)
        if (Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.temp == 0){
            this.sound.play('sfx_select');
            this.title.alpha = 0;
            this.temp +=1;
            } else {
                game.settings = {
                    spaceshipSpeed: 4,
                    gameTimer: 45000
                }
                this.sound.play('sfx_select');
                this.scene.start("playScene");
            }
        }

    }
}