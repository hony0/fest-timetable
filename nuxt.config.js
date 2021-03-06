
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'タムテブ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase' }
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  
  axios: {
  },
  
  serverMiddleware: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  /*
  ** Manifest for PWA
  */
  manifest: {
    name: 'My Time Table',
    lang: 'ja',
    short_name: 'タムテブ',
    title: "タムテブ",
    'og:title': 'タムテブ',
    description: 'マイタイムテーブルの作成と共有ができるサービスです',
    'og:description': 'マイタイムテーブルの作成と共有ができるサービスです',
    theme_color: "#529b58",
    background_color: "#bde0c0",
    display: "standalone",
    scope: "/",
    start_url: "/rockin2019"
  },
  workbox: {
    dev: true, //pwa mode for develop
  },
  
  generate: {
    routes: function () {
      return axios.get('https://fest-timetable.web.app/rockin2019/myTable')
        .then((res) => {
          return res.data.map((param) => {
            return '/myTable/' + param.id
          })
        })
    }
  }
}
