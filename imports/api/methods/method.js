import {
  Meteor
} from 'meteor/meteor';
import {
  Report
} from '/imports/api/collection/report.js';


Meteor.methods({
  'newUser' (value, cb) {
    check(value, Object);
    let result = Accounts.createUser(value);
    return result;
  },
  'insertReport' (value) {
    check(value, Object);
    let currentUser = Meteor.users.findOne({
      _id: this.userId
    });
    return Report.insert({
      lat: value.lat,
      lng: value.lng,
      userName: currentUser.profile.name.first + ' ' + currentUser.profile.name.last,
      userId: this.userId
    });
  },
  'removeReport' (id) {
    check(id, String);
    var currentReport = Report.findOne({
      _id: id
    });
    if (this.userId == currentReport.userId) {
      return Report.remove({
        _id: id
      });
    } else {
      throw new Meteor.Error("400", "You are not authenticated person to remove this reported Location");
    }
  }
});
