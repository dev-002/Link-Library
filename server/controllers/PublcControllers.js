const Collection = require("../models/collection");

const PublicCollection = async (req, res, next) => {
  const publicCollection = await Collection.find({ shared: "public" });
  const publicCollectionName = [];

  console.log(publicCollection);

  publicCollection.forEach((collection) =>
    !publicCollectionName.includes(collection.name)
      ? publicCollectionName.push({
          name: collection.name,
          description: collection.description,
          tags: collection.tags,
        })
      : null
  );

  return res.status(200).json({
    msg: "Public List Fetched Successfully",
    collections: publicCollectionName,
  });
};

const PublicCollectionList = async (req, res, next) => {
  const categoryParams = req.params.collectionName;
  const publicCollection = await Collection.findOne({
    shared: "public",
    name: categoryParams,
  }).populate("owner");

  return res.status(200).json({
    msg: "Public List Fetched Successfully",
    collection: publicCollection,
  });
};

module.exports = { PublicCollection, PublicCollectionList };
