[![ESLint](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml)
[![Node.js CI](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml)

[//]: # "[![npm version](https://badge.fury.io/js/@wddv/baidu-index)](https://badge.fury.io/js/@wddv/baidu-index)"

[![NPM downloads](http://img.shields.io/npm/dm/@wddv/baidu-index.svg?style=flat-square)](http://www.npmtrends.com/@wddv/baidu-index)

# @wddv/baidu-index

Baidu index sdk for Node.js.

## Installation

```
npm install --save @wddv/baidu-index
```

## Usage

```typescript
const baiduIndex = new BaiduIndex(
        process.env.BAIDU_TOKEN!,
        process.env.BAIDU_NAME!
    );
    const { taskId } = await baiduIndex.createTask({
        datasource: 'search',
        dateRange: {
            start: '2024-04-01',
            end: '2024-04-01'
        },
        device: ['all'],
        region: {
            province: [],
            city: [],
            isAll: true
        },
        keyword: ['小米']
    });
    const result = await baiduIndex.getResult(taskId);
    console.log(result);
```

[app.ts](example/app.ts)

## Reference

- [Baidu index](https://index.baidu.com/)
- [Baidu index Doc](https://dev2.baidu.com/content?sceneType=0&pageId=103441&nodeId=813&subhead=)
