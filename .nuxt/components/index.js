export { default as Logo } from '../..\\resources\\nuxt\\components\\Logo.vue'

export const LazyLogo = import('../..\\resources\\nuxt\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => c.default || c)
