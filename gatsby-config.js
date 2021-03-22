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
    'gatsby-transformer-remark',
    `gatsby-plugin-feed`,
    {
        resolve: `gatsby-plugin-disqus`,
        options: {
          shortname: `sookcha`
        },
    }
  ],
}
