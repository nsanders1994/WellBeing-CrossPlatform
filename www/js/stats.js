/**
 * Created by Natalie on 4/12/2016.
 */

// Get the context of the canvas element we want to select
var ctx = document.getElementById("myChart").getContext("2d");
var data = {
    labels : ["January","February","March","April","May","June"],
    datasets : [
        {
            fillColor : "rgba(73,179,214,0.4)",
            strokeColor : "#ACC26D",
            pointColor : "#fff",
            pointStrokeColor : "#9DB86D",
            data : [203,156,99,251,305,247]
        }
    ]
}

new Chart(ctx).Line(data);