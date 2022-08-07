import React from "react"

interface BaseLayoutProps {
    children?: React.ReactNode;
}
const BaseLayout = (props:BaseLayoutProps) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export {BaseLayout}