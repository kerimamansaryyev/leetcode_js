const getLucky = function(s, k) {
    let numberFromCodePointGenerator = function(){
        const baseCodePoint = 'a'.charCodeAt(0)
        let result= ''
        for(const character of s){
            result += (character.charCodeAt(0) - baseCodePoint + 1).toString()
        }
        return result
    }

    let directFromStringGenerator = function* (){
        for(const character of s){
            yield character
        }
    }

    let generator = numberFromCodePointGenerator

    function calcSum(){
        let sum = 0
        for(const character of generator()){
            sum += parseInt(character)
        }
        return sum
    }

    while(k > 0){
        s = calcSum().toString()
        generator = directFromStringGenerator
        k--
    }

    return parseInt(s)
};

console.log(getLucky('i', 2))
console.log(getLucky('iiii', 1))
console.log(getLucky('leetcode', 2))