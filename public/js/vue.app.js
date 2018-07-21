new Vue({
  el: '#myapp',
  data: {
    playerHealth: 100,
    canHeal: false,
    canSuper: false,
    mana: 0,
    playerImg: 'hero0.jpg',
    dragonHealth: 100,
    dragonImg: 'dragon1.jpg',
    gameIsStarted: false,
    turns: [],
    result: ''
  },
  methods: {
    startGame: function() {
      this.gameIsStarted = true;
      this.playerHealth = 100;
      this.dragonHealth = 100;
      this.mana = 0;
      this.canHeal = false;
      this.canSuper = false;
      this.turns = [];
      this.result = '';
    },
    attack: function() {
      var min = 3;
      var max = 10;
      var that = this;
      this.playerImg = 'hero1.jpg';
      var damage = this.damage(min, max);
      this.dragonHealth -= damage;
      this.turns.unshift({
        class: 'info',
        message: '<b>Наруто атакует!</b> Нанёс ' + damage + ' урона',
      });
      if (this.dragonHealth < 0) {
        this.dragonHealth = 0;
        this.turns.unshift({
          class: 'warning',
          message: '<b>Дракон повержен! Ура!</b>',
        });
        this.result = 'Вы выиграли!';
        this.gameIsStarted = false;
      }

      setTimeout(function() {
        that.playerImg = 'hero0.jpg';
        if (that.dragonHealth === 0) return;
        setTimeout(that.monsterAttack, 200);
      }, 500);
    },
    heal: function() {
      if (this.mana < 3) return;
      var min = 15;
      var max = 25;
      var that = this;
      this.mana -= 3;
      this.playerImg = 'hero2.jpg';
      var heal = this.damage(min, max);
      this.playerHealth += heal;
      this.turns.unshift({
        class: 'success',
        message: '<b>Наруто полечился!</b> Исцелено ' + heal + ' жизней',
      });
      if (this.playerHealth > 100) this.playerHealth = 100;
      setTimeout(function() {
        that.playerImg = 'hero0.jpg';
        setTimeout(that.monsterAttack, 200);
      }, 500);
    },
    rasengan: function() {
      if (this.mana < 4) return;
      this.mana = 0;
      var min = 10;
      var max = 22;
      var that = this;
      this.playerImg = 'hero3.jpg';
      var damage = this.damage(min, max);
      this.dragonHealth -= damage;
      this.turns.unshift({
        class: 'info',
        message: '<b>Расенган!</b> ' + damage + ' урона дракону!',
      });
      if (this.dragonHealth < 0) {
        this.dragonHealth = 0;
        this.turns.unshift({
          class: 'warning',
          message: '<b>Дракон повержен! Ура!</b>',
        });
        this.result = 'Вы выиграли!';
        this.gameIsStarted = false;
      }

      setTimeout(function() {
        that.playerImg = 'hero0.jpg';
        if (that.dragonHealth === 0) return;
        setTimeout(that.monsterAttack, 200);
      }, 500);
    },
    surrender: function() {
      var sur = confirm("Наруто бы никогда не сдался! А вы что, сдадитесь?");
      if (sur) {
        this.turns.unshift({
          class: 'dark',
          message: 'Вы успешно <b>сбежали!</b>',
        });
        this.result = 'Наруто убегает от дракона со словами "Я забыл достать одежду из стиралки!"';
        this.gameIsStarted = false;
      }
    },
    damage: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    monsterAttack: function() {
      var min = 5;
      var max = 15;
      var that = this;
      this.dragonImg = 'dragon2.jpg';
      var damage = this.damage(min, max);
      this.playerHealth -= damage;
      this.turns.unshift({
        class: 'danger',
        message: '<b>Дракон кусает</b> Наруто. Минус ' +damage+ ' жизней',
      });
      if (this.playerHealth < 0) {
        this.playerHealth = 0;
        this.turns.unshift({
          class: 'dark',
          message: '<b>Поражение...</b>',
        });
        this.result = 'Дракон сожрал Наруто...';
        this.gameIsStarted = false;
      }
      setTimeout(function() {
        that.dragonImg = 'dragon1.jpg';
      }, 500);
    }
  },
  watch: {
    playerHealth: function (val) {
      if (this.mana < 4) this.mana += 1;
    },
    mana: function(val) {
      if (val > 2) this.canHeal = true;
      else this.canHeal = false;
      if (val > 3) this.canSuper = true;
      else this.canSuper = false;
    }
  }
});
