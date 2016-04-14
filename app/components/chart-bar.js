import Ember from 'ember';

export default Ember.Component.extend({
  dims: function(){
    var chart_height = this.chart_height + 10,
        bar_height = this.value * chart_height / this.max ,
        margin_top = chart_height - bar_height,
        bar_width = this.bar_width;
    return Ember.String.htmlSafe("height:"+ bar_height +"px; "+ bar_width +" margin-top:"+ margin_top +"px;");
  }.property('value')
});
