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

    if (rms > 65) { document.getElementById("TL").style.color = "rgb(255, 0, 0)";}
    else if (rms > 60 && rms <= 65) { document.getElementById("L").style.color = "rgb(255, 140, 0)"; }
    else if (rms > 55 && rms <= 60) { document.getElementById("N").style.color = "rgb(255, 255, 0)"; }
    else if (rms > 50 && rms <= 55) { document.getElementById("O").style.color = "rgb(173, 255, 47)"; }
    else if (rms < 50) { document.getElementById("VG").style.color = "rgb(0, 255, 0)"; }

    requestAnimationFrame(f);
}

function resetColours() {
    document.getElementById("TL").style.color = "rgb(110, 110, 110)";
    document.getElementById("L").style.color = "rgb(110, 110, 110)";
    document.getElementById("N").style.color = "rgb(110, 110, 110)";
    document.getElementById("O").style.color = "rgb(110, 110, 110)";
    document.getElementById("VG").style.color = "rgb(110, 110, 110)";
}
requestAnimationFrame(f);
