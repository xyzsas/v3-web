window.UEC = {}

UEC['0000'] = 'Supported by ITI'
UEC['0001'] = '服务内部错误'
UEC['0002'] = '参数错误'
UEC['0003'] = '请求方法错误'
UEC['0004'] = '权限不足'
UEC['0005'] = '身份验证错误'

UEC['XYZSAS-0001'] = '您的账户尚未激活，请前往激活'
UEC['XYZSAS-0002'] = '检测到安全风险，请重试' // random error
UEC['XYZSAS-0003'] = '身份验证失败' // username/password error
UEC['XYZSAS-0004'] = '身份验证失败' // Aauth login error
UEC['XYZSAS-0005'] = '账户不存在或已经激活' // activation error
UEC['XYZSAS-0006'] = '原密码不正确' // change password error
UEC['XYZSAS-0007'] = '第三方登录绑定失败' // link sas and aauth failed

// affair errors
UEC['XYZSAS-0021'] = '事务不存在' // affair not found
UEC['XYZSAS-0022'] = '拒绝访问' // access denied
UEC['XYZSAS-0023'] = '表单错误' // general form error (should not occur if use proper FE)
UEC['XYZSAS-0024'] = '剩余名额不足' // list space is not enough
UEC['XYZSAS-0025'] = '正在处理您的请求，请稍后再试！' // In Process

// admin errors
UEC['XYZSAS-0051'] = '用户授权失败：权限不足'