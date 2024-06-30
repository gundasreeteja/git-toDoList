exports.getTodayDate = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-US", options);
};

exports.getTodayDay = function () {
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
};
