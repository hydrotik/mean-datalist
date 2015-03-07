'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Datalist = new Module('datalist');

var libconfig = require('./libs.config');



/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Datalist.register(function(app, auth, database) {




  //We enable routing. By default the Package Object is passed to the routes
  Datalist.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Datalist.menus.add({
    'roles': ['authenticated'],
    'title': 'Data Items',
    'link': 'datalist',
    'menu': 'main'
  });
  Datalist.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Data Item',
    'link': 'create item',
    'menu': 'main'
  });

  Datalist.aggregateAsset('css', 'datalist.css');


  var libcss = libconfig.core.css,
      libjs = libconfig.core.js,
      libng = libconfig.core.ng,
      i, isAbs, regexp,
      notAbs = {
        absolute: false,
        global: true
      };

    for(i = 0; i<libcss.length;i += 1){
      regexp = /\.\.\/lib/gi;
      isAbs = !libcss[i].match(regexp);
      console.log('css: ' + libcss[i] + ' - ' + isAbs);
      Datalist.aggregateAsset('css', libcss[i], !isAbs ? notAbs : {});
    }

    for(i = 0; i<libjs.length;i += 1){
      regexp = /\.\.\/lib/gi;
      isAbs = !libjs[i].match(regexp);
      console.log('js: ' + libjs[i] + ' - ' + isAbs);
      Datalist.aggregateAsset('js', libjs[i], !isAbs ? notAbs : {});
    }

    Datalist.angularDependencies(libng);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Datalist.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Datalist.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Datalist.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Datalist;
});
