/// <reference types="jest" />

describe('health check', () => {
  it('should return true', () => {
    expect(true).toBe(true);
    // test case 3:  unit test fail
     throw new Error("Demo unit test fail");
  });
});
