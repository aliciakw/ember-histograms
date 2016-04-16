import Ember from 'ember';

export default Ember.Component.extend({
  style: function () {
    var position = -80 * (this.position - 1);
    return Ember.String.htmlSafe('background-position: ' + position + 'px 0px;');
  }.property()
});
