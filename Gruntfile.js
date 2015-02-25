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
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "<%= properties.dist %>/<%= pkg.name %>.css": "<%= pkg.name %>.less",
          "<%= properties.test %>/<%= pkg.name %>.css": "<%= pkg.name %>.less"
        }
      }
    },

    // /* concat files */
    // concat: {
    //   options: {
    //     banner: '<%= banner %>',
    //     stripBanners: false
    //   },
    //   basic_and_extras: {
    //     files: {
    //        "<%= properties.dist %>/<%= pkg.name %>.less" : ['<%= pkg.name %>.less']
    //     },
    //   },
    // },
    //
    // /* put files not handled in other tasks here */
    // copy: {
    //   site: {
    //     files: [{
    //       expand: true,
    //       dot: true,
    //       src: ['<%= properties.dist %>/*.js'],
    //       dest: 'docs/_site'
    //     }]
    //   }
    // },
    //
    // /* build jekyll */
    // shell: {
    //   jekyllBuild: {
    //     command: 'jekyll build --source docs --destination docs/_site'
    //   }
    // },
    //
    // /* commit on gh-pages github */
    // 'gh-pages': {
    //   options: {
    //     base: 'docs/_site/',
    //     message: 'auto-generated commit'
    //   },
    //   src: ['**/*']
    // },
    //
    // /* update bower json */
    // bump: {
    //   options: {
    //     files: ['package.json', 'bower.json'],
    //     updateConfigs: ['pkg'],
    //     commit: true,
    //     commitFiles: ['-a'], // all Files
    //     push: true,
    //     pushTo: 'origin'
    //   }
    // }

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
    'less'
  ]);

  grunt.registerTask('deploy', [
    'clean',
    'concat',
    'shell',
    'copy',
    'gh-pages',
    'bump'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
