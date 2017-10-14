
describe("Add functionality", () => {
    it("calculates that x + y = z", () => {
        expect(add(4, 5)).toEqual(9);
        expect(add(14, -5)).toEqual(9);
    });
    // it("calculates that x + y != z", () => {
    //     expect(add(14, -5)).not.toEqual(9);
    // });
});

var add = (x, y) => {
    return x + y;
}