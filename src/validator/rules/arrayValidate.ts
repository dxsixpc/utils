import Joi from 'joi';
import { isNil } from 'lodash';
import type { RuleConfigType } from '../type';

/**
 * @name 数字类型数据校验
 * @param data 需要校验的数据
 * @param ruleConfig 校验规则配置
 */
const arrayValidate = (data: any, ruleConfig: RuleConfigType) => {
  const { ruleName, ruleValue } = ruleConfig;
  if (isNil(ruleValue)) return Joi.array().validate(data);
  switch (ruleName) {
    case 'min':
      return Joi.array().min(ruleValue).validate(data);
    case 'max':
      return Joi.array().max(ruleValue).validate(data);
    default:
      return Joi.array().validate(data);
  }
};

export default arrayValidate;
