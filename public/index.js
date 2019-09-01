import {Heartbeat} from './heartbeat.js';



var socket = null;

$(document).ready(function () {

  socket = io();
  socket.on('broadcast', function (data) {
    if (data == null) { return; }
    //console.log(data);

  });


cv['onRuntimeInitialized'] = () => {




              
              
            
  let demo = new Heartbeat("webcam", 30, 6, 250);
  // To start
  demo.init();

  setInterval(() => {

    $("#tbpm").html(parseFloat( demo.bbpm).toFixed(2));

    if(demo.faceValid){
      $("#tfd").html(demo.faceValid);
    }else{
      $("#tfd").html(demo.faceInfo);
    }
   


    
      socket.emit('event', { 'faceValid': demo.faceValid, 'bpm':demo.bbpm });
    


  }, 200);
}
});