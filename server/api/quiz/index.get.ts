export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return query.uid;
  // TODO: 返回用户所有的 quiz 记录
});
