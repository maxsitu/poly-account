export default async function waitForCallback(
  fn: (resolve: (arg?: any) => void, reject: (arg: any) => void) => any,
): Promise<any> {
  const promise = new Promise((resolve, reject) => {
    fn(resolve, reject);
  });

  return await promise;
}
