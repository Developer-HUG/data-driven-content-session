/**
 * Gulp configuration
 */

const config = {
  project: 'dhug',
  dest: {
    scss: 'dist/css',
    modules: 'dist/modules',
    icons: 'src/icons',
    macros: 'dist/macros',
    templates: 'dist/templates'
  },
  dirs: {
    scss: 'src/scss/',
    modules: 'src/modules/',
  },
  src: {
    scss: 'src/scss/main.scss',
    modules: 'src/modules/**/*',
    icons: 'src/icons/*.svg',
    macros: 'src/macros/*',
    templates: 'src/templates'
  },
};

module.exports = config;
