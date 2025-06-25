export const mapOrder = <T>(
  originalArray: T[],
  orderArray: string[],
  key: keyof T
): T[] => {
  if (!Array.isArray(originalArray) || !Array.isArray(orderArray)) return [];

  const orderMap = new Map(orderArray.map((id, index) => [id, index]));

  return [...originalArray].sort((a, b) => {
    const aId = String(a[key]);
    const bId = String(b[key]);
    const aIndex = orderMap.get(aId) ?? -1;
    const bIndex = orderMap.get(bId) ?? -1;
    return aIndex - bIndex;
  });
};
