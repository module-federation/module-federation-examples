export function groupBy(items: any[], property: string) {
  return items.reduce((groups, item) => {
    const value = item[property];
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}
  
export function isPropertyValuesEqual(subject, target, propertyNames: string[]) {
  return propertyNames.every((propName) => {
    return subject[propName] === target[propName];
  });
}
  
export function collectUniqueItemsByProperties(items, propertyNames: string[]) {
  const propNamesArray: string[] = [...propertyNames];
  
  return items.filter((item, index, array) =>
    index === array.findIndex(foundItem => isPropertyValuesEqual(foundItem, item, propNamesArray))
  );
}