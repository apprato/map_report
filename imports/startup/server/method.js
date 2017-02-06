import {
    Meteor
} from 'meteor/meteor';
import {
    Report
} from '/imports/api/documents/report.js';

// Meteor.methods({
//     'reportInsert' (value) {
//       let currntUser = Meteor.users.findOne({_id:this.userId});
//        // Make sure the user is logged in before inserting a task
//        return Report.insert({
//          lat: value.lat,
//           lng: value.lng,
//           userName: currntUser.profile.name.first+' '+currntUser.profile.name.last,
//           userId: this.userId,
//        });
//
//    },
//
// });
