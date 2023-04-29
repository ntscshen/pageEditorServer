const Core = require('@alicloud/pop-core');
const { smsConfig, AKSKConfig } = require('../config/dev');
/**
 * 发送短信验证码
 * @param {string} phoneNumber 手机号
 * @param {string} smsCode 验证码
 * @returns {object} 发送结果
 * */
const sendSmsCodeMsg = (phoneNumber, smsCode) => {
  if (!phoneNumber || !smsCode) return Promise.reject('手机号或验证码不能为空');
  // return Promise.resolve('ok'); // 模拟发送成功

  const client = new Core({
    ...AKSKConfig,
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  });
  const params = {
    PhoneNumbers: phoneNumber, //接收短信的手机号码
    TemplateParam: `{"code":"${smsCode}"}`, //短信模板变量对应的实际值，JSON格式
    ...smsConfig,
  };

  return new Promise((resolve, reject) => {
    client
      .request('SendSms', params, { method: 'POST' })
      .then(result => {
        console.log('短信发送成功: ', JSON.stringify(result));
        resolve(result);
      })
      .catch(ex => {
        console.log(ex);
        reject(ex);
      });
  });
};

module.exports = {
  sendSmsCodeMsg,
};
