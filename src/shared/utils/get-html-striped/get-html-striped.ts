export const getHtmlStripedString = (str: string) => str.replace(/(<([^>]+)>)/ig, '');