import { TAB_TO_SPACES } from '../../constants';

export const addEnter = (value: string): string => {
  let result = value.replace(/\w+[\s\w]+\w+/g, (match) => {
    return match.replace(/\s/g, '\n');
  });
  result = result.replace(/}/g, '\n}\n');
  return result.replace(/{/g, ' {\n');
};

export const checkSpaces = (value: string): string => {
  return value.replace(/ {2,}/g, ' ').replace(/\[\s+{/g, '[{');
};

export const fixEnter = (value: string): string => {
  return value.replace(/\n+\s*\n+/g, '\n').replace(/[)\w:]\s+{/g, (match) => {
    return match.replace(/\s+{/g, ' {');
  });
};

export const checkEnter = (value: string): string => {
  return value.replace(/\s+{/, ' {').replace(/}\s+,/g, '},\n');
};

export const checkTab = (value: string): string => {
  let tabCount = 0;
  let result = value[0];
  for (let i = 1; i < value.length; i += 1) {
    if (value[i] === '{') {
      tabCount += 1;
    }
    if (value[i + 1] === '}') {
      tabCount -= 1;
      if (tabCount < 0) {
        tabCount = 0;
      }
    }

    if (value[i] === '\n') {
      result += value[i];
      result += '\t'.repeat(tabCount);
    } else if (value[i] !== '\t') {
      result += value[i];
    }
  }
  result = result.replace(/\t+\n+/g, '');
  result = result.replace(/\t */g, '\t');
  result = result.replace(/ *\t/g, '\t');
  return result;
};

export const checkFilter = (value: string): string => {
  return value
    .replace(/\s+\(\s+/g, ' (')
    .replace(/\s+\)\s+/g, ') ')
    .replace(/\([\w\s:"{}[\],]+\)/g, (match) => {
      let result = match.replace(/\s/g, '');
      result = result.replace(/{/g, '{ ');
      result = result.replace(/}/g, ' }');
      result = result.replace(/}\s+}/g, '}}');
      result = result.replace(/:/g, ': ');
      result = result.replace(/,/g, ', ');
      return result;
    });
};

export const checkQuery = (value: string): string => {
  return value.replace(/^query\s+/, 'query ');
};

export const formatter = (value: string): string => {
  const formatters = [
    addEnter,
    checkSpaces,
    checkEnter,
    checkTab,
    checkFilter,
    fixEnter,
    checkQuery,
  ];
  let result = value;
  formatters.forEach((func) => {
    result = func(result);
  });
  result = result.replace(/\t/g, ' '.repeat(TAB_TO_SPACES));
  return result;
};
