const add = (a,b) => a+b;
const generateGreeting = (name) => `Hello ${name}!`

test('should add two numbers', () => {
    const result = add(1,2);
    expect(result).toBe(3);
/*      if (result!==3){
        throw new Error(`You added 1 and 2. The result was ${result}. Expect 3`)
    }  */
});

test('should be Hello Leonardo!', ()=>{
    const result = generateGreeting('Leonardo');
    expect(result).toBe('Hello Leonardo!')
});