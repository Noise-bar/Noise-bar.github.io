var ac = new AudioContext();
/* create the Web Audio graph, let's assume we have sound coming out of the
 * node `source` */
var an = ac.createAnalyser();
source.connect(an);
/* Get an array that will hold our values */
var buffer = new Uint8Array(an.fftSize);

var p1 = document.getElementById("1");
var p2 = document.getElementById("2");
var p3 = document.getElementById("3");
var p4 = document.getElementById("4");
var p5 = document.getElementById("5");

function f() {
    /* note that getFloatTimeDomainData will be available in the near future,
     * if needed. */
    an.getByteTimeDomainData(buffer);
    /* RMS stands for Root Mean Square, basically the root square of the
    * average of the square of each value. */
    var rms = 0;
    for (var i = 0; i < buffer.length; i++) {
        rms += buffer[i] * buffer[i];
    }
    rms /= buffer.length;
    rms = Math.sqrt(rms);
    /* rms now has the value we want. */
    resetColours()

    if (rms > 65) {p1.style.color = "rgb(255, 0, 0)";}
    else if (rms > 60 && rms <= 65) { p2.style.color = "rgb(255, 140, 0)"; }
    else if (rms > 55 && rms <= 60) { p3.style.color = "rgb(255, 255, 0)"; }
    else if (rms > 50 && rms <= 55) { p4.style.color = "rgb(173, 255, 47)"; }
    else if (rms < 50) { p5.style.color = "rgb(0, 255, 0)"; }

    requestAnimationFrame(f);
}

function resetColours() {
    p1.style.color = "rgb(110, 110, 110)";
    p2.style.color = "rgb(110, 110, 110)";
    p3.style.color = "rgb(110, 110, 110)";
    p4.style.color = "rgb(110, 110, 110)";
    p5.style.color = "rgb(110, 110, 110)";
}
requestAnimationFrame(f);
/* start our hypothetical source. */
source.start(0);