/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
const countCharacters = function (words, chars) {
    const charCountTracker = {}

    for (const character of chars) {
        charCountTracker[character] = (charCountTracker[character] ?? 0) + 1
    }

    let possibleWordCount = 0

    const validateIfWordCanBeFormed = word => {
        const trackerCopy = {
            __proto__: charCountTracker,
        }
        for (const wordChar of word) {
            const left = trackerCopy[wordChar]

            if (!left) {
                return false
            }

            trackerCopy[wordChar] = left - 1
        }

        return true
    }

    for (const word of words) {
        if (word.length > chars.length) {
            continue;
        }

        if(validateIfWordCanBeFormed(word)) {
            possibleWordCount += word.length
        }
    }

    return possibleWordCount
};

console.log(countCharacters(["cat","bt","hat","tree"], "atach"))