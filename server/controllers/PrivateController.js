const User = require("../models/user");
const List = require("../models/collection");
const Collection = require("../models/collection");
const ObjectId = require("mongoose").Types.ObjectId;

const getPrivateCollection = async (req, res, next) => {
  const user_id = res.locals.tokenData._id;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      console.log("Colleciton Fetched");
      return res.status(200).json({
        msg: "All list fetched",
        privateCollections: user.collections,
      });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const createPrivateCollection = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const { name, description, tags, shared, sharedWith } = req.body.data;

  // Check if user_id provided
  if (owner) {
    const user = await User.findOne({ _id: owner }).populate("collections");
    //  Check if user is valid
    if (user) {
      // Data cleansing for shared With array of string to array of Object Id
      let sharedWithUsername = [];
      await Promise.all(
        sharedWith.map(async (id) => {
          let user = await User.findOne({ username: id });
          if (user) sharedWithUsername.push(user._id);
        })
      );

      try {
        const newList = await List.create({
          name: name,
          description: description,
          tags: tags,
          shared,
          sharedWith: sharedWithUsername,
          owner,
        });
        user.collections.push(newList._id);
      } catch (error) {
        return res.status(400).json({ message: "Duplicate Values", error });
      }
      await user.save();

      // Fetch newly updated data
      const { collections } = await User.findOne({
        _id: owner,
      }).populate("collections");
      console.log("New Collection Created");
      return res
        .status(201)
        .json({ msg: "List Added Successfully", collections });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const deletePrivateCollection = async (req, res, next) => {
  console.log("Deleting Collection", req.body);
  const { _id: owner } = res.locals.tokenData;
  const { collection_id } = req.body;
  // Check if user_id provided
  if (owner) {
    const user = await User.findOne({ _id: owner });
    const collection = await Collection.findOne({ _id: collection_id, owner });
    //  Check if collection is valid
    if (collection && user) {
      const deleted = await Collection.deleteOne({
        _id: collection_id,
        owner,
      });

      // Check if no error Occured and DeletedCount is 1
      if (deleted.acknowledged) {
        // remove collection ID from User.collections
        await User.findByIdAndUpdate(owner, {
          $pull: { collections: collection_id },
        });
        console.log("Collection Deleted Successfully");

        return res.status(200).json({
          msg: "List Removed Successfully",
          acknowledged: true,
        });
      } else return res.status(404).json({ error: "No List Found" });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const updatePrivateCollection = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const { data, original } = req.body;
  // Check if user_id provided
  if (owner) {
    try {
      // Updation
      const update = await Collection.findOneAndUpdate(
        { _id: original._id, name: original.name, owner },
        { ...data },
        { new: true }
      );
      if (update) {
        console.log("Collection Updated Successfully");
        return res.status(201).json({
          msg: "List Updated Successfully",
          acknowledged: true,
        });
      } else return res.status(404).json({ error: "No List Found" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Server Error in Collection Updation" });
    }
  } else return res.status(400).json({ error: "JWT expired" });
};

const getPrivateCollectionList = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const queryCollection = req.params.collectionName;
  // Check if user_id provided
  if (owner) {
    // Check if Collection is valid
    const collection = await Collection.findOne({
      name: queryCollection,
      owner,
    })
      .populate("link")
      .populate("owner");

    if (collection) {
      console.log("Collection Link Fetched");
      return res.status(200).json({
        success: true,
        msg: `Collection List Fetched Successfully: ${queryCollection}`,
        collection,
      });
    } else
      return res.status(404).json({
        error: "No such Collection exist",
      });
  } else return res.status(401).json({ error: "JWT expired" });
};

const addPrivateCollectionList = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const { linkArray, collectionName } = req.body;

  // Check if user_id provided
  if (owner) {
    const user = await User.findOne({ _id: owner });
    //  Check if user is valid
    if (user) {
      try {
        const list = await List.findOne({ name: collectionName, owner });
        linkArray.map(({ name, description, link }) => {
          list.link.push({
            _id: new ObjectId(),
            name,
            description,
            link,
          });
        });
        await list.save();
      } catch (error) {
        return res.status(400).json({ message: "Duplicate Values", error });
      }

      console.log("New Collection List Added");
      return res
        .status(201)
        .json({ msg: "List Added Successfully", acknowledged: true });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const updatePrivateCollectionList = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const { updatedLink, collectionName } = req.body;
  // Check if user_id provided
  if (owner) {
    const user = await User.findOne({ _id: owner });
    //  Check if user is valid
    if (user) {
      const temptest = await Collection.findOne({
        "link._id": updatedLink._id,
        name: collectionName,
      });
      try {
        const acknowledged = await Collection.findOneAndUpdate(
          { "link._id": updatedLink._id, name: collectionName, owner },
          {
            $set: {
              "link.$": updatedLink,
            },
          }
        );
        // if null i.e. no updation occur
        if (acknowledged) {
          console.log("Collection Link Updated Successfully");
          // Send the acknowledgement
          return res.status(200).json({
            msg: "List Updated Successfully",
            acknowledged: true,
          });
        } else {
          return res
            .status(404)
            .json({ acknowledged: false, error: "No collection found" });
        }
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ acknowledged: false, error: "List updation failed" });
      }
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const deletePrivateCollectionList = async (req, res, next) => {
  console.log("Deleting Collection Link", req.body);
  const { _id: owner, role } = res.locals.tokenData;
  const { collectionName, link_id } = req.body;
  // Check if user_id provided
  if (owner) {
    const user = await User.findOne({ _id: owner });
    if (user) {
      try {
        const collection = await Collection.findOneAndUpdate(
          { name: collectionName },
          {
            $pull: { link: { _id: link_id } },
          },
          { new: true }
        );

        if (collection) {
          console.log("Collection Link Deleted Successfully");
          // Send the acknowledgement
          return res.status(200).json({
            msg: "List Removed Successfully",
            acknowledged: true,
          });
        } else return res.status(404).json({ error: "No List Found" });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .json({ acknowledged: false, error: "List deletion failed" });
      }
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

module.exports = {
  // Collection
  getPrivateCollection,
  createPrivateCollection,
  deletePrivateCollection,
  updatePrivateCollection,
  // List
  getPrivateCollectionList,
  addPrivateCollectionList,
  updatePrivateCollectionList,
  deletePrivateCollectionList,
};
