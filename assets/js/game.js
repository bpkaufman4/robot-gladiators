var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
}


var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  }
};

var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
]


// fight function (now with parameter for enemy's name)
var fight = function(enemyInfo) {
  console.log(enemyInfo);
  while (playerInfo.health > 0 && enemyInfo.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");


      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    if (promptFight === "fight" || promptFight === "FIGHT") {

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

    enemyInfo.health = Math.max(0, enemyInfo.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemyInfo.name + '. ' + enemyInfo.name + ' now has ' + enemyInfo.health + ' health remaining.'
    );

    // check enemy's health
    if (enemyInfo.health <= 0) {
      window.alert(enemyInfo.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyInfo.name + ' still has ' + enemyInfo.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyInfo.attack variable
    var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemyInfo.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
  else {
    alert("Please enter a valid answer");
  }
  }
};
var startGame = function() {
    enemyInfo.health = randomNumber(40, 60);
    // reset player stats
    playerInfo.reset();

    // fight each enemy-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
        // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

        // pick new enemy to fight based on the index of the enemyInfo.names array
        var pickedEnemyObj = enemyInfo[i];

        // reset enemy.health before starting new fight
        pickedEnemyObj.health = randomNumber(40, 60);

        // use debugger to pause script from running and check what's going on at that moment in the code
        // debugger;

        // pass the pickedenemyInfo.name variable's value into the fight function, where it will assume the value of the enemyInfo.name parameter
        fight(pickedEnemyObj);
    }

    // if we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
      //ask if player wants to use the store before moving on
      var storeConfirm = window.confirm("The fight is over, would you like to visit the store before the next round?");

      //if yes take them to the store function
      if (storeConfirm) {
        shop();
      }
    }
    // if player isn't alive, stop the game
    else {
        break;
    }
    }
    endGame();
};    

var endGame = function() {
    // if player is still alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! you now have a score of " + playerInfo.money + ".")
    }
    else {
        window.alert("You've lost your robot in battle.")
    }

    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
}

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
      case "REFILL":
      case "refill":
        if (playerInfo.money >= 7) {
          window.alert("Refilling player's health by 20 for 7 dollars.");

          //increase health and decrease money
          playerInfo.health = playerInfo.health + 20;
          playerInfo.money = playerInfo.money - 7;
          window.alert("You now have " + playerInfo.money + " dollars left.")
        }
        else {
          window.alert("You don't have enough money!");
        }

        break;
      case "UPGRADE":
      case "upgrade":
        if (playerInfo.money >= 7) {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");

          // increase attack and devrease money
          playerInfo.attack = playerInfo.attack + 6;
          playerInfo.money = playerInfo.money - 7;
          window.alert("You now have " + playerInfo.money + " dollars left.")
        }
        else {
          window.alert("You don't have enough money!")
        }
      case "LEAVE":
      case "leave":
        window.alert("Leaving the store.")
      // do nothing so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again")

      // call shop() again to force player to pick a valid option
      shop();
      break;
    }
};

startGame();
