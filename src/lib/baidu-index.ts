import admZip from 'adm-zip';
import axios, { Axios } from 'axios';
import CsvToJson from 'csvtojson';
import { createWriteStream } from 'fs';
import { unlink } from 'fs/promises';
import * as iconv from 'iconv-lite';
import { tmpdir } from 'os';
import { join } from 'path';
import { finished } from 'stream/promises';
import { setTimeout } from 'timers/promises';
import {
    OriginCheckKeywordsResponseType,
    OriginCreateTaskParmaType,
    OriginCreateTaskResponseType,
    OriginGetResultResponseType,
} from './baidu-index.type';
import { BaiduIndexError } from './baidu-index.error';

export class BaiduIndex {
    accessToken: string;
    userName: string;
    axiosClient: Axios;
    constructor(accessToken: string, userName: string) {
        this.accessToken = accessToken;
        this.userName = userName;
        this.axiosClient = new Axios({
            baseURL: 'https://api.baidu.com/json/sms/service/IndexApiService/',
            transformRequest: (data) => {
                return JSON.stringify({
                    header: {
                        userName: this.userName,
                        accessToken: this.accessToken,
                        action: 'baiduIndexNodeSdk',
                    },
                    body: data,
                });
            },
            transformResponse: (data) => {
                return JSON.parse(data);
            },
        });
    }

    /**
   * 原生创建任务
   */
    async originCreateTask(
        params: OriginCreateTaskParmaType
    ): Promise<OriginCreateTaskResponseType> {
        const { data } = await this.axiosClient.post<OriginCreateTaskResponseType>(
            'createTask',
            params
        );
        return data;
    }

    /**
   * 原生查询任务状态
   */
    async originGgetResult(params: {
    taskId: string;
  }): Promise<OriginGetResultResponseType> {
        const { data } = await this.axiosClient.post<OriginGetResultResponseType>(
            'getResult',
            params
        );
        return data;
    }

    /**
   * 原生查询关键词是否收录
   */
    async originCheckKeywords(params: {
    keyword: string[];
  }): Promise<OriginCheckKeywordsResponseType> {
        const { data } =
      await this.axiosClient.post<OriginCheckKeywordsResponseType>(
          'checkKeywords',
          params
      );
        return data;
    }

    /**
   * 创建任务
   */
    async createTask(
        params: OriginCreateTaskParmaType
    ): Promise<{ taskId: string }> {
        const res = await this.originCreateTask(params);
        if (res.header.succ !== 1) {
            throw new BaiduIndexError(
                `${res.header.failures.map((i) => i.message).join(';')}`,
                'createTask'
            );
        }
        const taskId = res.body.data[0]?.taskId;
        if (!taskId) {
            throw new BaiduIndexError('taskId not found', 'createTask');
        }
        return {
            taskId,
        };
    }

    /**
   * 获取结果，内部方法
   */
    private async _fetchResult(taskId: string, timer: number): Promise<string> {
    // eslint-disable-next-line no-constant-condition
        while (true) {
            const res = await this.originGgetResult({ taskId });
            if (res.header.succ !== 1) {
                throw new BaiduIndexError(
                    `${res.header.failures.map((i) => i.message).join(';')}`,
                    'getResult'
                );
            }
            const result = res.body.data[0];
            if (!result) {
                throw new BaiduIndexError('result not found', 'getResult');
            }
            if (result.status === 'expired') {
                throw new BaiduIndexError('result was expired', 'getResult');
            }
            if (result.status === 'running') {
                await setTimeout(timer);
                continue;
            }
            return result.resultUrl;
        }
    }

    /**
   * 获取结果
   */
    async getResult<T>(taskId: string, timer = 60): Promise<Array<T>> {
        const fileUrl = await this._fetchResult(taskId, timer);

        const tmpDir = tmpdir();
        const zipFile = join(tmpDir, `${new Date().getTime()}.zip`);
        const writer = createWriteStream(zipFile);
        const res = await axios.get(fileUrl, { responseType: 'stream' });
        res.data.pipe(writer);
        await finished(writer);

        const zip = new admZip(zipFile);
        const zipEntries = zip.getEntries();
        const csvStr = iconv.decode(zipEntries[0].getData(), 'GBK');
        const result = CsvToJson({ trim: true }).fromString(csvStr);

        await unlink(zipFile);
        return result;
    }

    /**
   * 获取keywords map，返回是否存在状态
   */
    async checkKeywords(keyword: string[]): Promise<Map<string, boolean>> {
        const res = await this.originCheckKeywords({ keyword });
        if (res.header.succ !== 1) {
            throw new BaiduIndexError(
                `${res.header.failures.map((i) => i.message).join(';')}`,
                'checkKeywords'
            );
        }
        const match = res.body.data[0]?.match;
        if (!match) {
            throw new BaiduIndexError('match not found', 'checkKeywords');
        }
        return new Map(match.map((item) => [item.keyword, !!item.status]));
    }
}
