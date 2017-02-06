import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Documents from './documents';
import rateLimit from '../../modules/rate-limit.js';
import {
    Report
} from '/imports/api/documents/report.js';
export const upsertDocument = new ValidatedMethod({
  name: 'documents.upsert',
  validate: new SimpleSchema({
    _id: { type: String, optional: true },
    title: { type: String, optional: true },
    body: { type: String, optional: true },
  }).validator(),
  run(document) {
    return Documents.upsert({ _id: document._id }, { $set: document });
  },
});

export const removeDocument = new ValidatedMethod({
  name: 'documents.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Documents.remove(_id);
  },
});

export const insertReport = new ValidatedMethod({
  name: 'report.insert',
  validate: new SimpleSchema({
    lat: { type: Number, decimal:true },
      lng: { type: Number,decimal:true }
  }).validator(),
  run({ value }) {
    console.log(value,this.userId);

    let currntUser = Meteor.users.findOne({_id:this.userId});
     // Make sure the user is logged in before inserting a task
     return Report.insert({
       lat: value.lat,
        lng: value.lng,
        userName: currntUser.profile.name.first+' '+currntUser.profile.name.last,
        userId: this.userId,
     });
  },
});

rateLimit({
  methods: [
    upsertDocument,
    removeDocument,
    insertReport
  ],
  limit: 5,
  timeRange: 1000,
});
