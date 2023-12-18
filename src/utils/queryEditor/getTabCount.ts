export const getTabCount = (value: string): number => {
  const tabCount =
    [...value.matchAll(/{/g)].length - [...value.matchAll(/}/g)].length;
  return tabCount < 0 ? 0 : tabCount;
};
