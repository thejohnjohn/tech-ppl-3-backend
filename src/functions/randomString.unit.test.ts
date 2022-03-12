import randomString from './randomString'

test('Test randomString', () => {
    expect(randomString(8).length).toBe(8)
})
