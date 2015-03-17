'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Datalist = new Module('datalist');
var libconfig = require('./libs.config');
var multipart = require('connect-multiparty');
var config = require('meanio').loadConfig();
var express = require('express');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Datalist.register(function(app, auth, database) {

  app.use(multipart({
    uploadDir: './tmp'
  }));



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
      falseAbs = {
        absolute: false,
        global: true
      },
      trueAbs = {
        absolute: true,
        global: true
      };

    for(i = 0; i<libcss.length;i += 1){
      regexp = /\.\.\/lib/gi;
      isAbs = !libcss[i].match(regexp);
      console.log('css: ' + libcss[i] + ' - ' + isAbs);
      Datalist.aggregateAsset('css', libcss[i], !isAbs ? falseAbs : trueAbs);
    }

    for(i = 0; i<libjs.length;i += 1){
      regexp = /\.\.\/lib/gi;
      isAbs = !libjs[i].match(regexp);
      console.log('js: ' + libjs[i] + ' - ' + isAbs);
      Datalist.aggregateAsset('js', libjs[i], !isAbs ? falseAbs : trueAbs);
    }

    Datalist.angularDependencies(libng);

    app.use('/packages/custom/datalist/public/assets', express.static(config.root + '/packages/custom/datalist/public/assets'));

  return Datalist;
});
