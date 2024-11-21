let start = Date.now();
var now = 0;
var minus = 0;
var Subtracted = 0;
var Perfection = 0;

function clock() {
    now = Date.now() - start;
    minus += 1000;
    Subtracted = now - minus;
    Perfection = 1000 - Subtracted;
    
    console.log(now);
    
    setTimeout(clock, Perfection);
}

clock();
