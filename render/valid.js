export const validateURL = v => {
  try {
    const url = new URL(v)
    if (!url.origin.includes('http://') && !url.origin.includes('https://')) {
      throw new Error('Must start with http:// or https')
    }

    if (url.hostname !== 'localhost' && !/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(url.hostname)) {
      throw new Error('Hostname error')
    }

    return url.href
  } catch (error) {
    throw new Error(error.message)
  }
}