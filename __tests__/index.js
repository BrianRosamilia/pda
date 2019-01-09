const axios = require('axios');
const equation = require('../equation');
jest.mock('axios');

describe('Equation Solver + Submitter', () => {
    test('Test Equation Solver', () => {
        expect(equation.solveEquation({ operation: 'subtraction', left: 10, right: 6})).toBe(4);
        expect(equation.solveEquation({ operation: 'addition', left: 10, right: 6})).toBe(16);
        expect(equation.solveEquation({ operation: 'division', left: 12, right: 2})).toBe(6);
        expect(equation.solveEquation({ operation: 'multiplication', left: 10, right: 6})).toBe(60);
        expect(equation.solveEquation({ operation: 'remainder', left: 10, right: 6})).toBe(4);
        expect(() => equation.solveEquation({ operation: 'log', left: 10, right: 6})).toThrow();//log not supported
    });

    test('Solution Submission Failure', async() => {
        axios.post.mockImplementation(async() => { throw new Error() });
        expect.assertions(1);
        try{
            await equation.submitEquation(1, 42);
        }
        catch(e){
            expect(e.message).toMatch('Error submitting equation id 1 with result 42');
        }
    });

    test('Solution Submission Success', async() => {
        axios.post.mockReturnValue({status: 200});
        const result = await equation.submitEquation(1, 42);
        expect(result).toMatch('Successfully submitted equation 1 [200]');
    });
});