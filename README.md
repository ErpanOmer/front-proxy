# Proxy Tool

### 背景

最近在公司前端项目中发现，每当拉取主分支代码时（只能pull,不能push），我本地 ProxyTable 代码总是被修改，甚至会造成冲突。

原因：假设前端项目n个人去开发，每个人本地的 ProxyTable 对应着n + n个不同的后端服务, 等到团队发布新版本，Leader强制合并这部分代码(不影响生产环境)，让我们再拉取主分支时，ProxyTable 又被改了。

这时候我的心情时这样的
![](./x.jpg#pic_center)
