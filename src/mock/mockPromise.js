export const mockPromiseResolve = (callback = () => {}, delay = 100) =>
  new Promise((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, delay);
  });

export const mockPromiseReject = (callback = () => {}, delay = 100) =>
  new Promise((_, reject) => {
    setTimeout(() => {
      callback();
      reject();
    }, delay);
  });
