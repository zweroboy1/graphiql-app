export const setCaret = (contentElement: HTMLElement, count: number) => {
  // var el = document.getElementById("editable")
  const range = document.createRange();
  const selection = window.getSelection();

  const lastText = [...contentElement.childNodes].findLast(
    (childElement) => childElement.nodeName === '#text'
  );
  if (!lastText) {
    return;
  }
  // if (lastText.previousSibling && lastText?.previousSibling.nodeName === 'BR') {
  //   contentElement.removeChild(lastText.previousSibling);
  // }
  range.setStart(lastText, count);
  range.collapse(true);

  selection?.removeAllRanges();
  selection?.addRange(range);
};
