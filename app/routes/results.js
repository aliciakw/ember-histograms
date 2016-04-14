import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [1,2,2,2,3,4,5,5,5,5,6];
  }
});
