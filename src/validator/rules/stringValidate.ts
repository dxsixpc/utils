import Joi from 'joi';
import { isNil } from 'lodash';
import type { RuleConfigType } from '../type';

/**
 * @name 字符串类型数据校验
 * @param data 需要校验的数据
 * @param ruleConfig 校验规则配置
 */
const stringValidate = (data: any, ruleConfig: RuleConfigType) => {
  const { ruleName, ruleValue } = ruleConfig;
  if (isNil(ruleValue)) return Joi.string().allow('').validate(data);
  switch (ruleName) {
    case 'min':
      return Joi.string().min(ruleValue).allow('').validate(data);
    case 'max':
      return Joi.string().max(ruleValue).allow('').validate(data);
    case 'required':
      return Joi.string().required().validate(data);
    case 'email':
      return Joi.string()
        .email({ tlds: { allow: false } })
        .allow('')
        .validate(data);
    case 'phone':
      return Joi.string()
        .pattern(
          /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        )
        .allow('')
        .validate(data);
    default:
      return Joi.string().allow('').validate(data);
  }
};

export default stringValidate;
