'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Datalist = new Module('datalist');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Datalist.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Datalist.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Datalist.menus.add({
    title: 'datalist example page',
    link: 'datalist example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Datalist.aggregateAsset('css', 'datalist.css');

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
