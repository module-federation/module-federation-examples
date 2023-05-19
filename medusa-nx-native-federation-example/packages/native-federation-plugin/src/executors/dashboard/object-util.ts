export function isEqualItems(subject, target, propertyNames: string[]): boolean {
  return propertyNames.every((propName) => {
    return subject[propName] === target[propName];
  });
}
  
export function filterUniqueItemsBy<T>(items: T[], propertyNames: string[]): T[] {
  const properties: string[] = [...propertyNames];
  
  return items.filter((item, index, array) =>
    index === array.findIndex((foundItem) => isEqualItems(foundItem, item, properties))
  );
}