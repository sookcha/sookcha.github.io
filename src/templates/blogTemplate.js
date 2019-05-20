import React from "react"
import Layout from '../components/layout'
import ArticleLayout from "../components/articleLayout";

import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <ArticleLayout>
        <h3>{frontmatter.title}</h3>
        <h5>{frontmatter.date}</h5>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ArticleLayout>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
      }
    }
  }
`
