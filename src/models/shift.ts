
// interface Place {
//     place: string
// }

import Place from './place'

type Shift = {
    id: number
    day: Date,
    duration: number,
    personA?: number,
    personB?: number,
    personC?: number,
    place?: Omit<Place, "id">
}

export default Shift