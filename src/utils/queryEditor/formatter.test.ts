import {
  addEnter,
  checkEnter,
  checkFilter,
  checkSpaces,
  checkTab,
  fixEnter,
  formatter,
} from './formatter';

describe('addEnter', () => {
  it('replaces spaces with newlines', () => {
    const result = addEnter('property1 property2');
    expect(result).equal('property1\nproperty2');
  });

  it('handles spaces within brackets', () => {
    const result = addEnter('query {property1');
    expect(result).equal('query  {\nproperty1');
  });
});

describe('checkSpaces', () => {
  it('replaces multiple spaces with a single space', () => {
    const result = checkSpaces('This    has    too    many    spaces');
    expect(result).equal('This has too many spaces');
  });

  it('handles spaces within square brackets', () => {
    const result = checkSpaces('[   1,   2,   3   ]');
    expect(result).equal('[ 1, 2, 3 ]');
  });
});

describe('fixEnter', () => {
  it('removes excessive newlines', () => {
    const result = fixEnter('Line 1\n\nLine 2\nLine 3\n\n\nLine 4');
    expect(result).equal('Line 1\nLine 2\nLine 3\nLine 4');
  });

  it('handles newline around curly braces', () => {
    const result = fixEnter('query \n{');
    expect(result).equal('query {');
  });
});

describe('checkEnter', () => {
  it('fix multi spaces around bracket', () => {
    const result = checkEnter('property1\nproperty2   {');
    expect(result).equal('property1\nproperty2 {');
  });
  it('fix tabs around bracket', () => {
    const result = checkEnter('property1\nproperty2\t\t{');
    expect(result).equal('property1\nproperty2 {');
  });
});

describe('checkTab', () => {
  it('inner structure', () => {
    const result = checkTab('property1{\nproperty2');
    expect(result).equal('property1{\n\tproperty2');
  });
  it('really deep inner query', () => {
    const result = checkTab('property1 {\nproperty2 {\nproperty3 {\nproperty4');
    expect(result).equal(
      'property1 {\n\tproperty2 {\n\t\tproperty3 {\n\t\t\tproperty4'
    );
  });
  it('with multiple properties on one level', () => {
    const result = checkTab('property1 {\nproperty2\nproperty3 {\nproperty4');
    expect(result).equal(
      'property1 {\n\tproperty2\n\tproperty3 {\n\t\tproperty4'
    );
  });
  it('check all for third level structure', () => {
    const result = checkTab(
      'property1 {\nproperty2\nproperty3 {\nproperty4\nproperty5\nproperty6'
    );
    expect(result).equal(
      'property1 {\n\tproperty2\n\tproperty3 {\n\t\tproperty4\n\t\tproperty5\n\t\tproperty6'
    );
  });
});

describe('checkFilter', () => {
  it('check spaces around ()', () => {
    const result = checkFilter('query( property1: 5 )');
    expect(result).equal('query(property1: 5)');
  });
  it('check space after :', () => {
    const result = checkFilter('query(property1:5)');
    expect(result).equal('query(property1: 5)');
  });
});

const finalTestInput = `
query ( 
  property1: "value"      )     {   
 a
       
 b
   
   
 
 c
 {     
 a1   a2
 a3
 }
 d
 }
`;

const finalTestOutput = `
query (property1: "value") {
\ta
\tb
\tc {
\t\ta1
\t\ta2
\t\ta3
\t}
\td
}
`;

describe('formatter', () => {
  it('applies all formatting functions in the correct order', () => {
    expect(formatter(finalTestInput)).equal(finalTestOutput);
  });
});
