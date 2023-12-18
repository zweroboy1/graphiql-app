const addEnter = (value: string): string => {
  let result = value.replace(/\w+[\s\w]+\w+/g, (match) => {
    return match.replace(/\s/g, '\n');
  });
  result = result.replace(/}/g, '\n}\n');
  return result.replace(/{/g, ' {\n');
};

const checkSpaces = (value: string): string => {
  return value.replace(/ {2,}/g, ' ');
};

const fixEnter = (value: string): string => {
  return value.replace(/\n+\t*\n+/g, '\n').replace(/[)\w:]\s+{/g, (match) => {
    return match.replace(/\s+{/g, ' {');
  });
};

const checkEnter = (value: string): string => {
  return value.replace(/\s+{/, ' {');
};

const checkTab = (value: string): string => {
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

const checkFilter = (value: string): string => {
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

export const formatter = (value: string): string => {
  let result = value;
  result = addEnter(result);
  result = checkSpaces(result);
  result = checkEnter(result);
  result = checkTab(result);
  result = checkFilter(result);
  result = fixEnter(result);
  return result;
};
