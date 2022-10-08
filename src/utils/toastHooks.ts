import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import './ToastDemo.css';

let globalRef: React.RefObject<Toast> 
const useToastHook = () => {
    const [toastRef, setToastRef] = useState< React.RefObject<Toast> | undefined>()
    let ref = useRef(null);
    useEffect(() => {
        setToastRef(ref)
        globalRef = ref
    }, [])
    
    return [toastRef]
}

export { useToastHook, globalRef as toast }