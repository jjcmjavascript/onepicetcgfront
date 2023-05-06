function sleep(ms = 100) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function wait(ms) {
  let d = new Date();
  let d2 = null;
  do {
    d2 = new Date();
  } while (d2 - d < ms);
}

export default {
  sleep,
  wait,
};
