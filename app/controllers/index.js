import Ember from 'ember';

export default Ember.Controller.extend({
  values: Ember.computed.alias('model'),
  dice: [7, 7],
  actions: {
    roll_the_dice: function (n) {
      var dice = new Array(n),
          values = this.get('values'),
          score = 0,
          roll;
      $(dice).each(function (index) {
        roll = Math.ceil(6 * Math.random());
        score += roll;
        dice[index] = roll;
      });
      this.set('dice', dice);
      this.set('values', values.concat([score]));
    }
  }
});
