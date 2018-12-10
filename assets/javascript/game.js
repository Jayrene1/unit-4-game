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
    name: "player1",
    htmlID: "#player-1",
    image: "#",
    healthPoints: 75,
    attackPower: 12,
    counterAttackPower: 10,
    valueOf() {
        return this.attackPower;
    }
}
    
    //player 2
var player2 = {
    name: "player2",
    htmlID: "#player-2",
    image: "#",
    healthPoints: 90,
    attackPower: 10,
    counterAttackPower: 9,
    valueOf() {
        return this.attackPower;
    }
}

    // player 3
var player3 = {
    name: "player3",
    htmlID: "#player-3",
    image: "#",
    healthPoints: 115,
    attackPower: 8,
    counterAttackPower: 8,
    valueOf() {
        return this.attackPower;
    }
}

    //player 4
var player4 = {
    name: "player4",
    htmlID: "#player-4",
    image: "#",
    healthPoints: 130,
    attackPower: 6,
    counterAttackPower: 7,
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
        console.log("player identity: " + htmlID); 
        
        // assign attack power modifier to selected player, used in calculateDamage()
        aPModifer = characterObject.valueOf();

    // if enemy clicked, move to enemy area
    // TODO change border color
    } else if (enemySelected === false) {
        $(htmlID).appendTo("#enemy-area");
        enemySelected = true;
        enemyIdentity = characterObject;
        console.log("enemy identity:" + htmlID);
    }
}



// 4. attack logic

    //When attack button is clicked, run calculateDamage()
function onAttack() {
    // attack clicked while no enemy chosen, show error message
    if (enemySelected === false) {
        console.log("error, can't attack until an enemy is selected");
        // TODO send error to log section
    } else { 
        console.log("calculating damage...");
        calculateDamage(playerIdentity, enemyIdentity);
    }
}

    // compute attacks and attempt to end the game
function calculateDamage(player, enemy) {           
    console.log("attack modifier set to: " + aPModifer);
        
    // player attack
    enemy.healthPoints -= player.attackPower;
    console.log("the enemy's health has been reduced to " + enemy.healthPoints);
        
    // enemy attack (no damage on winning round)
    if (enemy.healthPoints > 0 && player.healthPoints > 0) {
        player.healthPoints -= enemy.attackPower;
        console.log("the player's health has been reduced to " + player.healthPoints);
        player.attackPower += aPModifer;
        console.log("player's attack power has grown to: " + player.attackPower);

    // if enemy HP = 0, hide and check if game over
    } else if (enemy.healthPoints <= 0) {
        enemySelected = false;
        $(enemy.htmlID).hide();
        deadEnemies.push(enemy.name);
        console.log("the dead enemies are: " + deadEnemies + ". pick a new enemy");
        gameOver(player);

    // if player HP <= 0, end game
    } else if (player.healthPoints <= 0) {
        $(player.htmlID).hide();
        gameOver(player);
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

    // reset player stats & global variables in (1./2.)
    playerSelected = false;
    enemySelected = false;
    aPModifer = 0;
    deadEnemies = [];

    player1.healthPoints = 75;
    player1.attackPower = 12;
    player1.counterAttackPower = 10;

    player2.healthPoints = 90;
    player2.attackPower = 10;
    player2.counterAttackPower = 9;

    player3.healthPoints = 115;
    player3.attackPower = 8;
    player3.counterAttackPower = 8;

    player4.healthPoints = 130;
    player4.attackPower = 6;
    player4.counterAttackPower = 7;
}

    // game over conditional check. returns true/false for animation/sound triggers
function gameOver(player) {
    // check if all 3 enemies are dead
    if (deadEnemies.length == 3) {
        // TODO log "the enemies are dead! Hit reset to play again."

        console.log("THE ENEMIES ARE DEAD. HIT RESET.");
        return true;
    }
    
    // check if player is dead
    else if (player.healthPoints <= 0) {
        // TODO log "the player has died. Hit reset to play again."
        
        console.log("THE PLAYER HAS DIED. HIT RESET.");
        return true;
    } else {
        return false;
    }
}



// 6. sound

    // player chosen sound, enemy chosen sound

    // player sound on attack (unique to each character)

    // player death sound

    // enemy death sound

    // game won sound, game loss sound




// 7. animations

    // text or image animation on attack

    // player/enemy death animation

    // win/loss animation (maybe display modal OR background change OR large text animation)