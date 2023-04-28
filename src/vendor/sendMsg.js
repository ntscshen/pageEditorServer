const Core = require('@alicloud/pop-core');
// 发送短信验证码
const sendSmsCodeMsg = (phoneNumber, smsCode) => {
  if (!phoneNumber || !smsCode) return Promise.reject('手机号或验证码不能为空');
  // return Promise.resolve('ok'); // 模拟发送成功

  const client = new Core({
    accessKeyId: 'xx',
    accessKeySecret: 'yy',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25',
  });
  const params = {
    PhoneNumbers: phoneNumber, //接收短信的手机号码
    SignName: 'lowCode', //短信签名名称
    TemplateCode: 'SMS_460725207', //短信模板CODE
    TemplateParam: `{"code":"${smsCode}"}`, //短信模板变量对应的实际值，JSON格式
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
