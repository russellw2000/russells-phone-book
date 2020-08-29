generateToken = () => {
  var random = Math.floor(1000000 + Math.random() * 900000);
  random += "" + Date.now();
  return random;
};

module.exports = { generateToken };
