export type OriginCreateTaskParmaType = {
  datasource: 'search' | 'feed';
  dateRange: {
    start: string;
    end: string;
  };
  device: Array<'all' | 'pc' | 'mobile '>;
  region: {
    province: string[];
    city: string[];
    isAll: boolean;
  };
  keyword: string[];
};

/**
 * 百度返回数据，通用格式
 */
export type BaiduIndexResponseCommenType = {
  header: {
    traceid: string;
    oprtime: number;
    rquota: number;
    failures: {
      code: number;
      position: string;
      message: string;
    }[];
    succ: 0 | 1;
    oprs: 0 | 1;
    quota: number;
    desc: 'success' | 'failure';
    status: number;
  };
};

export type OriginCreateTaskResponseType = BaiduIndexResponseCommenType & {
  body: {
    expand: Record<string, unknown>;
    data: [
      {
        quotaFreeze: number;
        quotaAvailable: number;
        taskId: string;
      }
    ];
  };
};

export type OriginGetResultResponseType = BaiduIndexResponseCommenType & {
  body: {
    expand: Record<string, unknown>;
    data: [
      {
        quotaFreeze: number;
        quotaAvailable: number;
        resultUrl: string;
        quotaCost: number;
        status: 'running' | 'finished' | 'expired';
        quotaReturn: number;
      }
    ];
  };
};

export type OriginCheckKeywordsResponseType = BaiduIndexResponseCommenType & {
  body: {
    expand: Record<string, unknown>;
    data: [
      {
        match: [
          {
            keyword: string;
            status: 1 | 0;
          }
        ];
      }
    ];
  };
};
