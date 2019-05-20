import React from "react"
import { Link } from "gatsby"

import postLinkStyles from './postLink.module.css'

const PostLink = ({ post }) => (
  <li>
    <span className={postLinkStyles.title}>
      <Link to={post.frontmatter.path}>
        {post.frontmatter.title}
      </Link>
    </span>

    <span className={postLinkStyles.date}>{post.frontmatter.date}</span>
  </li>
)

export default PostLink