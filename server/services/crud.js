const _ = require("lodash");
const ObjectId = require("mongoose").Types.ObjectId;

class CrudService {
  getAll(schema, payload = {}) {
    return new Promise((resolve, reject) => {
      schema.find(payload, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
  getUnique(schema, payload) {
    return new Promise((resolve, reject) => {
      schema.findOne(payload, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
  getById(schema, id) {
    return new Promise((resolve, reject) => {
      schema.findById(new ObjectId(id), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(null);
        }
      });
    });
  }
  getUniqueAdvance(schema, filterValues = {}, sortValues = {}, populate = {}) {
    // let data = await schema.aggregate([
    //   { $match: { ...filterValues } },
    //   { $sort: { ...sortValues } },
    // ]);
    if (Object.keys(populate).length > 0) {
      return new Promise((resolve, reject) => {
        schema
          .findOne({ ...filterValues })
          .sort({ ...sortValues })
          .populate({ ...populate })
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        schema
          .findOne({ ...filterValues })
          .sort({ ...sortValues })
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    }
  }
  getAdvance(schema, filterValues = {}, sortValues = {}, populate = {}) {
    // let data = await schema.aggregate([
    //   { $match: { ...filterValues } },
    //   { $sort: { ...sortValues } },
    // ]);
    if (Object.keys(populate).length > 0) {
      return new Promise((resolve, reject) => {
        schema
          .find({ ...filterValues })
          .sort({ ...sortValues })
          .populate({ ...populate })
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        schema
          .find({ ...filterValues })
          .sort({ ...sortValues })
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    }
  }
  getAdvanceWithLimit(
    schema,
    filterValues = {},
    sortValues = {},
    populate = {},
    limit = 5
  ) {
    // let data = await schema.aggregate([
    //   { $match: { ...filterValues } },
    //   { $sort: { ...sortValues } },
    // ]);
    if (Object.keys(populate).length > 0) {
      return new Promise((resolve, reject) => {
        schema
          .find({ ...filterValues })
          .sort({ ...sortValues })
          .populate({ ...populate })
          .limit(limit)
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        schema
          .find({ ...filterValues })
          .sort({ ...sortValues })
          .limit(limit)
          .exec((err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(null);
            }
          });
      });
    }
  }
  create(schema, payload) {
    const data = new schema(payload);
    data.key = data._id;
    return new Promise((resolve, reject) => {
      data.save((err, _) => {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
  update(item, payload) {
    item = _.extend(item, payload);
    return new Promise((resolve, reject) => {
      item.save((err, _) => {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
  remove(shema, id, isDelete = false) {
    return new Promise((resolve, reject) => {
      isDelete
        ? shema.deleteOne({ _id: id }, (err, _) => {
            if (!err) {
              resolve(true);
            } else {
              reject(false);
            }
          })
        : shema.delete({ _id: id }, (err, _) => {
            if (!err) {
              resolve(true);
            } else {
              reject(false);
            }
          });
    });
  }
  restore(schema, id) {
    return new Promise((resolve, reject) => {
      schema.restore({ _id: id }, (err, _) => {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
module.exports = new CrudService();
