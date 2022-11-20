module.exports = {
  title: 'JointJS',
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
      { text: '教程', link: '/tutorial/' },
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
      'intermediate/summary',
      'intermediate/special_attrs',
      'intermediate/events',
      'intermediate/serialization',
      'intermediate/custom_elements',
      'intermediate/custom_links',
      'intermediate/link_labels',
      'intermediate/element_tools',
      'intermediate/link_tools',
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