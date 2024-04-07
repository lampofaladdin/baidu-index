import { BaiduIndex } from '../dist/lib/baidu-index';

async function example() {
    try {
        const baiduIndex = new BaiduIndex(
            process.env.BAIDU_TOKEN!,
            process.env.BAIDU_NAME!
        );

        const { taskId } = await baiduIndex.createTask({
            datasource: 'search',
            dateRange: {
                start: '2024-04-01',
                end: '2024-04-01',
            },
            device: ['all'],
            region: {
                province: [],
                city: [],
                isAll: true,
            },
            keyword: ['小米'],
        });

        const result = await baiduIndex.getResult(taskId);
        console.log(result);

        const keywordsMap1 = await baiduIndex.checkKeywords(['小米', 'symcxw']);
        console.log(keywordsMap1);

        const { accessToken } = await baiduIndex.refreshAccessToken();
        console.log(accessToken);

        const keywordsMap2 = await baiduIndex.checkKeywords(['小米', 'symcxw']);
        console.log(keywordsMap2);
    } catch (e) {
        console.error(e);
    }
}

example();
