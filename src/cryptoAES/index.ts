// * 加载 CryptoJS
import CryptoJS from 'crypto-js';
import { dataToString } from '../helpers';

// * 后文变量命名中的 DS 表示 DataStructure，Crypto所用的数据结构
const defaultAESCfg = {
  key: '1111111111111111',
  iv: '0000000000000000',
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7,
  encryptedFormat: 'Hex',
  decryptedFormat: 'Utf8'
};

export interface AESConfigType {
  useBase64: boolean;
}

/**
 * @name 加密
 * @param data 需要加密的文本数据
 * @param key 密钥
 * @param opt
 */
export const encrypt = (data: any, key: string, AESconfig: AESConfigType) => {
  // 若没有数据则直接返回空
  if (!data || !key) return;
  const { useBase64, ...rest } = AESconfig;

  // 处理data数据,将数据转为字符串
  const cryptoData = CryptoJS.enc.Utf8.parse(dataToString(data));

  // 处理key数据
  // * 截取16位key
  const Key16 = String(key).slice(0, 16).padEnd(16);
  const cryptoKey = CryptoJS.enc.Utf8.parse(Key16);

  // 处理AES相关配置
  const AEScfg = {
    iv: CryptoJS.enc.Utf8.parse(defaultAESCfg.iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    ...rest
  };

  // * CryptoJS.AES.encrypt 只能解析 DS， 因此需要将 str 结构化
  const encryptedDS = CryptoJS.AES.encrypt(cryptoData, cryptoKey, AEScfg);
  const encryptedStr = encryptedDS.ciphertext.toString().toUpperCase();
  return useBase64 ? encryptedDS.toString() : encryptedStr;
};

/**
 * @name 解密
 * @param text 需要解密的文本数据
 * @param key 密钥
 * @param AESconfig 解密配置
 */
export const decrypt = (
  text: string,
  key: string,
  AESconfig: AESConfigType
) => {
  // 若没有数据则直接返回空
  if (!text || !key) return;
  const { useBase64, ...rest } = AESconfig;

  // 处理text
  const CryptoDS = CryptoJS.enc.Hex.parse(text);
  const cryptoText = useBase64 ? text : CryptoJS.enc.Base64.stringify(CryptoDS);

  // * 截取16位key
  const Key16 = String(key).slice(0, 16).padEnd(16);
  const cryptoKey = CryptoJS.enc.Utf8.parse(Key16);

  // 处理AES相关配置
  const AEScfg = {
    iv: CryptoJS.enc.Utf8.parse(defaultAESCfg.iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    ...rest
  };

  // 解密
  const decryptedDS = CryptoJS.AES.decrypt(cryptoText, cryptoKey, AEScfg);
  const decryptedStr = decryptedDS.toString(CryptoJS.enc.Utf8);

  // * 如果是对象等结构，尝试 JSON 化
  let parsedData = decryptedStr;
  try {
    parsedData = JSON.parse(decryptedStr);
  } catch (error) {
    console.log(error);
  }

  return parsedData;
};
