'use strict';

angular.module('mean.datalist').factory('DataListAceEditor', function() {

    window.define = window.ace.define;

    function create(_editor, mode, callback){
      window.ace.require('ace/ext/language_tools');

      _editor.setTheme('ace/theme/twilight');
      _editor.getSession().setMode('ace/mode/' + mode);

      _editor.getSession().on('change', callback);

      _editor.setOptions({
        showGutter: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
      });
    }


    // expose a public API
    return {
        create : create
    };
});