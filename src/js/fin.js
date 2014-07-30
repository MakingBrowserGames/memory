(function() {
  'use strict';

  function Fin() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Fin.prototype = {
    create: function () {
    },
    update : function() {
    }
  };

  window['memory'] = window['memory'] || {};
  window['memory'].Fin = Fin;
});
