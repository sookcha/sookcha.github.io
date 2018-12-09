import React from "react"
import introStyles from "./intro.module.css"

export default () => (
    <div className='intro'>
        <h1>Hoseong Son</h1>
        <h3>Backend engineer @ <a href='https://ridibooks.com' className={introStyles.company}>RIDI</a></h3>
        <section className={introStyles.words}>
            <span>문학을 좋아합니다.</span>
        </section>
        <section className={introStyles.byline}>
            <a href='https://github.com/sookcha'>github</a>
        </section>
  </div>
)
