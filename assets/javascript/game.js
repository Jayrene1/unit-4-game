// 1. global variable declaration (track game state)
var playerSelected = false;
var enemySelected = false;
var playerIdentity;
var enemyIdentity;
var aPModifer;
var deadEnemies = [];


// 2. game objects (player characters) TODO needs better names

    // player 1
var player1 = {
    name: "Knight",
    htmlID: "#player-1",
    htmlImage: "#player-1-image",
    healthPoints: 120,
    attackPower: 9,
    counterAttackPower: 15,
    imageIdle: "assets/images/knight/knight-idle.png",
    imageIdle2: "assets/images/knight/knight-idle-up.png",
    imageAttack: "assets/images/knight/knight-attack-down.gif",
    imageAttack2: "assets/images/knight/knight-attack-up.gif",
    valueOf() {
        return this.attackPower;
    }
}
    
    //player 2
var player2 = {
    name: "Dwarf",
    htmlID: "#player-2",
    htmlImage: "#player-2-image",
    healthPoints: 100,
    attackPower: 14,
    counterAttackPower: 5,
    imageIdle: "assets/images/dwarf/dwarf-idle.png",
    imageIdle2: "assets/images/dwarf/dwarf-idle-up.png",
    imageAttack: "assets/images/dwarf/dwarf-attack-down.gif",
    imageAttack2: "assets/images/dwarf/dwarf-attack-up.gif",
    valueOf() {
        return this.attackPower;
    }
}

    // player 3
var player3 = {
    name: "Sorcerer",
    htmlID: "#player-3",
    htmlImage: "#player-3-image",
    healthPoints: 150,
    attackPower: 7,
    counterAttackPower: 20,
    imageIdle: "assets/images/sorcerer/sorcerer-idle.png",
    imageIdle2: "assets/images/sorcerer/sorcerer-idle.png",
    imageAttack: "assets/images/sorcerer/sorcerer-attack.gif",
    imageAttack2: "assets/images/sorcerer/sorcerer-attack.gif",
    valueOf() {
        return this.attackPower;
    }
}

    //player 4
var player4 = {
    name: "Ghost",
    htmlID: "#player-4",
    htmlImage: "#player-4-image",
    healthPoints: 180,
    attackPower: 5,
    counterAttackPower: 25,
    imageIdle: "assets/images/ghost/ghost-idle.png",
    imageIdle2: "assets/images/ghost/ghost-idle.png",
    imageAttack: "assets/images/ghost/ghost-attack.gif",
    imageAttack2: "assets/images/ghost/ghost-attack.gif",
    valueOf() {
        return this.attackPower;
    }
}



// 3. jQuery element moving logic

    //event listeners for character selection (on-click)
$("#waiting-1").on("click", function() {
    appendPlayer(player1.htmlID, player1);
});

$("#waiting-2").on("click", function() {
    appendPlayer(player2.htmlID, player2);
});

$("#waiting-3").on("click", function() {
    appendPlayer(player3.htmlID, player3);
});

$("#waiting-4").on("click", function() {
    appendPlayer(player4.htmlID, player4);
});

function appendPlayer(htmlID, characterObject) {
    
    // if player clicked, moves to player area
    // TODO change border color
    if (playerSelected === false) {
        $(htmlID).appendTo("#player-area");
        playerSelected = true;
        playerIdentity = characterObject;
        displayStats(characterObject); // displays player stats on selection
        console.log("player identity: " + htmlID); 
        
        aPModifer = characterObject.valueOf(); // assign attack power modifier to selected player, used in calculateDamage()

        imageOfPlayer(characterObject); // (optional) modify image to face up
        
        soundOfChoice(); // player chosen sound trigger

    // if enemy clicked, move to enemy area
    // TODO change border color
    } else if (enemySelected === false) {
        $(htmlID).appendTo("#enemy-area");
        enemySelected = true;
        enemyIdentity = characterObject;
        displayStatsEnemy(characterObject); // displays enemy stats on selection
        soundOfChoice(); // player chosen sound trigger
        $("#log").text("- FIGHT!"); // display fight message now that both characters are chosen    
        console.log("enemy identity:" + htmlID);
    }
}



// 4. attack logic

    //When attack button is clicked, run calculateDamage()
function onAttack() {
    // attack clicked while no enemy chosen, show error message
    if (enemySelected === false) {
        console.log("error, can't attack until an enemy is selected");
        $("#log").text("- Must select an enemy first");// send error to log section
    } else if (gameOver(playerIdentity) === false) { 
        console.log("calculating damage...");
        calculateDamage(playerIdentity, enemyIdentity);
    }
}

    // compute attacks and attempt to end the game
