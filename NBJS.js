var p1 = document.getElementById("TL");
var p2 = document.getElementById("L");
var p3 = document.getElementById("N");
var p4 = document.getElementById("O");
var p5 = document.getElementById("VG");

var ctx = new AudioContext();
var processor = ctx.createScriptProcessor(2048, 1, 1)

function f() {
    processor.onaudioprocess = function (evt) {
        var input = evt.inputBuffer.getChannelData(0);
        var len = input.length;
        var total = i = 0;
        var rms;

        while (i < len) total += Math.abs(input[i++])
        rms = Math.sqrt(total / len)
    }

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
