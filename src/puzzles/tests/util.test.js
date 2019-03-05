import { distinct } from '../util';

describe('distinct an array', () => {
  test('should return distincted array', () => {
    const array = ['a', 'a', 1, 'b', 1, 'c'];
    expect(distinct(array)).toEqual(['a', 1, 'b', 'c']);
  });
});
