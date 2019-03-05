export function findTextInWords(cells, words) {
  // same direction
  // continuously
  // found in words
  // sort the cells
  const sortedCells = sortByPosition(cells);
  return isContinued(sortedCells) && findIndWords(sortedCells, words);
}

export function sortByPosition(cells) {
  return cells.sort(
    (a, b) => a.position.x - b.position.x || a.position.y - b.position.y
  );
}

// Don't use
export function isInALine(cells) {
  if (cells && cells.length === 1) return true;
  const firstCell = cells[0];
  return (
    cells.every(c => c.position.x === firstCell.position.x) ||
    cells.every(c => c.position.y === firstCell.position.y) ||
    cells.every(
      c =>
        c.position.x - firstCell.position.x ===
        c.position.y - firstCell.position.y
    )
  );
}

export function isContinued(cells) {
  if (cells && cells.length <= 1) {
    return true;
  }

  const deltaX = cells[1].position.x - cells[0].position.x;
  const deltaY = cells[1].position.y - cells[0].position.y;

  if (
    (deltaX !== 0 && deltaX !== 1 && deltaX !== -1) ||
    (deltaY !== 0 && deltaY !== 1 && deltaY !== -1)
  ) {
    return false;
  }

  for (let i = 2; i < cells.length; i++) {
    if (
      deltaX !== cells[i].position.x - cells[i - 1].position.x ||
      deltaY !== cells[i].position.y - cells[i - 1].position.y
    ) {
      return false;
    }
  }

  return true;
}

export function findIndWords(cells, words) {
  return (
    words.find(x => x.text === cells.map(x => x.char).join('')) ||
    words.find(
      x =>
        x.text ===
        cells
          .map(x => x.char)
          .reverse()
          .join('')
    )
  );
}
