# @eliduty/validator
![npm](https://img.shields.io/npm/dt/@eliduty/validator) ![npm](https://img.shields.io/npm/v/@eliduty/validator)

该工具库主要是验证器工具类，包含了日常常用的验证工具函数。

## 安装

```shell
npm install @eliduty/validator
// 或
yarn add @eliduty/validator
// 或
pnpm install @eliduty/validator
```
## 函数列表

```typescript
/**
 * 匹配电子邮件地址
 * @param val
 * @returns
 */
export declare function isEmail(val: string): boolean;

/**
 * 验证中国邮政编码
 * @param val
 * @returns
 */
export declare function isPostcode(val: string): boolean;

/**
 * 验证微信号，6至20位，以字母开头，字母，数字，减号，下划线
 * @param val
 * @returns
 */
export declare function isWeChatNum(val: string): boolean;

/**
 * 验证火车车次
 * @param val
 * @returns
 */
export declare function isTrainNum(val: string): boolean;

/**
 * 验证16进制颜色
 * @param val
 * @returns
 */
export declare function isColor16(val: string): boolean;

/**
 * 验证手机机身码(IMEI)
 * @param val
 * @returns
 */
export declare function isIMEI(val: string): boolean;

/**
 * 验证座机电话(国内)
 * @param val
 * @returns
 */
export declare function isTelephone(val: string): boolean;

/**
 * 验证手机号中国(宽松), 只要是13,14,15,16,17,18,19开头即可
 * @param val
 * @returns
 */
export declare function isPhone(val: string): boolean;

/**
 * 验证身份证号(2代,18位数字),最后一位是校验位,可能为数字或字符X
 * @param val
 * @returns
 */
export declare function isIDCard(val: string): boolean;

/**
 * 验证网址(支持端口和"?+参数"和"#+参数)
 * @param val
 * @returns
 */
export declare function isUrl(val: string): boolean;

/**
 * 验证统一社会信用代码
 * @param val
 * @returns
 */
export declare function isCreditCode(val: string): boolean;

/**
 * 判断是否为IP
 * @param val
 * @returns
 */
export declare function isIP(val: string): boolean;

/**
 * 验证子网掩码
 * @param val
 * @returns
 */
export declare function isSubnetMask(val: string): boolean;

/**
 * 验证版本号格式必须为X.Y.Z
 * @param val
 * @returns
 */
export declare function isVersion(val: string): boolean;

/**
 * 验证图片链接地址
 * @param val
 * @returns
 */
export declare function isImageUrl(val: string): boolean;

/**
 * 验证视频链接地址
 * @param val
 * @returns
 */
export declare function isVideoUrl(val: string): boolean;

/**
 * 验证银行卡号
 * @param val
 * @returns
 */
export declare function isBankNumber(val: string): boolean;

/**
 * 验证中文姓名
 * @param val
 * @returns
 */
export declare function isChineseName(val: string): boolean;

/**
 * 验证英文姓名
 * @param val
 * @returns
 */
export declare function isEnglishName(val: string): boolean;

/**
 * 验证车牌号(新能源+非新能源)
 * @param val
 * @returns
 */
export declare function isLicensePlateNumber(val: string): boolean;

/**
 * 验证护照（包含香港、澳门）
 * @param val
 * @returns
 */
export declare function isPassport(val: string): boolean;

/**
 * 验证qq号格式
 * @param val
 * @returns
 */
export declare function isQQ(val: string): boolean;

/**
 * 匹配正整数
 * @param val
 * @returns
 */
export declare function isPositiveNum(val: string): boolean;

/**
 * 匹配负整数
 * @param val
 * @returns
 */
export declare function isNegativeNum(val: string): boolean;

/**
 * 匹配整数
 * @param val
 * @returns
 */
export declare function isInteger(val: string): boolean;

/**
 * 匹配非负浮点数
 * @param val
 * @returns
 */
export declare function isNotNegativeFloatNum(val: string): boolean;

/**
 * 匹配由 26 个英文字母组成的字符串
 * @param val
 * @returns
 */
export declare function isAZaz(val: string): boolean;

/**
 * 匹配由 26 个英文字母的大写组成的字符串
 * @param val
 * @returns
 */
export declare function isAZ(val: string): boolean;

/**
 * 匹配由 26 个英文字母的小写组成的字符串
 * @param val
 * @returns
 */
export declare function isaz(val: string): boolean;

/**
 * 验证不能包含字母
 * @param val
 * @returns
 */
export declare function isNoWord(val: string): boolean;

/**
 * 验证中文和数字
 * @param val
 * @returns
 */
export declare function isCNAndNumber(val: string): boolean;

/**
 * 验证座机和手机号码
 * @param {String} val
 * @returns
 */
export declare function isTellAndPhoneNumber(val: string): boolean;

```
