// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
'use strict';

var mymap = L.map('mapid').setView([41.141412, -8.618643], 13);
var ip = "http://127.0.0.1:5000/";
var switchmode = "map";

function rand(frm, to) {
  return ~~(Math.random() * (to - frm)) + frm;
} // function snaptoroads(){
//   alert("hello");
// }


function plotTrajectories(data) {
  var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "black";
  var trajectories = data;
  trajectories.forEach(function (trajectory) {
    // trajectory = trajectories[0]
    var longlat = trajectory['trajectory'];
    var latlong = [];
    longlat.forEach(function (ll) {
      var temp = [ll[1], ll[0]];
      latlong.push(temp);
    });
    var polyline = L.polyline(latlong).addTo(mymap);
    polyline.setStyle({
      color: color
    }); // var control = L.Routing.control({
    // 	waypoints: latlong,
    // 	show: false,
    // 	waypointMode: 'snap',
    // 	createMarker: function() {}
    // }).addTo(mymap);
  }); //console.log(latlong)
}

function getTrajectories() {
  var url = ip + "gettrajectories/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotTrajectories(data);
  }, function (error) {
    console.log(error);
  });
}

function getTrajectoriesVW() {
  var url = ip + "gettrajectoriesAfterVW/"; //alert(url)

  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotTrajectories(data);
  }, function (error) {
    console.log(error);
  });
}

function getTrajectoriesPreRdp() {
  var url = ip + "getBeforeRDPTrajectories/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotTrajectories(data, "red");
  }, function (error) {
    console.log(error);
  });
}

function plotSingleTrajectoryPreRDP(data) {
  var trajectories = data; //var yes = false;

  trajectories.forEach(function (trajectory) {
    // trajectory = trajectories[0]
    var longlat = trajectory['trajectory'];
    var latlong = [];
    var n = longlat.length;
    var nint = parseInt(n / 2);
    console.log(nint);
    var i = 0;
    longlat.forEach(function (ll) {
      var temp = [ll[1], ll[0]];
      latlong.push(temp);

      if (i == nint + 1) {//mymap.setView([ll[1], ll[0]], 16);
        //console.log(i)
        //yes = true;
      }

      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'black'
      });
      i += 1;
    });
    var polyline = L.polyline(latlong).addTo(mymap);
    polyline.setStyle({
      color: 'black'
    }); // var control = L.Routing.control({
    // 	waypoints: latlong,
    // 	show: false,
    // 	waypointMode: 'snap',
    // 	createMarker: function() {}
    // }).addTo(mymap);
  }); //console.log(latlong)
}

function getSingleTrajPreRdp() {
  var url = ip + "getBefore_SingleRDPTrajectory/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotSingleTrajectoryPreRDP(data);
  }, function (error) {
    console.log(error);
  });
}

function plotSingleTrajectoryPostRDP(data) {
  var trajectories = data;
  trajectories.forEach(function (trajectory) {
    // trajectory = trajectories[0]
    var longlat = trajectory['trajectory'];
    var latlong = [];
    longlat.forEach(function (ll) {
      var temp = [ll[1], ll[0]];
      latlong.push(temp);
      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'red'
      });
    });
    var polyline = L.polyline(latlong).addTo(mymap);
    polyline.setStyle({
      color: 'red'
    }); // var control = L.Routing.control({
    // 	waypoints: latlong,
    // 	show: false,
    // 	waypointMode: 'snap',
    // 	createMarker: function() {}
    // }).addTo(mymap);
  }); //console.log(latlong)
}

function getSingleTrajPostRdp() {
  var url = ip + "getAfter_SingleRDPTrajectory/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotSingleTrajectoryPostRDP(data);
  }, function (error) {
    console.log(error);
  });
}

function plotSingleTrajectoryPostVW(data) {
  var trajectories = data;
  trajectories.forEach(function (trajectory) {
    // trajectory = trajectories[0]
    var longlat = trajectory['trajectory'];
    var latlong = [];
    longlat.forEach(function (ll) {
      var temp = [ll[1], ll[0]];
      latlong.push(temp);
      var circle = L.circle([ll[1], ll[0]]).addTo(mymap);
      circle.setStyle({
        color: 'green'
      });
    });
    var polyline = L.polyline(latlong).addTo(mymap);
    polyline.setStyle({
      color: 'green'
    }); // var control = L.Routing.control({
    // 	waypoints: latlong,
    // 	show: false,
    // 	waypointMode: 'snap',
    // 	createMarker: function() {}
    // }).addTo(mymap);
  }); //console.log(latlong)
}

function getSingleTrajPostVW() {
  var url = ip + "getAfter_SingleVWTrajectory/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotSingleTrajectoryPostVW(data);
  }, function (error) {
    console.log(error);
  });
}

function plotClusters(data) {
  console.log(data);
  var trajectories = data;
  trajectories.forEach(function (trajectory) {
    // trajectory = trajectories[0]
    var longlat = trajectory['trajectory'];
    var latlong = [];
    longlat.forEach(function (ll) {
      var temp = [ll[1], ll[0]];
      latlong.push(temp);
    });
    var polyline = L.polyline(latlong).addTo(mymap);
    polyline.setStyle({
      color: trajectory['color']
    });
  });
}

function getClusters() {
  var url = ip + "getclusters/";
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (result) {
    var data = result["data"];
    plotClusters(data);
  }, function (error) {
    console.log(error);
  });
}

