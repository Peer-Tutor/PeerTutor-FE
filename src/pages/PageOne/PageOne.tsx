import React from "react"
import styles from './PageOne.module.css' //'./PageOne.module.css'

const PageOne = () => {
    // console.log('page one rendered')
    return (
        <div className={styles.wrapper}>
            <h1>Page One</h1>
        </div>
    )
}
export {PageOne}