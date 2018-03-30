module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  generate: {
    fallback: true
  },
  router: {
    extendRoutes(routes, resolve) {
      // routes.push({
      //   path: '/admin',
      //   name: 'admin',
      //   children: routes.map(x => {
      //     // x.name = null
      //     return x
      //   }),
      //   component: resolve(__dirname, 'pages/adminfoo.vue')
      // })
      // Generate our non language routes
      const newRoutes = makeLangRoutes(routes, 'prefix')
      // Add our new language routes after existing routes:
      routes.push(...newRoutes)
    }
  }
}

function makeLangRoutes(routesIn, param = 'lang', isChild = false) {
  if (typeof param !== 'string' && !param) {
    // Bail if no parameter specified
    return []
  }
  const routes = []
  routesIn.forEach(r => {
    let path = r.path
    let name = r.name
    let children = r.children
    const component = r.component
    // Only change the path of top level (root) routes
    if (!isChild && path) {
      path = `/:${param}${path === '/' ? '' : path}`
    }
    // prefix named route with 'lang-'
    name = name ? `${param}-${name}` : name
    // Handle child routes (recursive)
    children = children ? makeLangRoutes(children, param, true) : children
    // Build a new route object
    const route = { path, name, component }
    if (children) {
      route.children = children
    }
    // Append the new route
    routes.push(route)
  })
  // Return the new array of routes
  return routes
}
