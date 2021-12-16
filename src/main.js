'use strict';

var mymap = L.map('mapid').setView([41.141412, -8.618643], 13);
var ip = "http://172.24.22.233:5000/"
function rand(frm, to) {
  return ~~(Math.random() * (to - frm)) + frm;
}

// function snaptoroads(){
//   alert("hello");
// }

function plotTrajectories(data){
	var trajectories = data

	trajectories.forEach((trajectory) => {
		// trajectory = trajectories[0]
		var longlat = trajectory['trajectory']

		var latlong = []

		longlat.forEach((ll) => {
			var temp = [ll[1], ll[0]]
			latlong.push(temp)
		})


		var polyline = L.polyline(latlong).addTo(mymap); 
		polyline.setStyle({
			color: 'black'
		});

		// var control = L.Routing.control({
		// 	waypoints: latlong,
		// 	show: false,
		// 	waypointMode: 'snap',
		// 	createMarker: function() {}
		// }).addTo(mymap);


	})
	//console.log(latlong)
}
function getTrajectories(){
	var url = ip + "gettrajectories/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotTrajectories(data)
    },
    (error) => {
        console.log(error)
    })
}

function plotClusters(data){
	console.log(data)
	var trajectories = data

	trajectories.forEach((trajectory) => {
		// trajectory = trajectories[0]
		var longlat = trajectory['trajectory']

		var latlong = []

		longlat.forEach((ll) => {
			var temp = [ll[1], ll[0]]
			latlong.push(temp)
		})


		var polyline = L.polyline(latlong).addTo(mymap); 
		polyline.setStyle({
			color: trajectory['color']
		});
	})
}

function getClusters(){
	var url = ip + "getclusters/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotClusters(data)
    },
    (error) => {
        console.log(error)
    })
}

function showmap() {


  var COLORS = [];
  while (COLORS.length < 100) {
    COLORS.push(`rgb(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)})`);
  }
 

  // var i = 0
  // polylines.forEach((poly) => {
  //   var lls = []
  //   poly.forEach((ll) => {
  //     var temp = [ll[1], ll[0]]
  //     lls.push(temp)
  //   })

  //   var polylineonmap = L.polyline(lls).addTo(mymap); 
  //   polylineonmap.setStyle({
  //     color: COLORS[i]
  //   });
  //   i += 1

  //   // var control = L.Routing.control({
  //   //   waypoints: lls,
  //   //   show: false,
  //   //   waypointMode: 'connect',
  //   //   createMarker: function() {}
  //   // }).addTo(mymap);
  // })

//   var polyline1 = L.polyline(lls_2_correct).addTo(mymap); 
//   polyline1.setStyle({
//       color: 'black'
//   });

  // var control = L.Routing.control({
  //   waypoints: lls_2_correct,
  //   lineOptions: {
  //     styles: [{color: 'black'}]
  //   },
  //   show: false,
  //   waypointMode: 'connect',
  //   createMarker: function() {}
  // }).addTo(mymap);

  // var control = L.Routing.control({
  //   waypoints: lls_correct,
  //   show: false,
  //   waypointMode: 'snap',
  //   createMarker: function() {}
  // }).addTo(mymap);

  //var polyline2 = L.polyline(lls_2_correct).addTo(mymap); 
  L.tileLayer('https://api.mapbox.com/styles/v1/harmxnkhurana/ckpnoj6v100sw17qwszycww8d/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGFybXhua2h1cmFuYSIsImEiOiJja3V0NmdvZHE1bHR0Mm5vOHE2eHZzbWpsIn0.U274ktJdPhCsDhBn0Az78A', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1
    }).addTo(mymap);

    const traj_button = document.getElementById("leftbarbutton1");  
    traj_button.addEventListener("click", getTrajectories);

	const cluster_button = document.getElementById("leftbarbutton2");
	cluster_button.addEventListener("click", getClusters);


  
}

showmap();
