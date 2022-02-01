import t from 'tcomb';
import _throttle from 'throttle-function';

const InfinityType = t.irreducible('InfinityType', x => typeof x === 'number' && x === Infinity);

const Methods = t.list(t.Function);
const Settings = t.interface({
  perSecond: t.union([t.Number, InfinityType]),
  maxOngoingMethods: t.union([t.Integer, InfinityType])
}, { strict: true });

const defaultSettings = {
  perSecond: 20,
  maxOngoingMethods: 5
};

export default (_methods, _settings) => {
  const methods = Methods(_methods);
  const settings = Settings({ ...defaultSettings, ..._settings });

  const { maxOngoingMethods, perSecond } = settings;

  const throttle = _throttle(method => method(), {
    window: 1, // window is in seconds
    limit: perSecond
  });

  return new Promise((resolve) => {
    const queue = [];

    const onDone = res => {
      throttle(() => runMethod(methods[queue.length]));

      return res;
    };

    const runMethod = method => {
      if (queue.length !== methods.length) {
        queue.push(method().then(onDone).catch(onDone));
      } else {
        resolve(Promise.all(queue));
      }
    };

    methods.slice(0, maxOngoingMethods).forEach((m, i) => i === 0 ? runMethod(m) : throttle(() => runMethod(m)));
  });
};
