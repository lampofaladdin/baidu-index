export class BaiduIndexError extends Error {
    constructor(msg: string, funcName = 'unknow') {
        super();
        this.message = `BaiduIndex Error: ${msg}`;
        this.name = funcName;
    }
}
