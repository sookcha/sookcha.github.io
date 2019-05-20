import React from "react"
import { Link } from 'gatsby'

import articleListStyles from "./articleList.module.css"
import ArticleLayout from "./articleLayout";

export default () => (
  <ArticleLayout>
    <Link to='/me'>about</Link>

    <ul className={articleListStyles.articleListWrapper}>
      <li>test</li>
    </ul>
  </ArticleLayout>
)
