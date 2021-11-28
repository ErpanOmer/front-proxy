export const initialValues = {
  proxyServerURL: localStorage.proxyServerURL || 'http://localhost:3000',
  targetServerURL: localStorage.targetServerURL || 'http://localhost:5000',
  remember: true
}

export const initialTheme = {
  primaryColor: '#1890ff',
  errorColor: '#ff4d4f',
  warningColor: '#faad14',
  successColor: '#52c41a',
  infoColor: '#1890ff'
}

export const initialStatus = {
  default: {
    tips: 'The proxy server has not been started',
    tipsType: 'secondary',
    badgeType: 'default',
    buttonText: 'Start',
    buttonType: 'primary',
    loading: false
  },
  connecting: {
    tips: 'Proxy server is starting...',
    tipsType: 'secondary',
    badgeType: 'default',
    buttonText: 'Starting...',
    buttonType: 'primary',
    loading: true
  },
  failed: {
    tips: 'The proxy server fails to start',
    tipsType: 'danger',
    badgeType: 'error',
    buttonText: 'Start',
    buttonType: 'primary',
    loading: false
  },
  connect: {
    tips: 'The proxy server has started',
    tipsType: 'success',
    badgeType: 'processing',
    buttonText: 'Shutdown',
    buttonType: 'danger',
    loading: false
  },
  disconnecting: {
    tips: 'The proxy server is shutting down...',
    tipsType: 'warning',
    badgeType: 'warning',
    buttonText: 'Shutting Down...',
    buttonType: 'danger',
    loading: true
  },
  disconnect: {
    tips: 'The proxy server is down',
    badgeType: 'error',
    tipsType: 'danger',
    buttonText: 'Start',
    buttonType: 'primary',
    loading: false
  }
}