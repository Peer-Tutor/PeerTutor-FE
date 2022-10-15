const convertDateToYYYYMMDD = (d: Date) => {
    const offset = d.getTimezoneOffset()
    const dNew = new Date(d.getTime() - (offset * 60 * 1000))
    return dNew.toISOString().split('T')[0]
}

export {convertDateToYYYYMMDD}