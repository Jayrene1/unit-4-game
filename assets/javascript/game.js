// 1. global variable declaration (track game state)
var playerSelected = false;
var enemySelected = false;
    //enemy and player var set to number

// 2. game objects (player characters)

    // player 1
var player1 = {
    name: "player1",
    image: "#",
    healthPoints: 75,
    attackPower: 12,
    counterAttackPower: 10,
    player: false,
    enemy: false
}
    
    //player 2
var player2 = {
    name: "player2",
    image: "#",
    healthPoints: 90,
    attackPower: 10,
    counterAttackPower: 9,
    player: false,
    enemy: false
}

    // player 3
var player3 = {
    name: "player3",
    image: "#",
    healthPoints: 115,
    attackPower: 8,
    counterAttackPower: 8,
    player: false,
    enemy: false
}

    //player 4
var player4 = {
    name: "player4",
    image: "#",
    healthPoints: 130,
    attackPower: 6,
    counterAttackPower: 7,
    player: false,
    enemy: false
}

// 3. jQuery element moving logic

    // if player clicked, moves to player area
        //change border color
    $("#waiting-1").on("click", function() {
        appendPlayer("#player-1", player1);
    });
    
    $("#waiting-2").on("click", function() {
        appendPlayer("#player-2", player2);
    });
    
    $("#waiting-3").on("click", function() {
        appendPlayer("#player-3", player3);
    });
    
    $("#waiting-4").on("click", function() {
        appendPlayer("#player-4", player4);
    });

function appendPlayer(selection, playerObject) {
    if (playerSelected === false) {
        $(selection).appendTo("#player-area");
        playerSelected = true;
        playerObject.player = true;
    } else if (enemySelected === false) {
        $(selection).appendTo("#enemy-area");
        enemySelected = true;
        playerObject.enemy = true;
    }
}
    // if enemy clicked, move to enemy area
        //change border color

    // if enemy dead, remove and log

    // if game over, move to waiting area


// 4. attack logic
function onAttack() {
    var tempPlayer;
    var tempEnemy;
    // attack clicked while no enemy chosen, show error message
    if (player1.player === true) {tempPlayer = player1};
    if (player1.enemy === true) {tempEnemy = player1};

    if (player2.player === true) {tempPlayer = player2};
    if (player2.enemy === true) {tempEnemy = player2};

    if (player3.player === true) {tempPlayer = player3};
    if (player3.enemy === true) {tempEnemy = player3};

    if (player4.player === true) {tempPlayer = player4};
    if (player4.enemy === true) {tempEnemy = player4};

    // compute comparison attack points, counter attack power, health points

        // player vs. enemy

        // enemy vs. player (no damage on winning round)

        // if enemy defeated, enemySelected = false

    // triggers game ending if player HP = 0 OR all enemies dead
}
// 5. game ending/reset (on-click)
function reset() {

    // celebrate game ending
        
    // trigger movement reset in (3.)
    $("#player-1").appendTo("#waiting-1");
    $("#player-2").appendTo("#waiting-2");
    $("#player-3").appendTo("#waiting-3");
    $("#player-4").appendTo("#waiting-4");
   
    // reset player stats & global variables in (1./2.)
    playerSelected = false;
    enemySelected = false;

    player1.healthPoints = 75;
    player1.attackPower = 12;
    player1.counterAttackPower = 10;
    player1.player = false;
    player1.enemy = false;

    player2.healthPoints = 90;
    player2.attackPower = 10;
    player2.counterAttackPower = 9;
    player2.player = false;
    player2.enemy = false;

    player3.healthPoints = 115;
    player3.attackPower = 8;
    player3.counterAttackPower = 8;
    player3.player = false;
    player3.enemy = false;

    player4.healthPoints = 130;
    player4.attackPower = 6;
    player4.counterAttackPower = 7;
    player4.player = false;
    player4.enemy = false;
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