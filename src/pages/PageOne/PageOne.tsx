import axios from "axios"
import React, { useEffect, useState } from "react"
import { Subdomain } from "../../constants/Subdomain"
import { getUrl } from "../../utils/apiUtils"
import styles from './PageOne.module.css' //'./PageOne.module.css'

const PageOne = () => {
    const [state, setState] = useState()

    useEffect(() => {
        const url = getUrl(Subdomain.ACCOUNT_MGR, '/health')
        axios.get(url).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log('error!' , err)
        })
        // callApi('/health', null, 'GET').then(res => {
        //     console.log('success, res=', res)
        // }).catch(err => {
        //     console.log('error', err)
        // })

    }, [])
    // console.log('page one rendered')
    return (
        <div className={styles.wrapper}>
            <h1>Page One</h1>
        </div>
    )
}
export { PageOne }