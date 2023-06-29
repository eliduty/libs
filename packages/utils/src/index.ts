/**
 * 将kebabCase转换成pascalCase abc-efg => AbcEfg
 * @param {*} str
 * @returns
 */
export function pascalCase(str: string) {
  return capitalize(camelCase(str));
}
/**
 * 将kebabCase转换成camelCase abc-efg => abcEfg
 * @param {*} str
 * @returns
 */
export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

/**
 * pascalCase、camelCase 转换为kebabCase AbcEfg => abc-efg  abcEfg=>abc-efg
 * @param {*} str
 * @returns
 */
export function kebabCase(str: string) {
  const result = str.replace(/([A-Z])/g, ' $1').trim();
  return result.split(' ').join('-').toLowerCase();
}

/**
 * 首字母大写
 * @param {*} str
 * @returns
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
