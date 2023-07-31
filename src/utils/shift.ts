
export function assignToFreeShift(people: (number | undefined)[], assigneeId: number) {
    let assigned = false;

    people = people.map((person) => {
        if (assigned) return person;
        if (!person) {
            person = assigneeId
            assigned = true
        }
        return person
    })

    const [personA, personB, personC] = people


    return { personA: personA, personB: personB, personC: personC }
}

export function removeFromShift(people: (number | undefined)[], assigneeId: number) {
    people = people.map((person) => {
        if (person === assigneeId) return null;
        return person
    })

    const [personA, personB, personC] = people

    return { personA: personA, personB: personB, personC: personC }

}

export function isThereFreeShift(people: (number | undefined)[]) {
    let isFreeShift = true

    let numberOfFreeShifts = 0
    people.forEach((person) => {
        if (!person) numberOfFreeShifts++;
    })

    if (numberOfFreeShifts !== 0) isFreeShift = false

    return isFreeShift;
}