exports.GetList = (req, res, next) => {
  res.json({ msg: "Get all List" });
};

exports.AddList = (req, res, next) => {
  res.json({ msg: "Add List" });
};

exports.RemoveList = (req, res, next) => {
  res.json({ msg: "Remove a List" });
};

exports.UpdateList = (req, res, next) => {
  res.json({ msg: "Update a List" });
};
