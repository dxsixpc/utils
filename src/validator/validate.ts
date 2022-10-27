import type { Types } from 'joi';
import { isBoolean } from 'lodash';
import { getErrorMessage } from './helpers';
import { validateRule } from './rules';
import type { OptionsType, ResultType } from './type';

/**
 * @name 单个数据的格式校验
 * @param data 需要校验的数据
 * @param dataType 需要校验的数据类型（string,number,array等）
 * @param options 校验规则及配置
 */
export const validate = (data: any, dataType: Types, options: OptionsType) => {
  const { cid, label, rules = {} } = options;

  // 默认校验结果
  const result: ResultType = {
    pass: true,
    cid,
    label,
    value: data,
    error: []
  };

  // 每个规则单独校验
  Object.entries(rules).forEach(([ruleName, ruleValue]) => {
    // 若规则值是布尔值，且为false，则跳过该规则
    if (isBoolean(ruleValue) && !ruleValue) return;
    const ruleConfig = { ruleName, ruleValue };
    const currResult = validateRule(data, dataType, ruleConfig);
    if (currResult.error) {
      const [{ message, type }] = currResult.error.details;
      result.pass = false;
      result.error?.push({
        ruleName,
        joiErrorType: type,
        msg: getErrorMessage(type, message, ruleConfig)
      });
    }
  });

  return result;
};
