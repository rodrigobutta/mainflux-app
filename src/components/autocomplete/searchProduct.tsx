export async function searchProduct (key, searchIndex) {
    const list = []
    searchIndex.forEach((item) => {
        if (item.name.includes(key)) {
            list.push(item)
        }
    })

    return list
}