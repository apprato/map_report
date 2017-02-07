export let Report = new Mongo.Collection('Report');

let schema = new SimpleSchema({
  lat: {
    type: Number,
    decimal:true
  },
  lng:{
    type:Number,
    decimal:true
  },
  userName: {
    type: String,
  },
  userId: {
    type: String,
  },
  createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date()
            }
        }
    },
});

Report.attachSchema(schema);