function clear() {
  location.reload();
}

function switchbuttonclicked() {
  var text1 = "temp";
  var text2 = "temp";

  if (switchmode == "map") {
    text1 = "Switch to Map";
    switchmode = "graph";
    text2 = "GRAPHS";
    document.getElementById("mapid").style.visibility = 'hidden';
    document.getElementById("graphspace").style.visibility = 'visible';
  } else {
    text1 = "Switch to Graphs";
    switchmode = "map";
    text2 = "MAP";
    document.getElementById("mapid").style.visibility = 'visible';
    document.getElementById("graphspace").style.visibility = 'hidden';
  }

  document.getElementById("switchtext").innerHTML = text1;
  document.getElementById("typetext").innerHTML = text2;
}

function drawlinechart() {
  console.log("linechart");
  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
  },
      width = 1500 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom; // parse the date / time

  var parseTime = d3.timeParse("%d-%b-%y"); // set the ranges

  var x = d3.scaleLinear().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]); // define the 1st line

  var valueline = d3.line().x(function (d) {
    return x(d.index);
  }).y(function (d) {
    return y(d.original_points);
  }); // define the 2nd line

  var valueline2 = d3.line().x(function (d) {
    return x(d.index);
  }).y(function (d) {
    return y(d.after_rdp_points);
  });
  var valueline3 = d3.line().x(function (d) {
    return x(d.index);
  }).y(function (d) {
    return y(d.after_vw_points);
  }); // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin

  var svg = d3.select("#linechart").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Get the data

  d3.csv("https://raw.githubusercontent.com/harm-an/csvfiles/main/comparison.csv", function (error, data) {
    if (error) throw error;
    console.log(data); // format the data

    data.forEach(function (d) {
      d.index = +d.index;
      d.original_points = +d.original_points;
      d.after_rdp_points = +d.after_rdp_points;
      d.after_vw_points = +d.after_vw_points;
    }); // Scale the range of the data

    x.domain([d3.min(data, function (d) {
      return d.index;
    }), d3.max(data, function (d) {
      return d.index;
    })]);
    y.domain([0, d3.max(data, function (d) {
      return Math.max(d.original_points, Math.max(d.after_rdp_points, d.after_vw_points));
    })]); // Add the valueline path.

    svg.append("path").data([data]).attr("class", "line").style("stroke", "#FF5B35").attr("d", valueline); // Add the valueline2 path.

    svg.append("path").data([data]).attr("class", "line").style("stroke", "#D35CBB").attr("d", valueline2);
    svg.append("path").data([data]).attr("class", "line").style("stroke", "#4FF795").attr("d", valueline3); // Add the X Axis

    svg.append("g").attr("transform", "translate(0," + height + ")").style("stroke", "blue").call(d3.axisBottom(x)); // Add the Y Axis

    svg.append("g").call(d3.axisLeft(y));
    svg.append("circle").attr("cx", 20).attr("cy", 30).attr("r", 6).style("fill", "#FF5B35");
    svg.append("circle").attr("cx", 20).attr("cy", 60).attr("r", 6).style("fill", "#D35CBB");
    svg.append("circle").attr("cx", 20).attr("cy", 90).attr("r", 6).style("fill", "#4FF795");
    svg.append("text").attr("x", 40).attr("y", 30).text("Original").style("font-size", "15px").attr("alignment-baseline", "middle").attr("fill", "#6495ed");
    svg.append("text").attr("x", 40).attr("y", 60).text("After RDP").style("font-size", "15px").attr("alignment-baseline", "middle").attr("fill", "#6495ed");
    svg.append("text").attr("x", 40).attr("y", 90).text("After VW").style("font-size", "15px").attr("alignment-baseline", "middle").attr("fill", "#6495ed");
  });
}

function showmap() {
  var COLORS = [];

  while (COLORS.length < 100) {
    COLORS.push("rgb(".concat(rand(0, 255), ", ").concat(rand(0, 255), ", ").concat(rand(0, 255), ")"));
  } // var i = 0
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
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);
  var traj_button = document.getElementById("leftbarbutton3");
  traj_button.addEventListener("click", getTrajectories);
  var cluster_button = document.getElementById("leftbarbutton2");
  cluster_button.addEventListener("click", getClusters);
  var prerdp_button = document.getElementById("leftbarbutton1");
  prerdp_button.addEventListener("click", getTrajectoriesPreRdp);
  var prerdp_button_single = document.getElementById("leftbarbutton4");
  prerdp_button_single.addEventListener("click", getSingleTrajPreRdp);
  var postrdp_button_single = document.getElementById("leftbarbutton5");
  postrdp_button_single.addEventListener("click", getSingleTrajPostRdp);
  var postvw_button_single = document.getElementById("leftbarbuttonvw_single");
  postvw_button_single.addEventListener("click", getSingleTrajPostVW);
  var clear_button = document.getElementById("leftbarbutton6");
  clear_button.addEventListener("click", clear);
  var postvw_button = document.getElementById("leftbarbuttonvw");
  postvw_button.addEventListener("click", getTrajectoriesVW);
  var switchbutton = document.getElementById("leftbarheaderbutton");
  switchbutton.addEventListener("click", switchbuttonclicked);
  drawlinechart();
}

showmap();
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59748" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map