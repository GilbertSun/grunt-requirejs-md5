/*
 * grunt-requirejs-md5
 * https://github.com/GilbertSun/grunt-requirejs-md5
 *
 * Copyright (c) 2014 GilbertSun
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var crypto = require('crypto');

module.exports = function(grunt) {

  var md5 = function (filepath, algorithm, encoding, fileEncoding) {
    var hash = crypto.createHash(algorithm);
    grunt.log.verbose.write('Hashing ' + filepath + '...');
    hash.update(grunt.file.read(filepath), fileEncoding);
    return hash.digest(encoding);
  };


  grunt.registerMultiTask('requirejs_md5', 'use md5 to process requirejs config file', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    this.files.forEach(function (f) {
      f.src.forEach(function (filepath) {
        if (grunt.file.exists(filepath)) {
          console.log(md5(filepath, 'md5', 'hex', 'urf8'));
        }
      })
    });
    /*// Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });*/
  });

};
