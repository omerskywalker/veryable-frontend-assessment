import { fetchOps } from "./api";

const TEST_API_URL = "https://frontend-challenge.veryableops.com/";

describe("fetchOps", () => {
  const ORIGINAL_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...ORIGINAL_ENV,
      NEXT_PUBLIC_OPS_API_URL: TEST_API_URL,
    };
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.restoreAllMocks();
  });

  test("returns json when response is ok", async () => {
    const mockData = [{ opId: 1 }] as unknown;

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as unknown as Response);

    await expect(fetchOps()).resolves.toEqual(mockData);

    expect(global.fetch).toHaveBeenCalledWith(TEST_API_URL, expect.any(Object));
  });

  test("throws when response is not ok", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    } as unknown as Response);

    await expect(fetchOps()).rejects.toThrow(/403 Forbidden/);
  });

  test("throws when env var is missing", async () => {
    delete process.env.NEXT_PUBLIC_OPS_API_URL;
    await expect(fetchOps()).rejects.toThrow(/OPS API URL is not defined/i);
  });
});
