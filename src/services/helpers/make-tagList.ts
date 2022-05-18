const makeTagList = (string: string) => {
  const tagList = string.replace(/\s/g, '').split(',');
  return tagList;
};

export default makeTagList;
