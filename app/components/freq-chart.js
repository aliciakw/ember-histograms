import Ember from 'ember';

export default Ember.Component.extend({
  y_scale: [' ', ' ', ' ', ' ', ' ', 0],
  x_scale: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  y_intervals: 5,
  x_intervals: 5,
  data_frequency: [],
  sum: function () {
    return this.values.reduce(function (a,b) {
      return a + b;
    });
  }.property(),
  frequency: function () {
    var x_intervals = this.x_intervals,
        y_intervals = this.y_intervals;
    var x_range = calc_range (this.values, x_intervals),
        data_frequency = calc_frequency (this.values, x_range, x_intervals),
        y_range = calc_range (data_frequency, y_intervals);

    console.log(x_range);
    console.log(data_frequency);
    console.log(y_range);

    return this.values;



    function calc_range (data, intervals) { // fix later to handle neg numbers
      var range = calc_extremes(data);
      var scale_min = Math.floor(range[0]/intervals); // default 0
      var size = range[1] - scale_min;
      var step = Math.ceil(size/intervals); // default x-intervals
      var scale_max = scale_min + (step * intervals);
      return [scale_min, scale_max, step];
    }
    function calc_frequency (data, x_range, x_intervals) {
      var bins = new Array(x_intervals).fill(0),
          bin_size = x_range[2];
      for (var i = 0; i < data.length; i++) {
        var bin = Math.ceil(data[i]/bin_size) - 1;
        bins[bin]++;
      }
      return bins;
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

  // frequency: function () {
  //   var _this = this;
  //   var data = this.values;
  //   var x_range = calc_range(data);
  //   var x_step = calc_step(x_range, this.x_intervals);
  //   var x_scale = get_x_scale(x_step, this.x_intervals);
  //   if(x_scale) { this.set('x_scale', x_scale); }
  //   var data_frequency = plot_frequency (data, this.x_intervals, this.y_intervals);
  //   console.log(data_frequency);
  //
  //
  //
  //
  //
  //
  //   function plot_frequency (data, x_intervals, y_intervals) {
  //     var bins = new Array(x_intervals).fill(0);
      // var bin_size = Math.ceil(data[1] - data[0]/x_intervals);
      // for (var i = 0; i < data.length; i++) {
      //   var bin = Math.ceil(data[i]/bin_size) - 1;
      //   bins[bin]++;
      // }
  //
  //     var y_range = calc_range(bins);
  //     var y_scale = new Array(y_intervals + 1);
  //     y_scale[y_intervals] = 0; // lowest frequency is 0
  //     for (var i = 0; i < y_intervals.length; i ++) {
  //       console.log('** ' + (i * y_step));
  //       y_scale[y_intervals - i] = i * y_step;
  //     }
  //
  //     return bins;
  //   }
  //   //set x_scale values
  //   function get_x_scale (x_step, intervals) {
  //     x_scale = new Array(intervals);
  //     for (var i = 1; i <= intervals; i++) {
  //       x_scale[i] = i * x_step;
  //     }
  //     return x_scale;
  //   }
  //   //set y_scale values
  //   function get_y_scale (y_step, intervals, data_frequency) {
  //     var y_scale = new Array(intervals + 1).fill(0);
  //     for (var i = intervals; i >= 0; i--) {
  //       y_scale[i] = y_step * i;
  //     }
  //     return y_scale;
  //   }
  //
  //
  //
  //
  //
  //
  //
  //   //
  //   function calc_range (array) {
  //     array.sort();
  //     return [array[0], array[array.length-1]];
  //   }
  //   function calc_step (range,intervals) {
  //     var scale_min = Math.floor(range[0]/intervals);
  //     var step = Math.ceil((range[1] - scale_min) / intervals);
  //     return step;
  //   }
  //   //
  //   //
  //   return this.values;
  // }.property()

});
