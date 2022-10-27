import Joi from 'joi';
import { isNil } from 'lodash';
import type { RuleConfigType } from '../type';

/**
 * @name 数字类型数据校验
 * @param data 需要校验的数据
 * @param ruleConfig 校验规则配置
 */
const numberValidate = (data: any, ruleConfig: RuleConfigType) => {
  const { ruleName, ruleValue } = ruleConfig;
  if (isNil(ruleValue)) return Joi.number().validate(data);
  switch (ruleName) {
    case 'min':
      return Joi.number().min(ruleValue).validate(data);
    case 'max':
      return Joi.number().max(ruleValue).validate(data);
    case 'precision':
      return Joi.number().strict().precision(ruleValue).validate(data);
    case 'required':
      return Joi.number().required().validate(data);
    default:
      return Joi.number().validate(data);
  }
};

export default numberValidate;
