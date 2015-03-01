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
      dev: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        src: '<%= properties.less %>/<%= pkg.name %>.less',
        dest: '<%= properties.dist %>/<%= pkg.name %>.css'
      },
      prodution: {
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
          cwd: '<%= properties.dist %>',
          src: '<%= pkg.name %>.min.css',
          dest: '<%= properties.test %>'
        }]
      }
    }

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
    'less',
    'usebanner',
    'copy'
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
