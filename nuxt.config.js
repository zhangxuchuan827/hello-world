export default {
  server: {
    port: 8080,
    host: '0.0.0.0',
  },
  router: {
    base: '/lagou-work',
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {
      // 清除根据 pages 目录默认生成的路由表规则
      routes.splice(0)

      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout'),
          children: [
            {
              path: '',
              name: 'home',
              component:resolve(__dirname, 'pages/home')
            },
            {
              path: '/login',
              name: 'login',
              component:resolve(__dirname, 'pages/login')
            },
            {
              path: '/register',
              name: 'register',
              component:resolve(__dirname, 'pages/login')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component:resolve(__dirname, 'pages/profile')
            },
            {
              path: '/settings',
              name: 'settings',
              component:resolve(__dirname, 'pages/settings')
            },
            {
              path: '/editor',
              name: 'editor',
              component:resolve(__dirname, 'pages/editor')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component:resolve(__dirname, 'pages/article')
            },
          ]
        }
      ])
    }
  },
  // 注册插件
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ],
  head: {
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} - RealWorld` : 'RealWorld';
    },
    meta: [{ hid: 'default', name: 'default', content: 'RealWorld' }]
  },
  generate: {
    dir: 'docs'
  }
}