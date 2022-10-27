import type { Types } from 'joi';
import anyValidate from './anyValidate';
import arrayValidate from './arrayValidate';
import numberValidate from './numberValidate';
import stringValidate from './stringValidate';
import type { RuleConfigType } from '../type';

/**
 * @name 根据类型加载对应的数据校验
 * @param data 需要校验的数据
 * @param type 校验规则的名称
 * @param ruleConfig 校验规则的值
 */
export const validateRule = (
  data: any,
  type: Types,
  ruleConfig: RuleConfigType
) => {
  switch (type) {
    case 'any':
      return anyValidate(data, ruleConfig);
    case 'array':
      return arrayValidate(data, ruleConfig);
    case 'string':
      return stringValidate(data, ruleConfig);
    case 'number':
      return numberValidate(data, ruleConfig);
    default:
      return anyValidate(data, ruleConfig);
  }
};
