module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
	  pkg: grunt.file.readJSON('package.json'),
    properties: grunt.file.readJSON('properties.json'),

    banner: '/*!\n' +
            ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
            ' */\n',

    /* clean directories */
    clean: ['<%= properties.dist %>'],

    /* compiling less */
    less: {
      css: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        src: '<%= properties.less %>/<%= pkg.name %>.less',
        dest: '<%= properties.dist %>/<%= pkg.name %>.css'
      },
      'css-min': {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        src: '<%= properties.less %>/<%= pkg.name %>.less',
        dest: '<%= properties.dist %>/<%= pkg.name %>.min.css'
      }
    },

    /* use banner */
    usebanner: {
      taskName: {
        options: {
          position: 'top',
          banner: '<%= banner %>',
          linebreak: true
        },
        files: {
          src: [
            '<%= properties.dist %>/<%= pkg.name %>.css',
            '<%= properties.dist %>/<%= pkg.name %>.min.css'
          ]
        }
      }
    },

    /* put files not handled in other tasks here */
    copy: {
      site: {
        files: [{
          expand: true,
          src: '<%= pkg.name %>.min.css',
          cwd: '<%= properties.dist %>',
          dest: '<%= properties.test %>/css'
        }]
      }
    },

    /* commit on gh-pages github */
    'gh-pages': {
      options: {
        base: '<%= properties.test %>',
        message: 'auto-generated commit'
      },
      src: ['**/*']
    }

	});

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

	// tasks
  grunt.registerTask('build', [
    'clean',
    'less',
    'usebanner',
    'copy'
  ]);

  grunt.registerTask('deploy', [
    'clean',
    'less',
    'usebanner',
    'copy',
    'gh-pages'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
