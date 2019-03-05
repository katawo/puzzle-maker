import {
  findTextInWords,
  isInALine,
  findIndWords,
  sortByPosition,
  isContinued
} from '../wordDetection';

describe('sortByPosition', () => {
  test('should be sorted by x direction', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 3,
          y: 1
        }
      },
      {
        position: {
          x: 2,
          y: 1
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      }
    ];

    const sortedCells = sortByPosition(cells);
    expect(sortedCells).toEqual([
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 2,
          y: 1
        }
      },
      {
        position: {
          x: 3,
          y: 1
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      }
    ]);
  });

  test('should be sorted by y direction', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 3
        }
      },
      {
        position: {
          x: 1,
          y: 4
        }
      },
      {
        position: {
          x: 1,
          y: 2
        }
      }
    ];

    const sortedCells = sortByPosition(cells);
    expect(sortedCells).toEqual([
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 1,
          y: 3
        }
      },
      {
        position: {
          x: 1,
          y: 4
        }
      }
    ]);
  });

  test('should be sorted by both directions', () => {
    const cells = [
      {
        position: {
          x: 3,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 3
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 1
        }
      }
    ];

    const sortedCells = sortByPosition(cells);
    expect(sortedCells).toEqual([
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 3
        }
      },
      {
        position: {
          x: 3,
          y: 1
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      }
    ]);
  });
});

describe('isInALine', () => {
  test('should be in a line of y', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 3,
          y: 1
        }
      },
      {
        position: {
          x: 2,
          y: 1
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      }
    ];

    expect(isInALine(cells)).toBe(true);
  });

  test('should be in a line of x', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 1,
          y: 4
        }
      },
      {
        position: {
          x: 1,
          y: 6
        }
      }
    ];

    expect(isInALine(cells)).toBe(true);
  });

  test('should be not in a line', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 3,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 1
        }
      },
      {
        position: {
          x: 4,
          y: 1
        }
      }
    ];

    expect(isInALine(cells)).toBe(false);
  });

  test('should be in a line of diagonal', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 3,
          y: 3
        }
      },
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 5,
          y: 5
        }
      }
    ];

    expect(isInALine(cells)).toBe(true);
  });
});

describe('isContinued', () => {
  test('should be continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 1,
          y: 3
        }
      },
      {
        position: {
          x: 1,
          y: 4
        }
      }
    ];

    expect(isContinued(cells)).toBe(true);
  });

  test('should be continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 1
        }
      },
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 3,
          y: 3
        }
      },
      {
        position: {
          x: 4,
          y: 4
        }
      }
    ];

    expect(isContinued(cells)).toBe(true);
  });

  test('should be continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 3
        }
      },
      {
        position: {
          x: 3,
          y: 4
        }
      },
      {
        position: {
          x: 4,
          y: 5
        }
      }
    ];

    expect(isContinued(cells)).toBe(true);
  });

  test('should be continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 3,
          y: 2
        }
      },
      {
        position: {
          x: 4,
          y: 2
        }
      }
    ];

    expect(isContinued(cells)).toBe(true);
  });

  test('should be not continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 2
        }
      },
      {
        position: {
          x: 5,
          y: 2
        }
      },
      {
        position: {
          x: 4,
          y: 2
        }
      }
    ];

    expect(isContinued(cells)).toBe(false);
  });

  test('should be not continued', () => {
    const cells = [
      {
        position: {
          x: 1,
          y: 2
        }
      },
      {
        position: {
          x: 2,
          y: 4
        }
      },
      {
        position: {
          x: 3,
          y: 6
        }
      },
      {
        position: {
          x: 4,
          y: 8
        }
      }
    ];

    expect(isContinued(cells)).toBe(false);
  });

  test('should be  continued', () => {
    const cells = [
      {
        position: {
          x: 5,
          y: 6
        }
      },
      {
        position: {
          x: 6,
          y: 5
        }
      },
      {
        position: {
          x: 7,
          y: 4
        }
      },
      {
        position: {
          x: 8,
          y: 3
        }
      }
    ];

    expect(isContinued(cells)).toBe(true);
  });
});

describe('find in words with sorted array', () => {
  test('should be found in the words', () => {
    const cells = [
      {
        char: 'k',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 'a',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 't',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'a',
        position: {
          x: 5,
          y: 4
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kata' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findIndWords(cells, words)).toEqual({ text: 'kata' });
  });

  test('should be found in the words', () => {
    const cells = [
      {
        char: 'a',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 't',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 'a',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'k',
        position: {
          x: 5,
          y: 4
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kata' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findIndWords(cells, words)).toEqual({ text: 'kata' });
  });

  test('should be not found in the words', () => {
    const cells = [
      {
        char: 'b',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 't',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 'a',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'k',
        position: {
          x: 5,
          y: 4
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kata' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findIndWords(cells, words)).toBe(undefined);
  });

  test('should be found in the words', () => {
    const cells = [
      {
        char: 'k',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 'a',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 't',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'a',
        position: {
          x: 5,
          y: 4
        }
      },
      {
        char: 'x',
        position: {
          x: 6,
          y: 5
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kata' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findIndWords(cells, words)).toBe(undefined);
  });
});

describe('Find text in words', () => {
  test('should be a valid word', () => {
    const cells = [
      {
        char: 'k',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 'a',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 't',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'a',
        position: {
          x: 5,
          y: 4
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kata' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findTextInWords(cells, words)).toEqual({ text: 'kata' });
  });

  test('should be a valid word', () => {
    const cells = [
      {
        char: 'k',
        position: {
          x: 2,
          y: 1
        }
      },
      {
        char: 'a',
        position: {
          x: 3,
          y: 2
        }
      },
      {
        char: 't',
        position: {
          x: 4,
          y: 3
        }
      },
      {
        char: 'a',
        position: {
          x: 5,
          y: 4
        }
      }
    ];

    const words = [
      { text: 'notfound' },
      { text: 'kataa' },
      { text: '123' },
      { text: 'any' }
    ];

    expect(findTextInWords(cells, words)).toBe(undefined);
  });
});
