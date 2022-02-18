const createMocks = require('node-mocks-http').createMocks;
const calculate = require('../pages/api/calculate');

const defaultParams = {
    amount: 600,
    duration: 12
  }

describe('/api/calculate', () => {
  test('returns the correct value for the default options', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: defaultParams,
    });

    await calculate(req, res);

    expect(res._getData()).toEqual(
      expect.objectContaining({
        payments: 50,
      }),
    );
  });

  test('returns the correct monthly repayment for a £1200 loan', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
          ...defaultParams,
          amount: 1200
      },
    });

    await calculate(req, res);

    expect(res._getData()).toEqual(
      expect.objectContaining({
        payments: 100,
      }),
    );
  });

  test('returns the correct monthly repayment for a £2344 loan', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
          ...defaultParams,
          amount: 2344
      },
    });

    await calculate(req, res);

    expect(res._getData()).toEqual(
      expect.objectContaining({
        payments: 195.34,
      }),
    );
  });
});