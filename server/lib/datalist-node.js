
'use strict';


var fse = require('fs-extra'),
    path = require('path'),
    junk = require('junk'),
    globalconfig = require('meanio').loadConfig(),
    localconfig = require('../config/all.js'),
    pdftohtml = require('pdftohtmljs'),
    fse = require('fs-extra'),
    mongoose = require('mongoose');




function removeDuplicateFile(arr, target) {
    var array = [];
    var array2 = [];
    var rememberDupIndex = [];
    var fileExtension;
    var i = 0;
    var k = 0;
    var total = arr ? arr.length : 0;



    if (total > 1) {
        
        arr.filter(function(element){
            return element.toLowerCase();
        });

        for (i = 0; i < total; i+=1) {

            //OLD
            //array = arr[i].split(".");

            fileExtension = arr[i].substr((arr[i].lastIndexOf('.')));
            //fileName
            array[0] = arr[i].split(fileExtension)[0];
            //fileExtension
            array[1] = fileExtension;

            //has target(".html") extension? If so, remove this element
            if (array[1] === target) {
                //check if any duplicate file name? If so, remove ith element
                for (k = 0; k < total; k+=1) {
                    if (k !== i) {
                        //OLD
                        //array2 = arr[k].split(".");

                        fileExtension = arr[k].substr((arr[k].lastIndexOf('.')));
                        //fileName
                        array2[0] = arr[k].split(fileExtension)[0];
                        //fileExtension
                        array2[1] = fileExtension;

                        //console.log(array2[0].length+"   ??   "+array[0].length+"   >>"+ array2[0]+"   "+array[0] )

                        //duplicate file names?
                        if (array2[0] === array[0]) {
                            rememberDupIndex.push(i);
                        }
                    } else {
                        continue;
                    }
                } //


            } //
        }

        var final = [];
        var hasDup = false;
        for (i = 0; i < total; i+=1) {
            for (k = 0; k < total; k+=1) {
                if (i === rememberDupIndex[k]) {
                    hasDup = true;
                }
            }

            if (hasDup === false) final.push(arr[i]);
            hasDup = false; //reset
        }

        return final;
    } else
        return arr;


} //




function uploadFile(req, cb) {
    var file = req.files.file;
    var objid = mongoose.Types.ObjectId();
    file.objid = objid;
    file.extension = path.extname(file.name);

    var tmpfile = './' + file.path;
    var destdir = globalconfig.root + localconfig.uploaddir;
    var destfile = objid + file.extension;




    // https://www.npmjs.com/package/fs-extra

    // https://www.npmjs.com/package/spindrift
    
    fse.ensureDir(destdir, function(err) {
        if (err) return console.log(err); // => null 

        //Make sure the directory exists
        fse.copy(tmpfile, destdir + '/' + destfile, function(err) {
            if (err) return console.error(err);

            // Remove tmp file
            fse.remove('./' + file.path, function(err) {
                if (err) return console.error(err);

                // If file is PDF then let's create an HTML preview
                if (file.extension === '.pdf') {

                    var p = 0;

                    // Poll for exisiting file
                    var fileInterval = setInterval(function() {

                        console.log('checking for pdf...');

                        //Check existance of PDF in destination directory
                        fse.exists(destdir + '/' + destfile, function(exists) {
                            console.log(exists);
                            if (exists) {
                                // Clear Polling Interval
                                clearInterval(fileInterval);

                                console.log('PDF is located at: ' + destdir + '/' + destfile); // => null

                                // Start PDF Conversion process
                                var converter = new pdftohtml(destdir, destfile, objid + '.html', {});
                                converter.preset('sanitized_styling');

                                converter.success(function() {

                                    var files = localconfig.pdftohtmlfiles;
                                    var doRemove = function(file){
                                        fse.exists(destdir + '/' + file, function(exists) {
                                            if (exists) {
                                                fse.remove(destdir + '/' + file, function(err) {
                                                  if(err) console.error(err);

                                                  console.log('removed ' + file + '!');
                                                });
                                            }
                                        });
                                    };

                                    for(var i = 0; i < files.length; i+=1){
                                        doRemove(files[i]);
                                    }
                                    



                                    cb(file);
                                    console.log('pdf file upload success!');
                                });

                                converter.error(function(error) {
                                    console.log('conversion error: ' + error);
                                });

                                converter.progress(function(ret) {
                                    console.log((ret.current * 100.0) / ret.total + ' %');
                                });
                                converter.convert();
                            } else {
                                console.log('PDF not copied yet: ' + err); // => null
                                p = p + 1;

                                if (p === 15) {
                                    clearInterval(fileInterval);
                                    console.log('upload success but PDF can not be found. Cancelling HTML preview creation.'); // => null
                                    cb(file);
                                }
                            }
                        });
                    }, 100);
                } else {
                    cb(file);
                    console.log('file upload success!');
                }

            });
        });
    });
}


function processNode(_p, f) {
    var s = fse.statSync(path.join(_p, f));
    return {
        'id': path.join(_p, f),
        'text': f,
        'icon': s.isDirectory() ? 'jstree-custom-folder' : 'jstree-custom-file',
        'state': {
            'opened': false,
            'disabled': false,
            'selected': false
        },
        'li_attr': {
            'base': path.join(_p, f),
            'isLeaf': !s.isDirectory()
        },
        'children': s.isDirectory(),
        'contextmenu' : {
          items : { // Could be a function that should return an object like this one
              'create' : {
                  'separator_before'  : false,
                  'separator_after'   : true,
                  'label'             : 'Create',
                  'action'            : false,
                  'submenu' :{
                      'create_file' : {
                          'seperator_before' : false,
                          'seperator_after' : false,
                          'label' : 'File',
                          action : function (obj) {
                              this.create(obj, 'last', {'attr' : {'rel' : 'default'}});
                          }
                      },
                      'create_folder' : {
                          'seperator_before' : false,
                          'seperator_after' : false,
                          'label' : 'Folder',
                          action : function (obj) {                               
                              this.create(obj, 'last', {'attr' : { 'rel' : 'folder'}});
                          }
                      }
                  }
              }
          }
      }
    };
}

function processReq(_p, res) {
    var resp = [];
    fse.readdir(_p, function(err, list) {
      var l = removeDuplicateFile(list.filter(junk.not), '.html');
        for (var i = l.length - 1; i >= 0; i = i - 1) {
            resp.push(processNode(_p, l[i]));
        }
        res.json(resp);
    });
}


module.exports = {
    processReq : processReq,
    uploadFile : uploadFile

};