
'use strict';


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


module.exports = {
    removeDuplicateFile: removeDuplicateFile

};