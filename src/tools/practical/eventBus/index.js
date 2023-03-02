class EventBus {
  constructor() {
    this.listeners = {};
  }

  // 订阅事件
  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  // 取消订阅事件
  off(eventName, listener) {
    if (this.listeners[eventName]) {
      this.listeners[eventName] = this.listeners[eventName].filter(l => l !== listener);
    }
  }

  // 发布事件
  emit(eventName, ...args) {
    if (this.listeners[eventName]) {
      this.listeners[eventName].forEach(listener => {
        listener(...args);
      });
    }
  }

  // 带有触发次数限制的事件发布
  emitLimited(eventName, limit, ...args) {
    if (!this.listeners[eventName]) {
      return;
    }

    let count = 0;
    const listeners = this.listeners[eventName].slice();

    const offAll = () => {
      listeners.forEach(listener => {
        this.off(eventName, listener);
      });
    };

    listeners.forEach(listener => {
      const limitedListener = (...args) => {
        listener(...args);
        count++;
        if (count >= limit) {
          offAll();
        }
      };

      this.off(eventName, listener);
      this.on(eventName, limitedListener);
    });

    this.emit(eventName, ...args);
  }
}


export default new eventBus()