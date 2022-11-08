const getMetaContent = (index: number, collection: HTMLMetaElement[], name: string): string => {
  if (!collection[index]) {
    return "";
  }
  if (collection[index].getAttribute("name") === name) {
    return collection[index].getAttribute("content") || "";
  }
  return getMetaContent(index + 1, collection, name);
};
export default getMetaContent;
