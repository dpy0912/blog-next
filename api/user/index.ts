/*
 * @Author: bugdr
 * @Date: 2022-06-28 12:32:03
 * @LastEditors: bugdr
 * @LastEditTime: 2022-06-30 15:43:14
 * @FilePath: \blog-next\api\user\index.ts
 * @Description:
 */
import { defHttp } from '@utils/http';
import type { DoLoginType, GetAdminInfoType, GetEmailCodeType, RegisterUserType } from './type';

export enum UserApi {
  GetCaptcha = '/user/captcha',
  DoLogin = '/user/login/',
  CheckToken = '/user/check-token',
  Logout = '/user/logout',
  RegisterUser = '/user/join_in',
  GetEmailCode = '/user/verify_code',
  GetAdminUserInfo = '/user/admin/info',
}

/**
 * 登录
 * @param data
 * @returns
 */
export const doLogin = (data: DoLoginType) => {
  const { captchaCode, ...user } = data;
  return defHttp.post({
    url: `${UserApi.DoLogin}${captchaCode}`,
    data: user,
  });
};

/**
 * 检查用户是否登录
 * @returns
 */
export const checkToken = () => {
  return defHttp.get({
    url: UserApi.CheckToken,
  });
};

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return defHttp.get({
    url: UserApi.Logout,
  });
};

/**
 * 用户注册的接口
 * @param data
 * @returns
 */
export const registerUser = (data: RegisterUserType) => {
  const { emailCode, captchaCode, ...params } = data;
  return defHttp.post({
    url: `${UserApi.RegisterUser}?email_code=${emailCode}&captcha_code=${captchaCode}`,
    data: params,
  });
};

/**
 * 获取邮箱验证码
 * @param params
 * @returns
 */
export const getEmailCode = (params: GetEmailCodeType) => {
  return defHttp.get({
    url: `${UserApi.GetEmailCode}`,
    params,
  });
};

/**
 * 获取管理员信息
 * @param params
 * @returns
 */
export const getAdminInfo = (params: GetAdminInfoType) => {
  return defHttp.get({
    url: `${UserApi.GetAdminUserInfo}`,
    params,
  });
};
