import type { RuleConfigType } from '../type';

// 正则校验错误，返回对应的错误提示
export const getPatternErrorMsg = (ruleName?: RuleConfigType['ruleName']) => {
  switch (ruleName) {
    case 'phone':
      return '手机号格式错误';
    default:
      return '';
  }
};

/**
 * @name 根据报错类型返回对应的错误提示
 * @param type 报错的类型
 * @param msg 用于补充的提示信息
 * @param ruleConfig 当前校验配置字段的值
 */
export const getErrorMessage = (
  type: string,
  msg?: string,
  ruleConfig?: RuleConfigType
): string => {
  const { ruleName, ruleValue } = ruleConfig || {};
  const errorType = type.includes('required') ? 'any.required' : type;
  // 所有'必填校验'的type，都转换为any.required
  switch (errorType) {
    case 'any.required':
      return '不能为空';
    case 'array.min':
      return `最少选择${ruleValue}项`;
    case 'array.max':
      return `最多选择${ruleValue}项`;
    case 'number.base':
      return '必须是数字类型';
    case 'number.min':
      return `不能小于${ruleValue}`;
    case 'number.max':
      return `不能大于${ruleValue}`;
    case 'number.precision':
      return `不能超过${ruleValue}位小数`;
    case 'string.base':
      return '必须为字符串类型';
    case 'string.email':
      return '邮箱格式错误';
    case 'string.empty':
      return '不能为空';
    case 'string.min':
      return `字符长度不能低于${ruleValue}`;
    case 'string.max':
      return `字符长度不能超过${ruleValue}`;
    case 'string.pattern.base':
      return getPatternErrorMsg(ruleName);
    default:
      return msg || '';
  }
};
