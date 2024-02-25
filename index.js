const canvasData = {
    height: 1000,
    width: 1500,
    distortion: 100,
    lineLengths: 30
}
const midX = () => {return canvasData.width/4}
const midY = () => {return canvasData.height/2}

let ctx;

window.onload = () => {
    function setSize(el){
        el.setAttribute("height", canvasData.height + "px")
        el.setAttribute("width", canvasData.width + "px");
    }

    const tglBtn = document.getElementById("toggleTable");
    const tbl = document.querySelector("section#table table")
    let gentbl = false
    const submitBtn = document.getElementById("submitBtn");
    const canvas = document.getElementById("cnv");
    ctx = canvas.getContext("2d")
    setSize(canvas)
    submitBtn.addEventListener("click", (evt) => {
        ctx.font = "30px Verdana";

        //clear canvas
        ctx.moveTo(0,0);
        ctx.beginPath()
        ctx.clearRect(0, 0, canvasData.width, canvasData.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        drawMiddleLines(ctx)

        let f = document.querySelector("input#fIn").value;
        //print function onto canvas
        ctx.fillText(`f(x)=${f}`,20,40);

        renderF(ctx, f, {tbl, gentbl});
        
    })

    const rszeHeight = document.getElementById("rszeHeight")
    rszeHeight.setAttribute("value", canvasData.height)
    rszeHeight.removeAttribute("disabled")
    rszeHeight.addEventListener("change", (evt) => {
        canvasData.height = evt.target.value;
        setSize(canvas)
        submitBtn.click()
    })

    tglBtn.addEventListener("click", (evt) => {
        gentbl = !gentbl
        let txt = tglBtn.getElementsByTagName("span")[0].innerText
        if(txt == "Enable") txt = "Disable"
        else txt = "Enable"
        tglBtn.getElementsByTagName("span")[0].innerText = txt
    })

}

function drawMiddleLines(ctx){
    ctx.strokeStyle = "#4447"
    ctx.moveTo(0,midY());
    ctx.lineTo(canvasData.width, midY());
    ctx.stroke();
    ctx.moveTo(midX(), canvasData.height);
    ctx.lineTo(midX(), 0);
    ctx.stroke();
    drawStriche(ctx);
}

function drawStriche(ctx){
    ctx.font = "20px Verdana"
    //x
    for(i = midX() % canvasData.distortion; i < canvasData.width; i += canvasData.distortion){
        ctx.moveTo(i,midY() - canvasData.lineLengths/2);
        ctx.lineTo(i, midY()+canvasData.lineLengths/2);
        ctx.fillText(-(midX()-i), i, midY()+canvasData.lineLengths/2+10)
        ctx.stroke()
    }
    //y
    for(i = midY() % canvasData.distortion; i < canvasData.height; i+= canvasData.distortion){
        ctx.moveTo(midX() - canvasData.lineLengths/2,i);
        ctx.lineTo(midX()+canvasData.lineLengths/2,i);
        ctx.fillText(midY()-i, midX()-(canvasData.lineLengths/2)-(i.toString().length * 10), i)
        ctx.stroke()
    }
}

function renderF(ctx, f, {table, shouldCreateTable}){
    ctx.strokeStyle = "#010101"
    let copyOfF;
    let innerTableHTML
    if(shouldCreateTable)
        innerTableHTML = table.innerHTML + "<tr><td>x</td><td>y</td></tr>"
    ctx.moveTo(0,midY());
    for(x = 0; x < canvasData.width; x++){
        copyOfF = f;
        copyOfF = copyOfF.replaceAll("x", "(" + (x-midX()) + ")");
        let y = math.evaluate(copyOfF)
        ctx.lineTo(x, canvasData.height - (y + midY()));
        if(shouldCreateTable) //insecure
            innerTableHTML += `<tr><td>${x}</td><td>${y}</td></tr>`
    }
    if(shouldCreateTable)
        table.innerHTML = innerTableHTML

    ctx.stroke()
}