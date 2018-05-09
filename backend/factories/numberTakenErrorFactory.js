const factory = () => ({
  code: 422,
  errors: [
    {
      key: "number",
      message: "This number is already used."
    }
  ]
});

module.exports = factory;