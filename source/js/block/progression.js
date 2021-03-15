
export const easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

export const progressTo = (
  from,
  to,
  minStep,
  duration,
  minDuration,
  easing,
  callback,
) => {
  const change = to - from;
  let startTime = 0;
  let lastValue = from;
  let lastTime = 0;

  const worker = timestamp => {
    if (!startTime && timestamp) {
      startTime = timestamp;
    }
    const progress = Math.min(Math.max(1, timestamp - startTime), duration);
    const newValue = easing(progress, from, change, duration);

    if (progress < duration) {
      if (Math.abs(newValue - lastValue) > minStep && timestamp - lastTime > minDuration) {
        lastValue = newValue;
        lastTime = timestamp;
        callback(newValue);
      }
      requestAnimationFrame(worker);
    } else {
      callback(newValue);
    }
  };
  worker(0);
};
