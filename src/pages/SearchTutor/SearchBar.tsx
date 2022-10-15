import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { TutorResponse } from './SearchTutor'
import { searchTutor } from './Service'

const SearchBar = (props: { setTutorList: Dispatch<SetStateAction<TutorResponse[]>> }) => {
    const { setTutorList } = props
    const [searchStr, setSearchStr] = useState('')

    const onChangeHandler = (e: any) => {
        setSearchStr(e.target.value)
        searchTutor(searchStr, setTutorList);
    };

    return (
        <>
            <div className="flex flex-row align-items-center flex-1">
                <div className="flex ">
                    <span className="p-input-icon-left">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <InputText className="w-12" value={searchStr} onChange={onChangeHandler} placeholder="Tutor Name" />
                    </span>
                </div>
            </div>
        </>
    );
};
export { SearchBar };