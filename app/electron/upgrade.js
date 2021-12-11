const https = require('https')
const semver = require('semver')
const { dialog } = require('electron')

const bucketUrl = `https://balqish-oss-service.oss-cn-shenzhen.aliyuncs.com/front-proxy/${process.platform}/`

// 请求获取 upgrade.json 文件
function getUpgradeJson(url) {
  return new Promise(resolve => {
    https.get(url, response => {
      if (response.statusCode === 200) {
        response.setEncoding('utf8')
        // 原始数据
        let rawData = ''
        response.on('data', chunk => rawData += chunk)
        response.on('end', () => {
          try {
            resolve(JSON.parse(rawData))
          } catch (e) {
            resolve({})
          }
        })
      }
    }).on('error', () => {
      resolve({})
    })
  })
}

function downloadUpgrade (url) {
  console.log(url)
}

async function checkUpgrade () {
  const json = await getUpgradeJson(bucketUrl + 'upgrade.json')

  if (!json.version || !json.package) {
    return false
  }

  // 更新是否可用
  const avaliable = semver.gt(json.version, process.env.npm_package_version)
  // 如果不可用
  if (!avaliable) {
    return
  }

  // dialog
  const { response } = await dialog.showMessageBox({
    title: '更新',
    message: '发现新版本，需要更新吗？',
    type: 'question',
    icon: 'public/icon.ico',
    buttons: ['更新', '取消'],
    noLink: true
  })

  // 用户需要更新
  response === 0 && downloadUpgrade(bucketUrl + json.package)
}

module.exports = {
  checkUpgrade
}