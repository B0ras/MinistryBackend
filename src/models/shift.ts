interface Shift {
    id: number
    day: Date,
    duration: number,
    personA?: number,
    personB?: number,
    personC?: number
}

export default Shift