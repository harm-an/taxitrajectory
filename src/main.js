'use strict';

var mymap = L.map('mapid').setView([41.141412, -8.618643], 13);
var ip = "http://127.0.0.1:5000/"
var switchmode = "map"
function rand(frm, to) {
  return ~~(Math.random() * (to - frm)) + frm;
}

// function snaptoroads(){
//   alert("hello");
// }

function plotTrajectories(data, color = "black"){
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
			color: color
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

function getTrajectoriesVW(){
  var url = ip + "gettrajectoriesAfterVW/"
  //alert(url)
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

function getTrajectoriesPreRdp(){
	var url = ip + "getBeforeRDPTrajectories/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotTrajectories(data, "red")
    },
    (error) => {
        console.log(error)
    })
}

function plotSingleTrajectoryPreRDP(data){
	var trajectories = data
  //var yes = false;

	trajectories.forEach((trajectory) => {
		// trajectory = trajectories[0]
		var longlat = trajectory['trajectory']

		var latlong = []
    var n = longlat.length;
    var nint = parseInt(n/2)
    console.log(nint)
    var i = 0;
		longlat.forEach((ll) => {
			var temp = [ll[1], ll[0]]
			latlong.push(temp)
      if (i == nint+1){
        //mymap.setView([ll[1], ll[0]], 16);
        //console.log(i)
        //yes = true;
      }
      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'black'
      });
      i+=1;
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

function getSingleTrajPreRdp(){
  var url = ip + "getBefore_SingleRDPTrajectory/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotSingleTrajectoryPreRDP(data)
    },
    (error) => {
        console.log(error)
    })
}


function plotSingleTrajectoryPostRDP(data){
	var trajectories = data

	trajectories.forEach((trajectory) => {
		// trajectory = trajectories[0]
		var longlat = trajectory['trajectory']

		var latlong = []

		longlat.forEach((ll) => {
			var temp = [ll[1], ll[0]]
			latlong.push(temp)
      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'red'
      });
		})


		var polyline = L.polyline(latlong).addTo(mymap); 
		polyline.setStyle({
			color: 'red'
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

function getSingleTrajPostRdp(){
  var url = ip + "getAfter_SingleRDPTrajectory/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotSingleTrajectoryPostRDP(data)
    },
    (error) => {
        console.log(error)
    })
}

function plotSingleTrajectoryPostVW(data){
	var trajectories = data

	trajectories.forEach((trajectory) => {
		// trajectory = trajectories[0]
		var longlat = trajectory['trajectory']

		var latlong = []

		longlat.forEach((ll) => {
			var temp = [ll[1], ll[0]]
			latlong.push(temp)
      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'green'
      });
		})


		var polyline = L.polyline(latlong).addTo(mymap); 
		polyline.setStyle({
			color: 'green'
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

function getSingleTrajPostVW(){
  var url = ip + "getAfter_SingleVWTrajectory/"
    fetch(url)
    .then(res => res.json())
    .then((result)=>{
		var data = result["data"]
		plotSingleTrajectoryPostVW(data)
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

function clear(){
  location.reload();
}

function switchbuttonclicked(){
  var text1 = "temp"
  var text2 = "temp"
  if (switchmode == "map"){
    text1 = "Switch to Map";
    switchmode = "graph";
    text2 = "GRAPHS";
    document.getElementById("mapid").style.visibility = 'hidden'
    document.getElementById("graphspace").style.visibility = 'visible'
  }else{
    text1 = "Switch to Graphs";
    switchmode = "map";
    text2 = "MAP";
    document.getElementById("mapid").style.visibility = 'visible'
    document.getElementById("graphspace").style.visibility = 'hidden'

  }

  document.getElementById("switchtext").innerHTML = text1
  document.getElementById("typetext").innerHTML = text2
}

function drawlinechart(){
  console.log("linechart")
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 1500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");

  // set the ranges
  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);

  // define the 1st line
  var valueline = d3.line()
      .x(function(d) { return x(d.index); })
      .y(function(d) { return y(d.original_points); });

  // define the 2nd line
  var valueline2 = d3.line()
      .x(function(d) { return x(d.index); })
      .y(function(d) { return y(d.after_rdp_points); });

  var valueline3 = d3.line()
      .x(function(d) { return x(d.index); })
      .y(function(d) { return y(d.after_vw_points); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("#linechart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Get the data
  d3.csv("https://raw.githubusercontent.com/harm-an/csvfiles/main/comparison.csv", function(error, data) {
    if (error) throw error;

    console.log(data)

    // format the data
    data.forEach(function(d) {
        d.index = +d.index;
        d.original_points = +d.original_points;
        d.after_rdp_points = +d.after_rdp_points;
        d.after_vw_points = +d.after_vw_points;
    });

    // Scale the range of the data
    x.domain([d3.min(data, function(d){
      return d.index
    }), d3.max(data, function(d){
      return d.index
    })]);
    y.domain([0, d3.max(data, function(d) {
      return Math.max(d.original_points, Math.max(d.after_rdp_points,d.after_vw_points)); })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#FF5B35")
        .attr("d", valueline);

    // Add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "#D35CBB")
        .attr("d", valueline2);

    svg.append("path")
    .data([data])
    .attr("class", "line")
    .style("stroke", "#4FF795")
    .attr("d", valueline3);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .style("stroke", "blue")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("circle").attr("cx",20).attr("cy",30).attr("r", 6).style("fill", "#FF5B35")
    svg.append("circle").attr("cx",20).attr("cy",60).attr("r", 6).style("fill", "#D35CBB")
    svg.append("circle").attr("cx",20).attr("cy",90).attr("r", 6).style("fill", "#4FF795")
    svg.append("text").attr("x", 40).attr("y", 30).text("Original").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#6495ed")
    svg.append("text").attr("x", 40).attr("y", 60).text("After RDP").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#6495ed")
    svg.append("text").attr("x", 40).attr("y", 90).text("After VW").style("font-size", "15px").attr("alignment-baseline","middle").attr("fill", "#6495ed")
  });
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

  const traj_button = document.getElementById("leftbarbutton3");  
  traj_button.addEventListener("click", getTrajectories);

	const cluster_button = document.getElementById("leftbarbutton2");
	cluster_button.addEventListener("click", getClusters);

  const prerdp_button = document.getElementById("leftbarbutton1");
  prerdp_button.addEventListener("click", getTrajectoriesPreRdp);

  const prerdp_button_single = document.getElementById("leftbarbutton4");
  prerdp_button_single.addEventListener("click", getSingleTrajPreRdp);

  const postrdp_button_single = document.getElementById("leftbarbutton5");
  postrdp_button_single.addEventListener("click", getSingleTrajPostRdp);

  const postvw_button_single = document.getElementById("leftbarbuttonvw_single");
  postvw_button_single.addEventListener("click", getSingleTrajPostVW);

  const clear_button = document.getElementById("leftbarbutton6");
  clear_button.addEventListener("click", clear);

  const postvw_button = document.getElementById("leftbarbuttonvw");
  postvw_button.addEventListener("click", getTrajectoriesVW);

  const switchbutton = document.getElementById("leftbarheaderbutton");
  switchbutton.addEventListener("click", switchbuttonclicked);

  drawlinechart();

  
}

showmap();
