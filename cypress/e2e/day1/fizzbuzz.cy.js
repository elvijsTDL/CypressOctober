function fizzBuzz(number) {
    if (number % 3 === 0 && number % 5 === 0){
        return "FizzBuzz"
    }
    if (number % 3 === 0 ) {
        return "Fizz"
    }
    if( number % 5 === 0 ) {
        return "Buzz"
    }
    return "Not a multiple of 3 or 5"
}

function fizzBuzzChecker(array,expectedResult) {
    array.forEach((number) => {
        expect(fizzBuzz(number)).to.eq(expectedResult)
    })
}

describe("First day unit test example" , () => {

    it("Return Fizz if the number is a multiple of 3" , () => {
        fizzBuzzChecker([3,6,9,12,18],"Fizz")
    })

    it("Return Buzz if the number is a multiple of 5" , () => {
        fizzBuzzChecker([5,10,20,25,35],"Buzz")
    })

    it("Return FizzBuzz if the number is a multiple of 5 and 3" , () => {
        fizzBuzzChecker([15,30,45,60],"FizzBuzz")
    })

    it("Return Not a multiple of 3 or 5 if it is so" , () => {
        fizzBuzzChecker([1,2,4],"Not a multiple of 3 or 5")
    })
})