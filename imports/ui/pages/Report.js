import React, {
  PropTypes,
  Component
} from 'react';
import {
  createContainer
} from 'meteor/react-meteor-data';
import {
  Row,
  Col,
  Button,
  Glyphicon
} from 'react-bootstrap';
import {
  Bert
} from 'meteor/themeteorchef:bert';
import {
  Report
} from '/imports/api/collection/report.js';

var lat, lng, self;
let marker = {};
var reportVal = [];
var buttonPadding = {
  marginBottom: '10px'
};

export class ReportClass extends Component {
  constructor(props) {
    super(props);
    self = this;
    this.state = {
      currentLat: null,
      currentLng: null
    }
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentLat == null && this.state.currentLng == null) {
      this.setState({
        currentLat: nextProps.location.lat,
        currentLng: nextProps.location.lng
      })
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    let reportValue = {};
    if (Object.keys(marker).length != 0 && lat && lng) {
      reportValue.lat = lat;
      reportValue.lng = lng;
      Meteor.call("insertReport", reportValue, (err, res) => {
        if (err) {
          Bert.alert(err.reason, 'danger');
        } else {
          lat = null;
          lng = null;
          marker = {};
          Bert.alert('Reported successfully!', 'success');
        }
      });
    } else {
      Bert.alert('Please mark your location on Map first', 'danger');
    }

  }

  reportButton(){
    if(Meteor.user() && Meteor.user().roles && Meteor.user().roles.indexOf('admin') > -1){
      return null;
    }else{
      return (<Button bsStyle = "primary"style = {buttonPadding} onClick = {(e) => this._handleSubmit(e)} > Report Location </Button>);
    }
  }
  render() {
    const {
      reportDataStatus
    } = this.props;

    var mapPreview = {
      height: '400px',
      width: '100%'
    };

    if (this.state.currentLat && this.state.currentLng) {
      var mapProp = {
        center: new google.maps.LatLng(this.state.currentLat, this.state.currentLng),
        zoom: 5,
      }
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      google.maps.event.addListener(map, "click", function(event) {
        lat = event.latLng.lat();
        lng = event.latLng.lng();
        if (Object.keys(marker).length == 0 && Meteor.user().roles == undefined) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
          });
          marker.addListener('dragend', function(event) {
            lat = event.latLng.lat();
            lng = event.latLng.lng();
          });
        }

      });
      if (reportDataStatus) {
        var reportJson = {};
        var userColorMap = {};
        this.props.reportData.forEach((d, i) => {
          var markerColor = '';
          if (!userColorMap[d.userId]) {
            userColorMap[d.userId] = getRandomColor().replace('#', '');
          }

          var userMarker = new google.maps.Marker({
            position: new google.maps.LatLng(d.lat, d.lng),
            map: map,
            icon: 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=' + (i + 1) + '|' + userColorMap[d.userId] + '|000000',
            animation: google.maps.Animation.DROP,
          });
          userMarker.markerID = d._id;
          userMarker.userName = d.userName;
          google.maps.event.addListener(userMarker, 'rightclick', function(a, b, c) {
            var confirmDelete = confirm("Are you sure Delete This Loaction");
              if (confirmDelete == true) {
                Meteor.call("removeReport", this.markerID, (err, res) => {
                  if (err) {
                    Bert.alert(err.reason, 'danger');
                  } else {
                    Bert.alert('Reported Location Removed successfully!', 'success');
                  }
                });
              }
          });

          google.maps.event.addListener(userMarker,'click', function(a,b) {
              let userInfoWindow = new google.maps.InfoWindow({
                content: this.userName
              });
              userInfoWindow.open(map, userMarker);
            });


        });
      }
    }

    return (
     <div>
      <center> {this.reportButton()} </center>
      <div id = "googleMap"  style = { mapPreview } > </div>
     </div>
    );
  }
}


ReportClass.propTypes = {

};

export default createContainer(() => {
  let handle = Meteor.subscribe('ReportPublish');
  return {
    location: Geolocation.latLng(),
    reportDataStatus: handle.ready(),
    reportData: Report.find({}).fetch()
  };

}, ReportClass);
