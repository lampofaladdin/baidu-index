import { BaiduIndex } from '../src';
describe('baidu index init', () => {
    test('BaiduIndex throws an error', () => {
        const invalidToken = '';
        const invalidName = '';

        // 测试无效令牌时是否抛出错误
        expect(() => {
            new BaiduIndex(invalidToken, process.env.BAIDU_NAME!);
        }).toThrow();

        // 测试无效名称时是否抛出错误
        expect(() => {
            new BaiduIndex(process.env.BAIDU_TOKEN!, invalidName);
        }).toThrow();

        // 也可以更具体地检查抛出的错误类型或错误消息
        expect(() => {
            new BaiduIndex(invalidToken, invalidName);
        }).toThrow(Error);
    });
});
