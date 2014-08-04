/*
 * grunt-requirejs-md5
 * https://github.com/GilbertSun/grunt-requirejs-md5
 *
 * Copyright (c) 2014 GilbertSun
 * Licensed under the MIT license.
 */

'use strict';

var crypto = require('crypto');
var path = require('path');

module.exports = function(grunt) {

  var md5 = function (filepath, encoding) {
    var hash = crypto.createHash('md5');
    grunt.log.verbose.write('Hashing ' + filepath + '...');
    hash.update(grunt.file.read(filepath));
    return hash.digest(encoding);
  };


  grunt.registerMultiTask('requirejs_md5', 'use md5 to process requirejs config file', function() {
    var options = this.options({
      out: 'dist',
      length: 8,
      mapFile: 'md5.json'
    });

    this.files.forEach(function (filePair) {
      var md5Map = {};
      filePair.src.forEach(function (f) {
        if (!grunt.file.exists(f)) {
          grunt.log.warn('Source file "' + f + '" not found.');
          return;
        }
        var md5String = md5(f, 'hex');
        var prefix = md5String.slice(0, options.length);
        var outFile = path.resolve(path.dirname(f), options.out, [prefix, path.basename(f)].join('.'));
        grunt.file.copy(f, outFile);
        md5Map[f] = path.relative(path.dirname(f), outFile);
      });
      grunt.file.write(options.mapFile, JSON.stringify(md5Map, null, '  '));
    });
  });
};
