(function () {
  "use strict";   //Telemetery attention!!! Battery level
  
  var radioState = "disconnected";
  var usedGamepad;
 
   var command_interval;
	

  function move_forward(){

   console.log("move_forward");	


    clearInterval(command_interval);	


    //var bytes_buffer = [0x70,0x05, 0x01,Ox00,0x00,0x00, 0,0,0,0, 0,0,0,0, 0x53,0x78,0x9c,0x3e]; 
	
    var  packet = new ArrayBuffer(18);
    var  dv  = new DataView(packet);

   /* bytes_buffer.forEach(function(value,index){

		dv.setUint8(index,value,true);
	}) */


    dv.setUint8(0,0x70,true);	
    dv.setUint8(1,0x05,true);
    
    dv.setFloat32(2,Number(20.0),true);	
    dv.setFloat32(6,0,true);
    dv.setFloat32(10,0,true);
    	
    dv.setUint8(14,0x53,true);
    dv.setUint8(15,0x78,true);
    dv.setUint8(16,0x9c,true);
    dv.setUint8(17,0x3e,true);
    
    
   

   var i=0;

  

 for (i=0;i<=10;i++){
   
  Crazyradio.sendPacket(packet, function(state, data) {
      if (state === true) {
        $("#packetLed").addClass("good");
      } else {
        $("#packetLed").removeClass("good");
      }
    });	
		

 }

 	
			
 command_interval =  window.setInterval(sendSetpoint, 30);
		

   	
    
   

}


 function move_backward(){
   console.log("move_backward");



	
  
 }	


    document.querySelector("#move_forward").onclick = move_forward;
    document.querySelector("#move_backward").onclick = move_backward; 		
  
  window.onload = function() {
    document.querySelector('#connectButton').onclick = function() {
      
      if (radioState === "disconnected") {
        Crazyradio.open(function(state) {
          console.log("Crazyradio opened: " + state);
          if (state === true) {
            Crazyradio.setChannel($("#channel").val(), function(state) {
              Crazyradio.setDatarate($("#datarate").val(), function(state) {
                if (state) {
                  $("#connectButton").text("Disconnect");
                  $("#packetLed").addClass("connected");
                  
                  radioState = "connected";
                  $('#channel').prop('disabled', true);
                  $('#datarate').prop('disabled', true);
                }
              });
            });
          }
        });
      } else if (radioState === "connected") {
        radioState = "disconnected";
        Crazyradio.close();
        
        $("#connectButton").text("Connect Crazyflie");
        $("#packetLed").removeClass("connected");
        
        $('#channel').prop('disabled', false);
        $('#datarate').prop('disabled', false);
      }
    };


    if (radioState == "connected") {

			
    var bytes_buffer =[0x70,0x05, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0x00,0x00,0x00,0x00]; ;
    var  packet = new ArrayBuffer(18);
    var  dv  = new DataView(packet);
    bytes_buffer.forEach(function(value,index){

		dv.setUint8(index,value,true);
	})
    
    Crazyradio.sendPacket(packet, function(state, data) {
      if (state === true) {
        $("#packetLed").addClass("good");
      } else {
        $("#packetLed").removeClass("good");
      }
    }); 

	


	}

   			
    
      command_interval =  window.setInterval(sendSetpoint, 30);

    	
	
  };
  
  function sendSetpoint() {
//    console.log("suka");
    
/*
    var gamepads = navigator.getGamepads();
    
    // Selecting gamepad
    if (usedGamepad === undefined) {
      _(gamepads).each(function (g) {
        if (g) {
          if (g.buttons[0].pressed) {
            usedGamepad = g.index;
            
            $("#gamepadText").text("Using: " + g.id);
          }
        }
      });
    }
*/
    
    if (radioState !== "connected") return;
    
    var pitch = 0,
        roll  = 0,
        yaw   = 0,
        thrust = 0;

/*    
    // Getting values from gamepad
    if (usedGamepad !== undefined) {
      roll = gamepads[usedGamepad].axes[0] * 30;
      pitch = gamepads[usedGamepad].axes[1] * 30;
      yaw = gamepads[usedGamepad].axes[2] * 200;
      thrust = gamepads[usedGamepad].axes[3] * -55000;
    }
*/


      roll = 100.0;
      pitch = 100.0;
      yaw = 100.0;
      thrust = 50000;



	//bytes     
	
	//2    -  header (persitant id for packet) 
	//4    -  vx (meters/sec)(float)
	//4    -  vy (meters/sec) (float)
	//4    -  povorot (yaw rate) (degrees/sec) (float)
	//4    -  height (z distance) (in meters) (float)


/*---*/

  /*  var bytes_buffer =[0x70,0x05, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0x00,0x00,0x00,0x00]; ;
    var  packet = new ArrayBuffer(18);
    var  dv  = new DataView(packet);
    bytes_buffer.forEach(function(value,index){

		dv.setUint8(index,value,true);
	})
    
    Crazyradio.sendPacket(packet, function(state, data) {
      if (state === true) {
        $("#packetLed").addClass("good");
      } else {
        $("#packetLed").removeClass("good");
      }
    });  */

/*---*/
   
    if (thrust < 500) thrust = 0;	
   // var bytes_buffer = [0x30, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0x11, 0x11];

  //  var bytes_buffer = [0x70,0x05, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0x53,0x78,0x9c,0x3e]; 						
																	

    var bytes_buffer = [0x70,0x05, 0,0,0,0, 0,0,0,0, 0,0,0,0, 0x53,0x78,0x9c,0x3e]; //3th - distance in meters
	
    var  packet = new ArrayBuffer(18);
    var  dv  = new DataView(packet);

    bytes_buffer.forEach(function(value,index){

		dv.setUint8(index,value,true);
	})
    
    //Preparing commander packet
/*
    var packet = new ArrayBuffer(15);
    var dv = new DataView(packet);
    
    dv.setUint8(0, 0x30, true);      // CRTP header
    dv.setFloat32(1, roll, true);    // Roll
    dv.setFloat32(5, pitch, true);   // Pitch
    dv.setFloat32(9, yaw, true);     // Yaw
    dv.setUint16(13, thrust, true);  // Thrust
*/
    
    Crazyradio.sendPacket(packet, function(state, data) {
      if (state === true) {
        $("#packetLed").addClass("good");
      } else {
        $("#packetLed").removeClass("good");
      }
    });
  }
  
}());