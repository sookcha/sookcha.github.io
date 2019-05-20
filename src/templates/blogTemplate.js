import React from "react"
import { graphql } from "gatsby"

import Layout from '../components/layout'
import ArticleLayout from "../components/articleLayout";
import blogTemplateStyles from './blogTemplate.module.css';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <ArticleLayout smallTitle>
        <h3 className={blogTemplateStyles.title}>{frontmatter.title}</h3>
        <h5 className={blogTemplateStyles.date}>{frontmatter.date}</h5>
        <div
          className={blogTemplateStyles.blogPostContent}
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
