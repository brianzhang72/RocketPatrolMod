console.log('rocket patrol');

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 720,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config); 

// set UI sizes, initial variables used to create sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 1;

//reserve keyboard bindings
let keyF, keyR, keyLEFT, keyRIGHT, keySPACE;

/*
Brian Zhang
Galaxy Brain (Rocket Patrol Mod)
4/17/2021
The project took me around 14 hours to complete (6 hours artwork, 5 hours coding, 3 hours debugging and testing)

Point Breakdown:
-Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
-Created a small orange space ship named the Rogue Flamebird which is the new, smaller, and faster spaceship that is worth 30 points compared to 10 (20p)
-Rocket, spaceships, and explosion all have new graphics. (20p)
-Create and implement a new weapon (w/ new behavior and graphics) (20)
-The new rocket weapon is immobile but instead it can be aimed and has new graphics (20p)
-There are 4 new explosion wav files that are randomized every time a spaceship is hit (20p)
-The UI borders now have portals, asteroids, and a launch hub instead of the white border (20p)
-The new title and instruction screen has new artwork, font, and a different layout (10p)
-There is parallax scrolling between the stars and the background. The stars move at a faster pace than the nebula. (parallax scrolling 10p + tile sprite 5p)
-Added the copyright free song “Creo - Nautilus” that plays when the game is entered (5p)
Other random features include:
A combo feature that awards the player for hitting spaceships consecutively without missing any shots, prioritizing aiming over spamming shots.
*/