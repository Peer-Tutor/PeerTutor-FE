import React from "react"
import styles from './PageNotFound.module.css'

const PageNotFound = () => {
    console.log('page one rendered')
    return (
        <div className={styles.wrapper}>
            <h1>Page Not Found</h1>
        </div>
    )
}
export {PageNotFound}