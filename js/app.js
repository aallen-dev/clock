window.onload = app;

// runs when the DOM is loaded
function app() {
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {
            url: "./dist/style.css"
        },
        //js
        {
            url: "./bower_components/jquery/dist/jquery.min.js"
        }, {
            url: "./bower_components/lodash/dist/lodash.min.js"
        }
        // {url: "./bower_components/backbone/backbone.js"}
    ).then(function() {
        document.querySelector("html").style.opacity = 1;
        // start app?
    })

    var id = function(v) {
            return document.getElementById(v)
        },
        getTimeArray = function(now) {

            return [now.getHours(), now.getMinutes(), now.getSeconds()];

        },
        roundLength = function(v, len) {
            // var len = len || 2;
            // while((str+'').length<len)str = '0' + str
            var str = v + '';
            return str.length > 1 ? str : '0' + str;
        },
        isLight = function(rgb) {
            var rgb = parseInt(rgb, 16);
            var r = (rgb >> 16) & 0xff;
            var g = (rgb >> 8) & 0xff;
            var b = (rgb >> 0) & 0xff;

            var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            return luma >= 70;
        },
        times = [] ,
        everySecond = function() {
            var getHex = function(arr) {
                return arr.map(function(v) {
                        return roundLength(v.toString(16))
                    })
                    .join('');
            };
            var timeArray = getTimeArray(new Date());
            var hex       = getHex(timeArray);

            times.push(timeArray.map(function(v , i , a){
                var num = Math.floor(( v + a[2] * (i+1)) * 5)
                while(num>255)num-=255;
                return num;
            }))
            if (times.length>5)times.shift()
            
            var hexes = times.map(function(timeArr){
                return getHex(timeArr)
            });

            !id('reverse').checked && hexes.reverse();

            // id('output').innerText = hexes.join(' , #')

            id('hex').innerText = hexes[0];

            id('clock').innerText = getTimeArray(new Date()).map(roundLength).join(":");
            id('clock').style.color = isLight(hexes[0])||isLight(hexes[1])||isLight(hexes[2]) ? '#000' : '#fff';
            id('back').style.color = isLight(hexes[0])||isLight(hexes[1])||isLight(hexes[2]) ? '#000' : '#fff';

            id('back').style.background = 'radial-gradient( #' + hexes.join(' , #') + ')';

            id('line').style.width = getTimeArray(new Date())[2] + '%';

            setTimeout(everySecond, 80);
            
        };

    everySecond();

}
