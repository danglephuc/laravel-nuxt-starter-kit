require('dotenv').config();
const { join } = require('path');
const { copySync, removeSync } = require('fs-extra');

export default {
  srcDir: 'resources/nuxt',
  buildDir: '.nuxt',
  generate: {
    dir: '.nuxt/dist/generate',
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-laravel',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
    ],
    link: [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/app/_nuxt',
  },
  hooks: {
    build: {
      done(builder) {
        console.log(builder.nuxt.options);
        if (builder.nuxt.options.dev === false) {
          // Copy dist files to public/app
          const publicDir = join(builder.nuxt.options.rootDir, 'public', 'app');
          if (builder.nuxt.options.ssr) {
            removeSync(publicDir);
            copySync(join(builder.nuxt.options.buildDir, 'dist/client'), publicDir);
            removeSync(join(builder.nuxt.options.buildDir, 'dist/client'));
          }
        }
      },
    },
    generate: {
      done(generator) {
        if (generator.nuxt.options.dev === false) {
          // Copy dist files to public/app
          const publicDir = join(generator.nuxt.options.rootDir, 'public', 'app');
          if (!generator.nuxt.options.ssr) {
            removeSync(publicDir);
            copySync(generator.nuxt.options.generate.dir, publicDir);
          }
        }
      }
    },
    /* Nuxt doesn't allow the publicPath (CDN url) to be overridden at run time - it's baked into the manifest at
    ** build time.  This hook intercepts the VueRenderer when it has loaded the manifest and updates the publicPath
    to the current env value.*/
    render: {
      resourcesLoaded(resources) {
        const path = process.env.CDN_URL ? process.env.CDN_URL : '/_nuxt/';
        resources.clientManifest && (resources.clientManifest.publicPath = path);
      }
    }
  }
}
