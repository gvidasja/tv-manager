export const range = size => Array.apply(null, Array(size)).map((_, index) => index)

export const swap = (array, index1, index2) => {
    if(index1 === index2) return array

    if(index1 > index2) {
        const temp = index1
        index1 = index2
        index2 = temp
    }

    const part1 = array.slice(0, index1)
    const el1 = array[index1]
    const part2 = array.slice(index1 + 1, index2)
    const el2 = array[index2]
    const part3 = array.slice(index2 + 1)

    return [...part1, el2, ...part2, el1, ...part3]
}

export const zip = (array1, array2, zipper) => {
    if(!array1 || !array2 || array1.length !== array2.length) {
        throw new Error('Arrays have to be the same size!')
    }
    
    return array1.map((el1, index) => zipper(el1, array2[index]))
}