/*
 * @Author: eliduty
 * @Github: https://github.com/eliduty
 * @Date: 2021-06-01 16:09:48
 * @LastEditors: eliduty
 * @LastEditTime: 2024-07-08 15:29:00
 * @Description: 验证器
 */

/**
 * 匹配电子邮件地址
 * @param val
 * @returns
 */
export function isEmail(val: string) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g.test(
    val
  );
}

/**
 * 验证中国邮政编码
 * @param val
 * @returns
 */
export function isPostcode(val: string) {
  return /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/g.test(val);
}

/**
 * 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
 * @param val
 * @returns
 */
export function isWeChatNum(val: string) {
  return /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/g.test(val);
}

/**
 * 验证火车车次
 * @param val
 * @returns
 */
export function isTrainNum(val: string) {
  return /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(val);
}
/**
 * 验证16进制颜色
 * @param val
 * @returns
 */
export function isColor16(val: string) {
  return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/g.test(val);
}

/**
 * 验证手机机身码(IMEI)
 * @param val
 * @returns
 */
export function isIMEI(val: string) {
  return /^\d{15,17}$/g.test(val);
}

/**
 * 验证座机电话(国内)
 * @param val
 * @returns
 */
export function isTelephone(val: string) {
  return /\d{3}-\d{8}|\d{4}-\d{7}/g.test(val);
}

/**
 * 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @param val
 * @returns
 */
export function isPhone(val: string) {
  return /^(?:(?:\+|00)86)?1[3-9]\d{9}$/g.test(val);
}

/**
 * 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param val
 * @returns
 */
export function isIDCard(val: string) {
  return /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/g.test(
    val
  );
}

/**
 * 验证网址(支持端口和"?+参数"和"#+参数)
 * @param val
 * @returns
 */
export function isUrl(val: string) {
  return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/g.test(val);
}

/**
 * 验证统一社会信用代码
 * @param val
 * @returns
 */
export function isCreditCode(val: string) {
  return /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/g.test(val);
}

/**
 * 判断是否为IP
 * @param val
 * @returns
 */
export function isIP(val: string) {
  return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(
    val
  );
}

/**
 * 验证子网掩码
 * @param val
 * @returns
 */
export function isSubnetMask(val: string) {
  return /^(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/g.test(
    val
  );
}

/**
 * 验证版本号格式必须为X.Y.Z
 * @param val
 * @returns
 */
export function isVersion(val: string) {
  return /^\d+(?:\.\d+){2}$/g.test(val);
}

/**
 * 验证图片链接地址
 * @param val
 * @returns
 */
export function isImageUrl(val: string) {
  return /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(val);
}

/**
 * 验证视频链接地址
 * @param val
 * @returns
 */
export function isVideoUrl(val: string) {
  return /^https?:\/\/(.+\/)+.+(\.(swf|avi|flv|mpg|rm|mov|wav|asf|3gp|mkv|rmvb|mp4))$/i.test(val);
}

/**
 * 验证银行卡号
 * @param val
 * @returns
 */
export function isBankNumber(val: string) {
  return /^[1-9]\d{9,29}$/g.test(val);
}

/**
 * 验证中文姓名
 * @param val
 * @returns
 */
export function isChineseName(val: string) {
  return /^(?:[\u4e00-\u9fa5·]{2,16})$/g.test(val);
}

/**
 * 验证英文姓名
 * @param val
 * @returns
 */
export function isEnglishName(val: string) {
  return /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/g.test(val);
}

/**
 * 验证车牌号(新能源+非新能源)
 * @param val
 * @returns
 */
export function isLicensePlateNumber(val: string) {
  return /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/g.test(
    val
  );
}

/**
 * 验证护照（包含香港、澳门）
 * @param val
 * @returns
 */
export function isPassport(val: string) {
  return /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/g.test(
    val
  );
}

/**
 * 验证qq号格式
 * @param val
 * @returns
 */
export function isQQ(val: string) {
  return /^[1-9][0-9]{4,10}$/g.test(val);
}

/**
 * 匹配正整数
 * @param val
 * @returns
 */
export function isPositiveNum(val: string) {
  return /^[1-9]\d*$/.test(val.toString());
}

/**
 * 匹配负整数
 * @param val
 * @returns
 */
export function isNegativeNum(val: string) {
  return /^-[1-9]\d*$/.test(val.toString());
}

/**
 * 匹配整数
 * @param val
 * @returns
 */
export function isInteger(val: string) {
  return /^(-|\+)?\d+$/.test(val.toString());
}

/**
 * 匹配非负浮点数
 * @param val
 * @returns
 */
export function isNotNegativeFloatNum(val: string) {
  return /^\d+(\.\d+)?$/.test(val.toString());
}

/**
 * 匹配由 26 个英文字母组成的字符串
 * @param val
 * @returns
 */
export function isAZaz(val: string) {
  return /^[A-Za-z]+$/.test(val);
}

/**
 * 匹配由 26 个英文字母的大写组成的字符串
 * @param val
 * @returns
 */
export function isAZ(val: string) {
  return /^[A-Z]+$/.test(val);
}

/**
 * 匹配由 26 个英文字母的小写组成的字符串
 * @param val
 * @returns
 */
export function isaz(val: string) {
  return /^[a-z]+$/.test(val);
}

/**
 * 验证不能包含字母
 * @param val
 * @returns
 */
export function isNoWord(val: string) {
  return /^[^A-Za-z]*$/g.test(val);
}

/**
 * 验证中文和数字
 * @param val
 * @returns
 */
export function isCNAndNumber(val: string) {
  return /^((?:[\u3400-\u4DB5\u4E00-\u9FEA\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0])|(\d))+$/g.test(
    val
  );
}

/**
 * 验证座机和手机号码
 * @param {String} val
 * @returns
 */
export function isTellAndPhoneNumber(val: string) {
  const tellReg = /(\d{3,4}-?)(\d{3,4}-?)(\d{3,4})/;
  const phReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  const prefixReg = /^[1][3,4,5,6,7,8,9]/;
  if (!val) return !val;
  if (val.indexOf('-') > 0 || !prefixReg.test(val.trim())) return tellReg.test(val.trim());
  return phReg.test(val.trim());
}
