import { getRndInteger } from "../util";

function getAvailableRange(size, length, directionValue) {
  let from = 0;
  let to = 0;
  switch (directionValue) {
    case 0:
      from = 0;
      to = size - 1;
      break;

    case 1:
      from = 0;
      to = size - length - 1;
      break;

    case -1:
      from = length;
      to = size - 1;
      break;

    default:
      break;
  }

  return [from, to];
}

export function getAvailableArea(size, length, direction) {
  const x = getAvailableRange(size, length, direction.x);
  const y = getAvailableRange(size, length, direction.y);

  return { x, y };
}

function randomDirection() {
  const xDicection = getRndInteger(0, 2) - 1;
  const yDircection = getRndInteger(0, 2) - 1;
  return {
    x: xDicection,
    y: yDircection
  };
}

export function pickRandomDirection() {
  let direction;
  do {
    direction = randomDirection();
  } while (direction.x === 0 && direction.y === 0);
  return direction;
}

export function pickRandomPosition(size, length, direction) {
  const area = getAvailableArea(size, length, direction);
  const x = getRndInteger(area.x[0], area.x[1]);
  const y = getRndInteger(area.y[0], area.y[1]);
  return { x, y };
}
