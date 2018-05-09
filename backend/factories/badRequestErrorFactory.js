const factory = e => {
  const errors = [];
  Object.entries(e).forEach(( [ key, value ] ) => {
    const erorrkey = key.split('.');
    errors.push([
      {
        key: erorrkey[ erorrkey.length - 1 ],
        message: value.message
      }
    ]);
  });
  return { code: 422, errors: errors }
};

module.exports = factory;