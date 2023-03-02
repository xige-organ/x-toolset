class MyPromise {
  constructor(executor) {
    this.promise = new Promise(executor);
  }

  static all(promises) {
    return Promise.all(promises);
  }

  static race(promises) {
    return Promise.race(promises);
  }

  static resolve(value) {
    return Promise.resolve(value);
  }

  static reject(reason) {
    return Promise.reject(reason);
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.promise.then(value => {
        if (onFulfilled) {
          try {
            const returnValue = onFulfilled(value);
            if (returnValue && typeof returnValue.then === 'function') {
              returnValue.then(resolve, reject);
              return;
            }
            resolve(returnValue);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(value);
        }
      }, reason => {
        if (onRejected) {
          try {
            const returnValue = onRejected(reason);
            if (returnValue && typeof returnValue.then === 'function') {
              returnValue.then(resolve, reject);
              return;
            }
            resolve(returnValue);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(reason);
        }
      });
    });
  }

  catch(onRejected) {
    return new MyPromise((resolve, reject) => {
      this.promise.catch(reason => {
        if (onRejected) {
          try {
            const returnValue = onRejected(reason);
            if (returnValue && typeof returnValue.then === 'function') {
              returnValue.then(resolve, reject);
              return;
            }
            resolve(returnValue);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(reason);
        }
      });
    });
  }

  finally(onFinally) {
    return new MyPromise((resolve, reject) => {
      this.promise.finally(() => {
        if (onFinally) {
          try {
            const returnValue = onFinally();
            if (returnValue && typeof returnValue.then === 'function') {
              returnValue.then(resolve, reject);
              return;
            }
            resolve(returnValue);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve();
        }
      });
    });
  }
}

export default new MyPromise() 