import React from "react"
import { Link } from 'gatsby'
import GatsbyConfig from '../../gatsby-config'

import articleListStyles from "./articleList.module.css"

const ArticleLayout = ({smallTitle, children}) => (
  <div>
    <p className={smallTitle ? articleListStyles.smallTitle : articleListStyles.blogTitle}>
      <Link to='/'>{GatsbyConfig.siteMetadata.title}</Link>
    </p>
    {children}
  </div>
)

export default ArticleLayout