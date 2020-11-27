export function reorder<ElementType>(
  list: Array<ElementType>,
  startIndex: number,
  endIndex: number
): Array<ElementType> {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}
