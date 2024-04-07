[![ESLint](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml)
[![Node.js CI](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml)

[//]: # "[![npm version](https://badge.fury.io/js/@wddv/baidu-index)](https://badge.fury.io/js/@wddv/baidu-index)"

[![NPM downloads](http://img.shields.io/npm/dm/@wddv/baidu-index.svg?style=flat-square)](http://www.npmtrends.com/@wddv/baidu-index)

# @wddv/baidu-index

百度指数 Node.js SDK

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

[app.ts](example/app.ts)

## 引用

- [Baidu index](https://index.baidu.com/)
- [Baidu index Doc](https://dev2.baidu.com/content?sceneType=0&pageId=103441&nodeId=813&subhead=)