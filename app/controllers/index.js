import Ember from 'ember';

export default Ember.Controller.extend({
  values: Ember.computed.alias('model'),
  actions: {
    roll_the_dice: function () {
      var values = this.get('values'),
          roll = Math.ceil(6 * Math.random()) + Math.ceil(6 * Math.random());
      this.set('values', values.concat([roll]));
    }
  }
});
