import React from "react"
import { graphql } from "gatsby"
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

import Layout from '../components/layout'
import ArticleLayout from "../components/articleLayout";
import blogTemplateStyles from './blogTemplate.module.css';

import GatsbyConfig  from '../../gatsby-config';

export default function Template({
  location,
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const url = location.pathname ? location.pathname : ''; 
  let disqusConfig = {
    url: `${GatsbyConfig.siteUrl + url}`,
    identifier: data.url,
    title: data.title,
  }

  return (
    <Layout>
      <ArticleLayout smallTitle>
        <h3 className={blogTemplateStyles.title}>{frontmatter.title}</h3>
        <h5 className={blogTemplateStyles.date}>{frontmatter.date}</h5>
        <div
          className={blogTemplateStyles.blogPostContent}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      <Disqus config={disqusConfig} />
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
