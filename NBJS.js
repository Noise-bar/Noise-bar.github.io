+function () {

    var ctx = new AudioContext()

    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;
    
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
            // 16384 sample buffer, 1 channel in, 1 channel out  
            var processor = ctx.createScriptProcessor(16384, 1, 1)
            var source
            var lastChangeTime = 0
            var activeElement = "VG"

            source = ctx.createMediaStreamSource(stream)

            source.connect(processor)
            // source.connect(ctx.destination)
            processor.connect(ctx.destination)

            // loop through PCM data and calculate average
            // volume for a given 16384 sample buffer
            processor.onaudioprocess = function (evt) {
                var input = evt.inputBuffer.getChannelData(0)
                  , len = input.length
                  , total = i = 0
                  , rms
                while (i < len) total += Math.abs(input[i++])
                rms = Math.sqrt(total / len)
                rms = rms * 10
                rms = Math.round(rms * 10) / 10

                console.log(rms)                
                
                var nowTime = Date.now()
                var elapsedTime = nowTime - lastChangeTime

                console.log("Elapsed Time ---- ", elapsedTime)
                console.log("Active Element --------------   ", activeElement)
                if ((elapsedTime > 5000) || (activeElement == "VG" && rms > 1) || (activeElement == "O" && rms > 2) || (activeElement == "N" && rms > 3) || (activeElement == "L" && rms > 4)) {
                    resetColours()
                    if (rms > 4) { document.getElementById("TL").style.backgroundColor = "rgb(255, 0, 0)"; activeElement = "TL" }
                    else if (rms > 3 && rms <= 4) { document.getElementById("L").style.backgroundColor = "rgb(255, 140, 0)"; activeElement = "L" }
                    else if (rms > 2 && rms <= 3) { document.getElementById("N").style.backgroundColor = "rgb(255, 255, 0)"; activeElement = "N" }
                    else if (rms > 1 && rms <= 2) { document.getElementById("O").style.backgroundColor = "rgb(173, 255, 47)"; activeElement = "O" }
                    else if (rms <= 1) { document.getElementById("VG").style.backgroundColor = "rgb(0, 255, 0)"; activeElement = "VG" }
                    lastChangeTime = Date.now()
                }
            }
        }).catch(function (err) {
            console.log('Error!', err);
        });
    } else {
        alert("Error. getUserMedia not supported in this browser. :(")
    }
}()


function resetColours() {
    document.getElementById("TL").style.backgroundColor = "rgb(110, 110, 110)";
    document.getElementById("L").style.backgroundColor = "rgb(110, 110, 110)";
    document.getElementById("N").style.backgroundColor = "rgb(110, 110, 110)";
    document.getElementById("O").style.backgroundColor = "rgb(110, 110, 110)";
    document.getElementById("VG").style.backgroundColor = "rgb(110, 110, 110)";
}
