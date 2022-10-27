import type { Types } from 'joi';

// 表单数据
export interface FormDataType {
  [cid: string]: any;
}

// 校验规则
export type RulesType = {
  // 必填
  required?: boolean;
  // 最小
  min?: number;
  // 最大
  max?: number;
  // 精度
  precision?: number;
  [key: string]: any;
};

// 单个校验返回错误提示
export interface ErrorType extends ResultType {
  msg?: string;
  // joi的报错类型
  joiErrorType?: string;
  ruleName?: keyof RulesType;
}

// 所有字段返回的校验结果
export interface ResultType {
  // 是否通过
  pass?: boolean;
  // 字段唯一id
  cid?: string;
  // 字段名称
  label?: string;
  // 校验的数据
  value?: any;
  // 错误内容
  error?: ErrorType[];
}

// 校验规则的key，value
export interface RuleConfigType {
  // 校验类型，名称
  ruleName: keyof RulesType;
  // 校验规则的值
  ruleValue?: any;
}

// 校验所需的配置信息
export interface OptionsType {
  cid?: string;
  label?: string;
  type?: Types;
  rules?: RulesType;
}
