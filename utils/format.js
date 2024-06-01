export const formatUnikey = (str) => {
    const newStr = str.toLowerCase()
    const specialChar = 'àáảãạâầấẩẫậăằắẳẵặèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ'
    const nonSpecialChar = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd'

    let output = ''
    for (let i = 0; i < newStr.length; i++) {
        const index = specialChar.indexOf(newStr[i])
        if (index != -1) {
            output += nonSpecialChar[index]
        } else {
            output += newStr[i]
        }
    }
    return output
}