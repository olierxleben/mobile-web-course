/**
 * 
 * Grunt file for responsive images
 */
module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          sizes: [{
            width: 400,
            suffix: 'small',
            quality: 30
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/',
          dest: 'images/'
        }]
      }
    },

    clean: {
      dev: {
        src: ['images'],
      },
    },

    
    mkdir: {
      dev: {
        options: {
          create: ['images']
        },
      },
    },

    copy: {
      dev: {
        files: [{
          expand: true,
          src: ['img/*.{gif,jpg,png}'],
          dest: 'images/',
          flatten: true,
        }]
      },
    },

  });

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
