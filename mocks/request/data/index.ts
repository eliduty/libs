const resultWrap = (data: unknown, code = 200, message = 'success') => {
  return {
    code,
    message,
    data
  };
};

export const businessSuccessMockData = resultWrap([
  {
    userId: 1,
    id: 1,
    title: 'first post title',
    body: 'first post body'
  }
  // ...
]);

export const businessErrorMockData = resultWrap(null, 61999, '发生了一个业务错误');
