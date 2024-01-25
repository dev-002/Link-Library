const User = require("../models/user");
const List = require("../models/collection");
const getuser = require("../utilities/getUser");
const Collection = require("../models/collection");

const getPrivateCollection = async (req, res, next) => {
  const user_id = res.locals.tokenData._id;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      console.log(user.collections);
      return res.status(200).json({
        msg: "All list fetched",
        privateCollections: user.collections,
      });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const createPrivateCollection = async (req, res, next) => {
  const { _id: owner } = res.locals.tokenData;
  const {
    name,
    description,
    link, // [{ linkName, linkDescription, link }]
    tags,
    shared,
    sharedWith,
  } = req.body.data;

  // Check if user_id provided
  if (owner) {
    const user = await getuser(owner);
    //  Check if user is valid
    if (user) {
      // Add a new collection
      try {
        const newList = await List.create({
          name: name,
          link: {
            name: link.name,
            description: link.description,
            link: link.link,
          },
          description: description,
          tags: tags,
          shared,
          sharedWith,
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
      return res
        .status(201)
        .json({ msg: "List Added Successfully", collections });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const deletePrivateCollection = async (req, res, next) => {
  const { _id: owner } = req.locals.tokenData;
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

        // Function to remove the deleted list from the user collections
        // user.collections = user.collections.filter(({ _id }) => {
        //   return !_id.equals(collection_id);
        // });
        // await user.save();

        // Fetch newly updated data
        const { collections: list } = await User.findOne({
          _id: owner,
        })
          .populate("collections")
          .populate("link");

        return res.status(200).json({
          msg: "List Removed Successfully",
          list,
        });
      } else return res.status(404).json({ error: "No List Found" });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const updatePrivateCollection = async (req, res, next) => {
  const { _id: owner } = req.locals.tokenData;
  const { updated_List } = req.body;
  // Check if user_id provided
  if (owner) {
    const collection = await Collection.findOne({
      _id: updated_List._id,
    });
    // Check if collection is valid
    if (collection) {
      // Updation
      const update = await Collection.updateOne(
        { _id: updated_List._id, owner },
        { ...updated_List }
      );
      if (update.acknowledged) {
        // Fetch newly updated data
        const { collections: list } = await Collection.findOne({
          _id: updated_List._id,
          owner,
        }).populate("link");

        return res.json({
          msg: "List Updated Successfully",
          list,
        });
      } else
        return res.status(400).json({
          error: "Error occured during updation",
        });
    } else return res.status(404).json({ error: "No List Found" });
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
      return res.status(200).json({
        success: true,
        msg: `Collection List Fetched Successfully: ${queryCollection}`,
        collection,
      });
    } else
      return res.status(404).json({
        error: "No such Collection exist",
      });
  } else return res.status(400).json({ error: "JWT expired" });
};

const updatePrivateCollectionList = async (req, res, next) => {
  const { _id: owner } = req.locals.tokenData;
  const queryCollection = req.params.collectionName;
  const { link_id, updatedLink } = req.body;
  // Check if user_id provided
  if (owner) {
    const user = getuser(owner);
    //  Check if user is valid
    if (user) {
      const collection = await Collection.findOne({
        name: queryCollection,
        owner,
      }).populate("link");

      if (collection) {
        const acknowledged = await Collection.updateOne(
          { "link._id": link_id, name: queryCollection, owner },
          { $set: { "link.$": updatedLink } }
        );

        if (acknowledged.acknowledged) {
          // Send the acknowledgement
          return res.status(200).json({
            msg: "List Updated Successfully",
            acknowledged: true,
          });
        } else
          return res
            .status(500)
            .json({ acknowledged: false, error: "List deletion failed" });
      } else return res.status(404).json({ error: "No collection found" });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "JWT expired" });
};

const deletePrivateCollectionList = async (req, res, next) => {
  const { _id: owner, role } = req.locals.tokenData;
  const queryCollection = req.params.collectionName;
  const { link_id } = req.body;
  // Check if user_id provided
  if (owner) {
    const user = getuser(owner);
    //  Check if user is valid
    if (user) {
      const collection = await Collection.findOne({
        name: queryCollection,
        owner,
      }).populate("link");

      if (collection) {
        const acknowledged = await Collection.updateOne(
          {
            $or: [
              { name: queryCollection, owner },
              { name: queryCollection, role: "admin" },
            ],
          },
          { $pull: { link: { _id: link_id } } }
        );

        if (acknowledged.acknowledged) {
          // Send the acknowledgement
          return res.status(200).json({
            msg: "List Removed Successfully",
            acknowledged: true,
          });
        } else
          return res
            .status(500)
            .json({ acknowledged: false, error: "List deletion failed" });
      } else return res.status(404).json({ error: "No collection found" });
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
  updatePrivateCollectionList,
  deletePrivateCollectionList,
};
