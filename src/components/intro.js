import React from "react"
import { Link } from "gatsby"

import introStyles from "./intro.module.css"

export default () => (
    <div className='intro'>
        <h1>Hoseong Son</h1>
        <h3>Backend engineer @ <a href='https://ridibooks.com' className={introStyles.company}>RIDI</a></h3>
        <section className={introStyles.words}>
            <p>읽고 쓰는 것을 좋아합니다.</p>
        </section>
        <section className={introStyles.byline}>
            <p>
                <Link to="/">blog</Link>
            </p>
            <p>
                <a href="https://github.com/sookcha">github</a>
            </p>
        </section>
  </div>
)
