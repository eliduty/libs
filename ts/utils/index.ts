/**
 * 并行执行任务
 * @param {*} maxConcurrency
 * @param {*} source
 * @param {*} iteratorFn
 * @returns
 */
 export async function runParallel(maxConcurrency: any, source: any, iteratorFn: any) {
  const ret: Promise<any>[] = [];
  const executing: Promise<any>[] = [];
  for (const item of source) {
    const p = Promise.resolve().then(() => iteratorFn(item, source));
    ret.push(p);

    if (maxConcurrency <= source.length) {
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= maxConcurrency) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.all(ret);
}
