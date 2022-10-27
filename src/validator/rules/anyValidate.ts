import Joi from 'joi';
import type { RuleConfigType } from '../type';

/**
 * @name 字符串类型数据校验
 * @param data 需要校验的数据
 * @param ruleConfig 校验规则配置
 */
const anyValidate = (data: any, ruleConfig: RuleConfigType) => {
  const { ruleName } = ruleConfig;
  switch (ruleName) {
    case 'required':
      return Joi.required().validate(data);
    default:
      return Joi.any().validate(data);
  }
};

export default anyValidate;
