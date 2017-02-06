import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';
import MyMap from '../components/MyMap';
import { insertReport } from '../../api/documents/methods.js';
var lat,lng;
let marker;
export default class Report extends React.Component {
  componentDidMount() {

   var mapProp= {
      center:new google.maps.LatLng(51.508742,-0.120850),
      zoom:5,
   }
   var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
   google.maps.event.addListener(map, "click", function (event) {
     lat = event.latLng.lat();
     lng = event.latLng.lng();
     if(!marker){

            marker = new google.maps.Marker({
               position: event.latLng,
               map: map,
               draggable: true,
               animation: google.maps.Animation.DROP,
           });
           let infoWindow = new google.maps.InfoWindow({
                     content: 'hello'
           });
           marker.addListener('click', function() {
             infoWindow.open(map, marker);
           });
           marker.addListener('dragend', function(event) {

           });
         }

   });
   }
   _handleSubmit(e) {
      e.preventDefault();
      let reportValue={};
      if(lat && lng){
       reportValue.lat = lat;
       reportValue.lng = lng;
       insertReport.call(reportValue,(error) =>{
         if(error){
           console.log("error", error);
         }else{
              console.log("result",result);
         }

       });
      }

    }
  render() {
    var mapPreview = {
      height: '400px',
      width: '100%'
      };
      var buttonPadding={
        marginBottom:'10px'
      };
  return (
    <div>
     <center><Button bsStyle="primary" style={buttonPadding}  onClick={(e) => this._handleSubmit(e)}>Report Location</Button></center>
    <div id="googleMap" style={mapPreview}></div>
    </div>
  );
  }
}
