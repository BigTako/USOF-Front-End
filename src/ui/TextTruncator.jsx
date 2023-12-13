function TextTruncator({ children, maxLen }) {
  const text = String(children);

  if (text.length > maxLen) {
    return text.substring(0, maxLen) + '...';
  }

  return text;
}

export default TextTruncator;
