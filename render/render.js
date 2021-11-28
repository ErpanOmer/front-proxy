import { connect, close } from './proxy.js'
import { initialStatus, initialValues, initialTheme } from './initial.js'
import { validateURL } from './valid.js'
// 引入组件
const { createElement, useState } = React
const { Input, Button, Checkbox, Typography, Badge, ConfigProvider, message } = antd
// antd 全局配置
ConfigProvider.config({ theme: initialTheme })

function App() {
  const [values, setValues] = useState(() => initialValues)
  const [status, setStatus] = useState(() => initialStatus.default)

  const onSubmit = async () => {
    // 如果已启动
    if (status.tipsType === 'success') {
      setStatus(() => initialStatus.disconnecting)
      // 关闭代理服务器
      await close()
      return setTimeout(setStatus, 1500, () => initialStatus.disconnect)
    }

    setStatus(() => initialStatus.connecting)
    try {
      const url = validateURL(values.targetServerURL)
      const [proxyServerURL, targetServerURL] = await connect(url)

      setValues({
        ...values,
        proxyServerURL,
        targetServerURL
      })
      setTimeout(setStatus, 1500, () => initialStatus.connect)
      // 是否存储
      localStorage.proxyServerURL = values.remember ? proxyServerURL : ''
      localStorage.targetServerURL = values.remember ? targetServerURL : ''
    } catch (e) {
      setTimeout(setStatus, 1500, () => initialStatus.failed)
      setTimeout(message.warning, 1000, e.message)
    }
  }

  const onChange = (k, v) => setValues({
    ...values,
    [k]: v
  })

  return createElement(
    ConfigProvider, {
    componentSize: 'small'
  },
    [
      createElement(Input, {
        value: values.proxyServerURL,
        addonBefore: 'Proxy Server',
        readOnly: true,
        onChange: (e) => onChange('proxyServerURL', e.target.value)
      }),
      createElement(Input, {
        value: values.targetServerURL,
        addonBefore: 'Target Server',
        placeholder: 'Pleace Enter...',
        readOnly: status.tipsType === 'success',
        onChange: (e) => onChange('targetServerURL', e.target.value)
      }),
      createElement(
        'div', {
        className: 'checkbox'
      },
        createElement(
          Checkbox, {
          checked: values.remember,
          disabled: status.tipsType === 'success',
          onChange: (e) => onChange('remember', e.target.checked)
        },
          'Save'
        )
      ),
      createElement(
        'div', {
        className: 'buttons'
      },
        createElement(
          Button, {
          type: status.buttonType,
          onClick: onSubmit,
          block: true,
          ghost: true,
          disabled: status.loading,
          loading: status.loading
        },
          status.buttonText
        )
      ),
      createElement('div', {
        className: 'tips'
      }, [
        createElement(Badge, { status: status.badgeType }),
        createElement(Typography.Text, {
          type: status.tipsType
        }, status.tips),
      ])
    ]
  )
}

ReactDOM.render(createElement(App), document.querySelector('#app'))