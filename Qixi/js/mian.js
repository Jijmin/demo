/**
 * Created by Administrator on 2016/10/16.
 */
require.config({
  paths: {
    jquery: 'jquery.min',
    transit:'jquery.transit',
    swipe:'Swipe',
    walk:'walk',
    pageB:'pageB',
    pageC:'pageC',
    all_steps:'all_steps'

  }
});

require(['jquery', 'transit', 'swipe', 'walk', 'pageB', 'pageC', 'all_steps'], function($) {
  console.log($().jquery);
});