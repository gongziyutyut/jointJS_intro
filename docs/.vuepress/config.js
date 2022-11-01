module.exports = {
  title: 'Welcome to JointJS',
  description: '中文文档',
  plugins: ['fulltext-search'],
  configureWebpack: {
    resolve: {
      alias: {
        '@image': '../images'
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: '引导', link: '/tutorial/' },
    ],
    sidebar: {
      '/tutorial/': getTutorialSidebar(['介绍', '进阶', '高级', 'JointJS+']),
    }
  }
  
}
function getTutorialSidebar(group) {
  return [{
    title: group[0],
    collapsable: false,
    children: [
      '',
      'intro/start',
      'intro/install',
      'intro/graph',
      'intro/element',
      'intro/link',
    ]
  }, {
    title: group[1],
    collapsable: false,
    children: [
      'intermediate/router-params',
    ]
  },{
    title: group[2],
    collapsable: false,
    children: [
      'advanced/router-params',
    ]
  },{
    title: group[3],
    collapsable: false,
    children: [
      'JointJS/router-params',
    ]
  }]
}