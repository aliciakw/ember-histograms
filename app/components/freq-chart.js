import Ember from 'ember';
import $ from "jquery";

export default Ember.Component.extend({
  data_scale: [],
  data_frequency: [],
  y_intervals: 5,
  x_intervals: 6,
  y_scale_max: 5,
  chart_height: 170,
  chart_width: 200,
  chart_body: function () {
    return Ember.String.htmlSafe('height:'+ (this.chart_height + 10) +'px; width:' + (this.chart_width + 30) + 'px;');
  }.property(),
  bar_width: function () {
    return Ember.String.htmlSafe('width:'+ ((this.chart_width) / this.x_intervals) +'px;');
  }.property(),
  y_scale_dims: function () {
    return Ember.String.htmlSafe('height:' + ((this.chart_height) / this.y_intervals) + 'px;');
  }.property(),
  frequency_scale: function () {
    var data = this.values,
        x_intervals = this.x_intervals,
        y_intervals = this.y_intervals,
        data_range = calc_range(data, x_intervals),
        data_scale = calc_scale(data_range.start, data_range.step, x_intervals, false),
        data_frequency = calc_frequency (data, data_range.start, data_range.step, x_intervals),
        freq_range = calc_range (data_frequency, y_intervals),
        freq_scale = calc_scale (freq_range.start, freq_range.step, y_intervals, true),
        freq_scale_max = (y_intervals * freq_range.step) + freq_range.start ;

    this.set('data_frequency', data_frequency);
    this.set('data_scale', data_scale);
    this.set('y_scale_max', freq_scale_max);
    return freq_scale;


    // helper functions
    function calc_frequency (data, start, step, x_intervals) {
      if (data.length) {
        var bins = new Array(x_intervals).fill(0);
        $(data).each(function(index, value){
          var bin = Math.ceil(value/step) - (start/step) - 1;
          bins[bin]++;
        });
        return bins;
      } else {
        return [];
      }
    }
    function calc_scale (start, step, intervals, reverse) {
      var scale = new Array(intervals);
      if(reverse) {
        $(scale).each(function(index){
          scale[index] = (step * (intervals - index)) + start;
        });
        scale.push(start);
      } else {
        $(scale).each(function(index){
          var unit = (step * (index + 1)) + start;
          scale[index] = unit;
        });
      }
      return scale;
    }
    function calc_range (data, intervals) {
      var min = data.length ? data[0] : 0,
          max = data.length ? data[0] : intervals;
      $(data).each(function(index, value){
        if (value < min) { min = value;
        } else if (value > max){ max = value;
        }
      });
      var scale_min = Math.floor(min/intervals) * intervals,
          scale_max = Math.ceil(max/intervals) * intervals,
          step = Math.ceil((scale_max - scale_min) / intervals);
      return { start: scale_min,
               step: step
             };
    }
  }.property('values')
});
