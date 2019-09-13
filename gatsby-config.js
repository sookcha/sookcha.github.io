module.exports = {
  siteMetadata: {
    title: 'contra',
    description: 'Personal blog by Hoseong Son',
    siteUrl: 'https://sookcha.com',
  },
  plugins: [
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: "markdown-pages",
      },  
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `contra-1`
      }
    },
    'gatsby-transformer-remark',
    `gatsby-plugin-feed`
  ],
}
