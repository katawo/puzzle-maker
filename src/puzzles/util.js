export function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomChar() {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
  var rnum = Math.floor(Math.random() * chars.length);
  return chars[rnum];
}
