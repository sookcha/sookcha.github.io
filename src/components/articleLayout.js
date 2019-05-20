import React from "react"
import { Link } from 'gatsby'

import articleListStyles from "./articleList.module.css"

const ArticleLayout = ({children}) => (
  <div>
    <p className={articleListStyles.blogTitle}>
      <Link to='/'>horchata</Link>
    </p>
    {children}
  </div>
)

export default ArticleLayout