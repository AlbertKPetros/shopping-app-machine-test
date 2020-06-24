export function getUniqueId(): string {
  const stringArr = [];
  for (let i = 0; i < 4; i++) {
    const s4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(s4);
  }
  return stringArr.join('-');
}