function calculateDamage(player, enemy) {           
    console.log("attack modifier set to: " + aPModifer);
        
    // player attack
    enemy.healthPoints -= player.attackPower;
    displayStatsEnemy(enemy); // updates enemy stats
    imageOfAttack(player); // attack animation
    soundOfAttack(player); // sound trigger
    console.log("the enemy's health has been reduced to " + enemy.healthPoints);
    $("#log").text("- You attacked the enemy!"); // display attack result    
    // enemy attack (no damage on winning round)
    if (enemy.healthPoints > 0 && player.healthPoints > 0) {
        player.healthPoints -= enemy.counterAttackPower;
        imageOfAttack(enemy); // attack animation
        player.attackPower += aPModifer;
        displayStats(player); // updates player stats
        console.log("the player's health has been reduced to " + player.healthPoints);
        console.log("player's attack power has grown to: " + player.attackPower);
        gameOver(player);
        
    // if enemy HP = 0, hide and check if game over
    } else if (enemy.healthPoints <= 0) {
        enemySelected = false;
        $(enemy.htmlID).hide();
        deadEnemies.push(enemy.name);
        console.log("the dead enemies are: " + deadEnemies + ". pick a new enemy");
        $("#log").text("- The enemy died!"); // display death result    
        soundOfDeath(); // trigger death sound
        gameOver(player);

    // if player HP <= 0, end game
    }
}



// 5. game reset and gameOver functions

    // reset function moves players to waiting area, shows, and resets variables
function reset() {
        
    // trigger movement reset in (3.) and show all hidden players
    $("#player-1").appendTo("#waiting-1");
    $("#player-1").show();
    $("#player-2").appendTo("#waiting-2");
    $("#player-2").show();
    $("#player-3").appendTo("#waiting-3");
    $("#player-3").show();
    $("#player-4").appendTo("#waiting-4");
    $("#player-4").show();

    // reset images and names
    var arrayOfPlayers = [player1, player2, player3, player4];

    for(var i = 0; i < arrayOfPlayers.length; i++) {
        $(arrayOfPlayers[i].htmlImage).attr("src", arrayOfPlayers[i].imageIdle);
        $(arrayOfPlayers[i].htmlID + " > h3").text(arrayOfPlayers[i].name);
    }  

    // reset log box
    $("#log").text("- You started a new game. Select a character.");  

    // reset player stats & global variables in (1./2.)
    playerSelected = false;
    enemySelected = false;
    aPModifer = 0;
    deadEnemies = [];

    player1.healthPoints = 120;
    player1.attackPower = 9;

    player2.healthPoints = 100;
    player2.attackPower = 14;

    player3.healthPoints = 150;
    player3.attackPower = 7;

    player4.healthPoints = 180;
    player4.attackPower = 5;
}

    // game over conditional check. returns true/false for animation/sound triggers
function gameOver(player) {
    // check if all 3 enemies are dead
    if (player.healthPoints <= 0) {
        // check if player is dead
        $(player.htmlID).hide();
        soundOfLosing(); // game losing sound effect
        console.log("THE PLAYER HAS DIED. HIT RESET.");
        $("#log").append("<br>" + "- The player died. You lost."); // display Win message   
        return true;
    } else if (deadEnemies.length == 3) {
        // TODO log "the enemies are dead! Hit reset to play again."
        soundOfWinning(); // game winning sound effect
        console.log("THE ENEMIES ARE DEAD. HIT RESET.");
        $("#log").append("<br>" + "- YOU WON!"); // display Win message   
        return true;
    } else {
        return false;
    }
}



// 6. sound

    // character chosen sound
function soundOfChoice() {
    var audio;
    audio = new Audio('assets/audio/character-chosen.ogg');
    audio.volume = 0.15;
    audio.play();
}

    // player sound on attack (unique to each character)
function soundOfAttack(player) {
    var audio;
    switch (player) {
        case player1: audio = new Audio('assets/audio/knight-attack.ogg');
        break;
        case player2: audio = new Audio('assets/audio/dwarf-attack.ogg');
        break;
        case player3: audio = new Audio('assets/audio/sorcerer-attack.ogg');
        break;
        case player4: audio = new Audio('assets/audio/ghost-attack.ogg');
        break;
    }
    audio.volume = 0.1;
    audio.play();
}

    // death death sound
function soundOfDeath() {
    var audio;
    audio = new Audio('assets/audio/death.ogg');
    audio.volume = 0.2;
    audio.play();
}
    // game won sound, game loss sound
function soundOfWinning() {
    var audio;
    audio = new Audio('assets/audio/game-win.ogg');
    audio.volume = 0.3;
    audio.play();

}

function soundOfLosing() {
    var audio;
    audio = new Audio('assets/audio/game-loss.ogg');
    audio.volume = 0.3;
    audio.play();
}

// 7. animations and images
    // text stats update for each character
function displayStats(player) {
    $(player.htmlID + " > h3").text("HP: " + player.healthPoints + " | AP: " + player.attackPower);
}

function displayStatsEnemy(enemy) {
    $(enemy.htmlID + " > h3").text("HP: " + enemy.healthPoints + " | cAP: " + enemy.counterAttackPower);
}

    // text or image animation on attack

        // if player selected, replace with up image
function imageOfPlayer(player) {
    $(player.htmlImage).attr("src", player.imageIdle2);
}

        // play gif of player attack
function imageOfAttack(player) {
    if (player == playerIdentity) {
        $(player.htmlImage).attr("src", player.imageAttack2);
    } else if (player == enemyIdentity) {
        $(player.htmlImage).attr("src", player.imageAttack);
    } 
}
    // player/enemy death animation
    
    // win/loss animation (maybe display modal OR background change OR large text animation)
