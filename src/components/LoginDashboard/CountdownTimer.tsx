import { Button } from "primereact/button";
import { useEffect, useState } from "react"

type CountDowntimerProps = {
    countDownFromInSeconds: number;
    showDisableButton?: { onReset?: (...props: any[]) => void }
}

const CountDowntimer = (props: CountDowntimerProps) => {

    const [timer, setTimer] = useState(props.countDownFromInSeconds)
    const [isDisabled, setIsDisabled] = useState(true)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1)
            } else {
                setIsDisabled(false)
            }
        }, 1000);

        // cleanup
        // return clearTimeout(timeoutId)
    }, [timer])

    const handleResend = () => {
        setTimer(props.countDownFromInSeconds)
        if (props.showDisableButton?.onReset) {
            props.showDisableButton.onReset()
            setIsDisabled(true)
        }
    }
    return (
        <div className="flex align-items-center col-12 pt-4">
            <label className="col-10 p-0 text-black font-semibold text-base">You may request for another verification code after {timer}(s).</label>
            <Button label="Resend verification code"
                className="p-button-tertiary flex"
                onClick={handleResend}
                disabled={isDisabled} />
        </div>
    )
}
CountDowntimer.defaultProps = {
    countDownFromInSeconds: 5
}
export { CountDowntimer }