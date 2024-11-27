class TestClass {
    testValue = 'initial value';

    async runTest() {
        console.log('test started');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('test finished');
        return 'test complete';
    }

    getTestValue() {
        return this.testValue;
    }
}

module.exports = TestClass;
