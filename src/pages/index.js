import React from 'react'
import { Link } from 'gatsby'

import ArticleLayout from '../components/articleLayout'
import Layout from '../components/layout'
import PostLink from '../components/postLink'
import articleListStyles from "../components/articleList.module.css"

const ArticlesPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges
  .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  .map(edge => <PostLink key={edge.node.id} post={edge.node} />)


  return (
  <Layout>
    <ArticleLayout>
      <p className={articleListStyles.aboutLink}>
        <Link to='/me'>about</Link>
      </p>

      <ul className={articleListStyles.articleListWrapper}>
        {posts}
      </ul>
    </ArticleLayout>
  </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            path
            title
          }
        }
      }
    }
  }
`

export default ArticlesPage
