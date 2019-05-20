import React from "react"
import { Link, graphql } from 'gatsby'

import PostLink from './postLink'
import articleListStyles from "./articleList.module.css"
import ArticleLayout from "./articleLayout";

const ArticleList = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges
  .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
  .map(edge => <PostLink key={edge.node.id} post={edge.node} />)


  return <ArticleLayout>
    <Link to='/me'>about</Link>

    <ul className={articleListStyles.articleListWrapper}>
      {posts}
    </ul>
  </ArticleLayout>
}

export default ArticleList

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`