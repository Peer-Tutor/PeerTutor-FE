import React from "react"
import styles from './PageTwo.module.css'

const PageTwo = () => {
    // console.log('page two rendered')

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <h1>hello</h1>
            </div>
            <h1>Page Two</h1>
        </div>
    )
}
export { PageTwo }