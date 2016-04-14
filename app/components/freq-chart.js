import Ember from 'ember';

export default Ember.Component.extend({
  data_scale: [],
  data_frequency: [],
  y_intervals: 5,
  x_intervals: 5,
  y_scale_max: 0,
  chart_height: 170,
  chart_width: 200,
  chart_body: function () {
    return Ember.String.htmlSafe('height:'+ (this.chart_height + 10) +'px; width:' + (this.chart_width + 30) + 'px;')
  }.property(),
  bar_width: function () {
    return Ember.String.htmlSafe('width:'+ ((this.chart_width) / this.x_intervals) +'px;');
  }.property(),
  y_scale_dims: function () {
    return Ember.String.htmlSafe('height:' + ((this.chart_height) / this.y_intervals) + 'px;');
  }.property(),
  frequency_scale: function () {
    var x_range = calc_range(this.values, this.x_intervals),
        intervals = this.x_intervals,
        y_intervals = this.y_intervals;

    this.set('data_scale', calc_scale (x_range, intervals, false));

    var data_frequency = calc_frequency (this.values, x_range, intervals);
    this.set('data_frequency', data_frequency);

    var y_range = calc_range (data_frequency, y_intervals),
        y_scale = calc_scale (y_range, y_intervals, true);
    this.set('y_scale_max', y_range[1]);
    return y_scale;


    // helper functions
    function calc_frequency (data, x_range, x_intervals) {
      var bins = new Array(x_intervals).fill(0),
          bin_size = x_range[2];
      for (var i = 0; i < data.length; i++) {
        var bin = Math.ceil(data[i]/bin_size) - 1;
        bins[bin]++;
      }
      return bins;
    }
    function calc_scale (range, intervals, reverse) {
      var scale = new Array(intervals + 1),
          min = range[0],
          max = range[1],
          step = range[2];
      if(reverse) {
        for (var i = intervals; i >= 0; i--) {
          scale[i] =  (step * (intervals - i)) + min ;
        }
      } else {
        for (var i = 0; i < intervals; i++) {
          scale[i] =  (step * (i+1)) + min ;
        }
      }
      return scale;
    }
    function calc_range (data, intervals) {
      var range = calc_extremes(data);
      var scale_min = Math.floor(range[0]/intervals); // default 0
      var size = range[1] - scale_min;
      var step = Math.ceil(size/intervals); // default x-intervals
      var scale_max = scale_min + (step * intervals);
      return [scale_min, scale_max, step];
    }
    function calc_extremes (data) {
      var min = data[0],
          max = data[1];
      for (var i = 0; i < data.length; i++ ){
        var value = data[i];
        if ( value > max ) {
          max = value;
        } else if (value < min ) {
          min = value;
        }
      }
      return [min, max];
    }
  }.property()
});
