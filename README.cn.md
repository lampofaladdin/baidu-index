[![ESLint](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml)
[![Node.js CI](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml)

[//]: # "[![npm version](https://badge.fury.io/js/@wddv/baidu-index)](https://badge.fury.io/js/@wddv/baidu-index)"

[![NPM downloads](http://img.shields.io/npm/dm/@wddv/baidu-index.svg?style=flat-square)](http://www.npmtrends.com/@wddv/baidu-index)

# @wddv/baidu-index

百度指数 Node.js SDK

[此接口仅面向百度指数用户用以刷新OAuth访问令牌。**访问指数接口的access_token有效期为24小时**，在到期失效前可请求此接口换取新的有效期为24小时的access_token。非百度指数授权用户无法使用该接口进行token刷新，会返回错误码**9016002**(无权限)。若超过24小时未通过接口形式进行刷新，则需要登录百度指数官网->API接口界面手动获取token进行token刷新](https://dev2.baidu.com/content?sceneType=0&pageId=103849&nodeId=1038&subhead=)

因为超过24小时，token 就会失效，必须去百度指数官网获取新的 token

建议用户自己保存 token，并在24小时内请求刷新 token 接口

## 必须

Node.js 版本 >= 18

## 安装

```
npm install --save @wddv/baidu-index
```


## 使用

```typescript
// 初始化实例
const baiduIndex = new BaiduIndex(
  process.env.BAIDU_TOKEN!,
  process.env.BAIDU_NAME!
);
// 创建任务
const { taskId } = await baiduIndex.createTask({
  datasource: "search",
  dateRange: {
    start: "2024-04-01",
    end: "2024-04-01",
  },
  device: ["all"],
  region: {
    province: [],
    city: [],
    isAll: true,
  },
  keyword: ["小米"],
});
// 获取任务结果
const result = await baiduIndex.getResult(taskId);
console.log(result);
```

## 示例

[app.ts](example/app.ts)

## 引用

- [Baidu index](https://index.baidu.com/)
- [Baidu index Doc](https://dev2.baidu.com/content?sceneType=0&pageId=103441&nodeId=813&subhead=)