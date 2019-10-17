# Exercise1
---
### Health bar

- Add playerHealth and monsterHealth to data
  ```
  data: {
    playerHealth: 100,
    monsterHealth: 100
  }
  ```
- Add game is running to check if the game is running
  ```
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    // add gameIsRunning: false
    gameIsRunning: false
  }
  ```
- Display health
  ```
  <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;">
    {{ playerHealth }}
  </div>
  ```
  ```
  <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;">
    {{ monsterHealth }}
  </div>
  ```
- Adjust health bar width
  ```
  <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width: playerHealth + '%'}">
  ```
  ```
  <div class="healthbar text-center" style="background-color: green; margin: 0; color: white;" :style="{width: monsterHealth + '%'}">
  ```

### Editing the action layout
  - Add ```v-if``` to 'START NEW GAME' section
    ```
    // add v-if
    <section class="row controls" v-if="!gameIsRunning">
        <div class="small-12 columns">
            <button id="start-game">START NEW GAME</button>
        </div>
    </section>
    ```
  - Add ```v-else``` to 'SPECIAL ATTACK' section
    ```
    // add v-else
    <section class="row controls" v-else>
        <div class="small-12 columns">
            <button id="attack">ATTACK</button>
            <button id="special-attack">SPECIAL ATTACK</button>
            <button id="heal">HEAL</button>
            <button id="give-up">GIVE UP</button>
        </div>
    </section>
    ```

### Implement start game method
  - Add event listener binding click to listen to button click
    ```
    <button id="start-game" @click='startGame'>START NEW GAME</button>
    ```
  - Add method: startGame
    ```
    methods: {
      startGame() {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
      }
    }
    ```

### implement actions methods
  - Add event listener to 'attack' button
    ```
    <button id="attack" @click="attack">ATTACK</button>
    ```
  - Add event listener to 'special attack' button
    ```
    <button id="special-attack" @click="specialAttack">SPECIAL ATTACK</button>
    ```
  - Add event listener to 'heal' button
    ```
    <button id="heal" @click="heal">HEAL</button>
    ```
  - Add event listener to 'give up' button
    ```
    <button id="give-up" @click="giveUp">GIVE UP</button>
    ```

  - Add all the actions methods and to attack first
    ```
    attack() {
      const playerMax = 10;
      const playerMin = 3;
      const playerDamage = Math.max(Math.floor(Math.random() * playerMax) + 1, playerMin);
      this.monsterHealth -= playerDamage;

      const monsterMax = 12;
      const monsterMin = 5;
      const monsterDamage = Math.max(Math.floor(Math.random() * monsterMax) + 1, monsterMin);
      this.playerHealth -= monsterDamage;
    },
    specialAttack() {

    },
    heal() {

    },
    giveUp() {

    }
    ```
  - Check game over condition
    ```
    attack() {
      const playerMax = 10;
      const playerMin = 3;
      const playerDamage = Math.max(Math.floor(Math.random() * playerMax) + 1, playerMin);
      this.monsterHealth -= playerDamage;

      if (this.monsterHealth <= 0) {
        alert('You won!');
        this.gameIsRunning = false;
        return;
      }

      const monsterMax = 12;
      const monsterMin = 5;
      const monsterDamage = Math.max(Math.floor(Math.random() * monsterMax) + 1, monsterMin);
      this.playerHealth -= monsterDamage;

      if (this.playerHealth <= 0) {
        alert('You lost!');
        this.gameIsRunning = false;
      }
    }
    ```
### Refactor the code!!
  - create calculate damage function
    ```
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    }
    ```
  - Add the calculate damage function to monster and player damage
    ```
    attack() {
        this.monsterHealth -= this.calculateDamage(3, 10);

        if (this.monsterHealth <= 0) {
          alert('You won!');
          this.gameIsRunning = false;
          return;
        }

        this.playerHealth -= this.calculateDamage(5, 12);

        if (this.playerHealth <= 0) {
          alert('You lost!');
          this.gameIsRunning = false;
        }
      }
    ```
  - create a function to check game win
    ```
    attack() {
      this.monsterHealth -= this.calculateDamage(3, 10);
      
      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamage(5, 12);

      this.checkWin();
    }
    ```
    ```
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
    ```

### Implement 'special attack' method
  - Copy code from attack to special attack and increase the damage
    ```
    specialAttack() {
      this.monsterHealth -= this.calculateDamage(10, 20);
      
      if (this.checkWin()) {
        return;
      }

      this.playerHealth -= this.calculateDamage(5, 12);

      this.checkWin();
    }
    ```
  - Too many duplicate code, so lets refactor again.
  - first we look at the monster attack which is the same everywhere.
  - Create monster attack method
    ```
    monsterAttack() {
      this.playerHealth -= this.calculateDamage(5, 12);
      this.checkWin();
    }
    ```
    ```
    attack() {
      this.monsterHealth -= this.calculateDamage(3, 10);
      
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack() {
      this.monsterHealth -= this.calculateDamage(10, 20);
      
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    }
    ```
### Implement 'Healing'
  - Heal of a fixed number
    ```
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.monsterAttack();
    })
    ```
### Finishing the action buttons
  - Implement give up method
    ```
    giveUp() {
      this.gameIsRunning = false;
    }
    ```
### Implement the action log 
  - Add new property 'turns'
    ```
    data: {
      playerHealth: 100,
      monsterHealth: 100,
      gameIsRunning: false,
      // add turns to data proplerty
      turns: []
    }
    ```
  - Push the logs into the turn array
    ```
    attack() {
      const damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;

      // create and push the logs into the 'turns' array
      this.turns.unshift({
        player: true,
        text: 'Player hits monster for ' + damage
      })

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    ```
  - Add it in the monster attack method
    ```
    monsterAttack() {
      const damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();

      // create and push the logs into the 'turns' array
      this.turns.unshift({
        player: false,
        text: 'Monster hits player for ' + damage
      })
    }
    ```
  - Add ```v-for``` to print the logs
    ```
    // add v-if
    <section class="row log" v-if="turns.length > 0">
        <div class="small-12 columns">
            <ul>
                <li v-for="turn in turns">
                  {{ turn.text }}
                </li>
            </ul>
        </div>
    </section>
    ```
  - Add the logs code to special attack
    ```
    specialAttack() {
      const damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;

      // create and push the logs into the 'turns' array
      this.turns.unshift({
        player: true,
        text: 'Player hits monster HARD for ' + damage
      })
      
      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    }
    ```
  - Add logs into healing
    ```
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      // add logs
      this.turns.unshift({
        player: true,
        text: 'Player heals for 10 health'
      })

      this.monsterAttack();
    })
    ```
  - Resets turns array when new game starts
    ```
    startGame() {
        this.gameIsRunning = true;
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.turns = [];
      }
    ``` 
### styling the log
  - CSS has been done so just need to do the html and javascript
  - Bind to class
    ```
    <ul>
        <li v-for="turn in turns"
          :class="{'player-turn': turn.isPlayer, 'monster-turn': !turn.isPlayer}">
          {{ turn.text }}
        </li>
    </ul>
    ```
## Done! Break!
