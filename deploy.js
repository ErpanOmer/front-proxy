const { move, outputJson } = require('fs-extra')
const { tgz } = require('compressing')
const path = require('path')
const fs = require('fs')
const pack = require('./app/package.json')
const OSS = require('ali-oss')

function fileLengthFormat(total, n = 1) {
  const len = total / (1024.0)
  if (len > 1000) {
    return fileLengthFormat(len, ++n)
  }

  switch (n) {
    case 1:
      return len.toFixed(2) + "KB"
    case 2:
      return len.toFixed(2) + "MB"
    case 3:
      return len.toFixed(2) + "GB"
    case 4:
      return len.toFixed(2) + "TB"
  }
}

async function upload () {
  let client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-shenzhen',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    
    bucket: 'balqish-oss-service',
  })

  const files = fs.readdirSync('package')
  for (const file of files) {
    await client.multipartUpload(`front-proxy/${process.platform}/${file}`, `package/${file}`, {
      progress: (percent, { fileSize } = { fileSize: 0}) => {
        console.log(`文件名：${file}----上传进度：${fileLengthFormat(parseInt(fileSize * percent))}/${fileLengthFormat(fileSize)}(${(percent * 100).toFixed(2)}%)`)
      }
    })
  }

  console.log('upload success!')
}

module.exports = function ({ artifactPaths, ...other }) {
  console.log(other)
  // loop move artifact's
  for (const artifact of artifactPaths) {
    // windows
    if (process.platform === 'win32' && path.extname(artifact) === '.exe') {
      move(artifact, `package/${path.basename(artifact)}`)
    }

    // mac
    // linux
  }

  // upgrade package
  const name = 'upgrade.tgz'
  tgz.compressDir('app', `package/${name}`)
  // upgrade json
  outputJson('package/upgrade.json', {
    version: pack.version,
    package: name,
    releaseDate: new Date()
  }, {
    spaces: 2,
    encoding: 'utf8'
  })

  // upload to OSS
}