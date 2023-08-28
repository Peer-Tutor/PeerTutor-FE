import axios from "axios";
import { Subdomain } from "../../constants/Subdomain";
import { getUrl } from "../../utils/apiUtils";
import { toast } from "../../utils/toastHooks";
import { GetRequestResponse } from './IncomingRequestCard'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { searchStudent } from './IncomingRequestService'

const IncomingRequestSearchBar = (props: {setTotalRecords: any, setTuitionOrderList: Dispatch<SetStateAction<GetRequestResponse[]>> }) => {
    const { setTotalRecords, setTuitionOrderList } = props
    const [searchStr, setSearchStr] = useState('')

    const onChangeHandler = (e: any) => {
        setSearchStr(e.target.value)
    }
    const onClickHandler = () => {
        searchStudent(setTotalRecords, searchStr, setTuitionOrderList)
    }
    return (
            <div className="flex flex-row align-items-center">
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
                        <Button onClick={onClickHandler}  className="p-button-secondary" icon="fa-solid fa-magnifying-glass" />
                    </span>
                </div>
            </div>
    )
}

export { IncomingRequestSearchBar }