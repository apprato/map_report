import {
  Report
} from '/imports/api/collection/report.js';

Meteor.publish('ReportPublish', function() {
  if(this.userId){
  var currentUser = Meteor.users.findOne({
    _id: this.userId
  });
  if (currentUser.roles != undefined && currentUser.emails[0]['address'] == 'admin@admin.com') {
    return Report.find({});
  } else {
    return Report.find({
      userId: this.userId
    });
  }
}
});
