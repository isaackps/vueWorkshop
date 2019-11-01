new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack() {
      const playerDamage = this.calculateDamage(3, 10);
      this.monsterHealth -= playerDamage;

      this.turns.unshift({
        player: true,
        text: 'Player hits monster for ' + playerDamage
      })

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack() {
      const specialDamage = this.calculateDamage(10, 20);
      this.monsterHealth -= specialDamage;

      this.turns.unshift({
        player: true,
        text: 'Player hits monster for ' + specialDamage
      })

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      this.turns.unshift({
        player: true,
        text: 'Player heals for 10 health'
      })

      this.monsterAttack();
    },
    giveUp() {
      this.gameIsRunning = false;
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Win! New Game?')) {
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
    },
    monsterAttack() {
      const monsterDamage = this.calculateDamage(5, 12);
      this.playerHealth -= monsterDamage;

      this.turns.unshift({
        player: false,
        text: 'Monster hits player for ' + monsterDamage
      })

      this.checkWin();
    }
  }
});