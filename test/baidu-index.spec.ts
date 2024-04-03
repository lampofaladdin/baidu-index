import { BaiduIndex } from "../src";
describe("baidu index init", () => {
  test("BaiduIndex throws an error", () => {
    const invalidToken = "";
    const invalidName = "";

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

describe("BaiduIndex create task and get result", () => {
  let taskId = "";
  const baiduIndex = new BaiduIndex(
    process.env.BAIDU_TOKEN!,
    process.env.BAIDU_NAME!
  );
  test("get task id", async () => {
    const task = await baiduIndex.createTask({
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
    taskId = task.taskId;
    expect(taskId).toMatch(/^\d+$/);
  });

  test(
    "get result",
    async () => {
      const result = await baiduIndex.getResult<
        {
          "20240401": string;
          Query: string;
          Region: string;
          Source: "string";
        }[]
      >(taskId);
      // Check if data is an array
      expect(Array.isArray(result)).toBeTruthy();

      // Check if the first element is an object
      expect(typeof result[0]).toBe("object");

      // Check if the object has all the required properties with correct types
      expect(result[0]["20240401"]).toMatch(/^\d+$/);
      expect(result[0]).toHaveProperty("Query", "小米");
      expect(result[0]).toHaveProperty("Region", "全国");
      expect(result[0]).toHaveProperty("Source", "全部");
    },
    20 * 1000
  );
});
