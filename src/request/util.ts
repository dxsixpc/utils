import type { AxiosError } from 'axios';
import type { ErrorMessageType } from './type';
import { dataToString } from '../helpers';

interface CodeMessageType {
  [code: number]: string;
}

// 自定义状态码提示
export const codeMessage: CodeMessageType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '请求有错误，请重试！',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};

// 获取对应的报错信息
export const getErrorMsg = (error: AxiosError): ErrorMessageType => {
  const status = error?.response?.status as keyof typeof codeMessage;
  return {
    error,
    status,
    response: error?.response,
    message: dataToString(error?.response?.data),
    codeMessage: codeMessage[status],
    statusText: error?.response?.statusText
  };
};
