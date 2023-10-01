interface GenericErrorProps {
    msg?: string
}

const GenericError = (props: GenericErrorProps) => {
    return (
        <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
                <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
                <label className="flex text-normal text-orange font-bold">Error</label>
                {props.msg ? <label className="text-xs text-white font-normal">{props.msg}</label> : undefined}
            </div>
        </div>
    )
}

type BadRequestProps = GenericErrorProps
const BadRequest = (props: BadRequestProps) => {

    return (
        <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
                <i className="text-xl text-orange fa-solid fa-triangle-exclamation"></i>
            </div>
            <div className="flex flex-1 flex-column">
                <label className="flex text-normal text-orange font-bold">Bad Request</label>
                <label className="text-xs text-white font-normal">{props?.msg}</label>
            </div>
        </div>
    )
}

const EmailVerificationFail = () => {
    return (
        <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
                <i className="text-xl text-orange fa-solid fa-circle-xmark"></i>
            </div>
            <div className="flex flex-1 flex-column">
                <label className="flex text-lg text-orange font-bold">Verification Failed</label>
                <label className="text-xs text-white font-normal">Verification code entered does not match.</label>
            </div>
        </div>
    );
}

const EmailVerificationSuccess = () => {
    return (
        <div className="flex flex-row align-items-center" style={{ flex: '1' }}>
            <div className="flex mx-3">
                <i className="text-xl text-green fa-solid fa-circle-check"></i>
            </div>
            <div className="flex flex-1 flex-column">
                <label className="flex text-lg text-green font-bold">Successful Verification</label>
                <label className="text-xs text-white font-normal">Email verified successfully. Please wait while we profile your account.</label>
            </div>
        </div>
    );
};


export { BadRequest, GenericError, EmailVerificationFail, EmailVerificationSuccess }