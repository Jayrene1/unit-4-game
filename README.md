# unit-4-game
A JS/jQuery game where users choose a character and attack other characters

## Coding with vanilla Javascript
This is a single-page web game that uses bootstrap, JavaScript, and jQuery. I used click events to control the game's logic. The game involves two character's affecting each other's health points with their respective attack statistics. The player's attack grows with each round of attack. The game can be won with any character, but requires the correct enemy to be selected. Otherwise, the player's attack will not grow quickly enough and they will die.

## Features
* user clicks their character choices and receives updating stats and audio feedback
* character sprites play gifs on attack
* character's stats and meta information contained in objects
* audio effects for character choice, attacks (unique to each character), wins, and losses

## Ideas for improvements
* create a mobile-friendly game with a more compact game layout
* border/background color effects on character choice and win/loss
* incorporate text animations using animate.css (https://daneden.github.io/animate.css/)
* better audio timing with visual using setTimeout method
