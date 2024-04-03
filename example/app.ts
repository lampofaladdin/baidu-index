import { BaiduIndex } from '../dist/lib/baidu-index';

async function example(){
    try{
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
    }catch(e){
        console.error(e);
    }

}

example();