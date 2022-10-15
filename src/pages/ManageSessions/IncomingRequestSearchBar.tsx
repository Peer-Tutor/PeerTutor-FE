import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getSessionTokenValues, getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { RequestResponse } from './IncomingRequest'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { Dispatch, SetStateAction, useState } from 'react'

const searchTuitionOrder = (studentName: string, setTuitionOrderList: React.Dispatch<React.SetStateAction<RequestResponse[]>>) => {
    const url = getUrl(Subdomain.TUITION_ORDER_MGR, '/tuitionOrders');
    const { name, sessionToken, profileId } = getSessionTokenValues()
    axios.get<RequestResponse[]>(url, {
        params: {
            name: name ?? '',
            sessionToken: sessionToken ?? '',
            displayName: studentName ?? ''
        }
    }).then(res => {
        // console.log(res)
        setTuitionOrderList(res.data)
    })
        .catch(err => {
            //@ts-ignore
            console.log('error!', err);
        });
}

const IncomingRequestSearchBar = (props: { setTuitionOrderList: Dispatch<SetStateAction<RequestResponse[]>> }) => {
    const { setTuitionOrderList } = props
    const [searchStr, setSearchStr] = useState('')

    const onChangeHandler = (e: any) => {
        setSearchStr(e.target.value)

    }
    const onClickHandler = () => {
        searchTuitionOrder(searchStr, setTuitionOrderList)
    }

    return (
        <>
            <div className="flex flex-row align-items-center gap-2 mb-3">
                <div className="flex ">
                    <span className="p-input-icon-left">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <InputText onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onClickHandler()
                            }
                        }} className="w-12" value={searchStr} onChange={onChangeHandler} placeholder="Student Name" />
                    </span>
                </div>
                <div className="flex flex-column align-items-center gap-3">
                    <span >
                        <Button onClick={onClickHandler}  className="fa-solid fa-magnifying-glass" />
                    </span>

                </div>
            </div>
        </>
    )
}

export { IncomingRequestSearchBar }