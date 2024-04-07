[![ESLint](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/eslint.yml)
[![Node.js CI](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml/badge.svg)](https://github.com/lampofaladdin/baidu-index/actions/workflows/node.js.yml)

[//]: # "[![npm version](https://badge.fury.io/js/@wddv/baidu-index)](https://badge.fury.io/js/@wddv/baidu-index)"

[![NPM downloads](http://img.shields.io/npm/dm/@wddv/baidu-index.svg?style=flat-square)](http://www.npmtrends.com/@wddv/baidu-index)

# @wddv/baidu-index

Baidu index sdk for Node.js.

This interface is only available to Baidu Index users for refreshing OAuth access tokens. **The access token for accessing the index interface is valid for 24 hours.** Before it expires, you can request this interface to obtain a new access token with a validity period of 24 hours. Non-Baidu Index authorized users cannot use this interface to refresh tokens and will receive error code **9016002** (no permission). If more than 24 hours have passed without refreshing through the interface, you will need to manually obtain a token by logging in to the Baidu Index official website and navigating to the API interface section.

Because the token expires after 24 hours, users must obtain a new token from the Baidu Index official website.

I recommend that users save their tokens and request the token refresh interface within 24 hours.

[中文文档](./README.cn.md)

## Installation

```
npm install --save @wddv/baidu-index
```

## Required

Node.js verion >= 18

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

## Example

[app.ts](example/app.ts)


## Reference

- [Baidu index](https://index.baidu.com/)
- [Baidu index Doc](https://dev2.baidu.com/content?sceneType=0&pageId=103441&nodeId=813&subhead=)
