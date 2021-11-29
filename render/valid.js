export const validateURL = (v, isProxy) => {
  try {
    const url = new URL(v)
    if (!url.origin.includes('http://') && !url.origin.includes('https://')) {
      throw new Error('Must start with http:// or https')
    }

    if (url.hostname !== 'localhost' && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(url.hostname)) {
      throw new Error('The hostname error')
    }

    if (isProxy && url.port && (Number(url.port) <= 1024)) {
      throw new Error('The proxy server port number must be greater than 1024')
    }

    return url
  } catch (error) {
    throw new Error(error.message)
  }
}