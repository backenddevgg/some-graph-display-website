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

    canvasData.height > window.innerHeight * .8 ? canvasData.height = window.innerHeight * .8 : null
    canvasData.width > window.innerWidth * .8 ? canvasData.width = window.innerWidth * .8 : null

    function setSize(el){
        el.setAttribute("height", canvasData.height + "px")
        el.setAttribute("width", canvasData.width + "px");
    }

    const tglBtn = document.getElementById("toggleTable");
    let gentbl = false
    const submitBtn = document.getElementById("submitBtn");
    const canvas = document.getElementById("cnv");
    ctx = canvas.getContext("2d")
    setSize(canvas)
    drawMiddleLines(ctx)
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

        renderF(ctx, f, gentbl);
        
    })

    const rsze = (id, whatToChange) => {
        const rszeIt = document.getElementById(id)
        rszeIt.setAttribute("value", (whatToChange == 'h' ? canvasData.height : canvasData.width))
        rszeIt.removeAttribute("disabled")
        rszeIt.addEventListener("change", (evt) => {
            whatToChange == 'h' ? canvasData.height = evt.target.value : canvasData.width = evt.target.value;
            setSize(canvas)
            submitBtn.click()
        })
    }

    rsze("rszeHeight", 'h')
    rsze("rszeWidth", 'w')

    tglBtn.addEventListener("click", (evt) => {
        gentbl = !gentbl
        let txt = tglBtn.getElementsByTagName("span")[0].innerText
        if(txt == "Enable") txt = "Hide the table content by<br/>clicking on the letter <q>x</q> in the table.<br/>Disable"
        else txt = "Enable"
        tglBtn.getElementsByTagName("span")[0].innerHTML = txt
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
function someRandomEventThatIsFunnyButNeverEditedAgain(evt){document.querySelector('section#table table').style.opacity = 1; evt.target.removeEventListener("click",someRandomEventThatIsFunnyButNeverEditedAgain)}
function someOtherRandomFunctionThatIsCalledBeforeButInitializedAfterThatWeirdEvent(){document.querySelector('section#table table').style.opacity = 0;alert('You can make the table visible again by clicking on the example function in the instruction on top of this site :)');document.querySelector('#input p code').addEventListener('click',someRandomEventThatIsFunnyButNeverEditedAgain)}

function renderF(ctx, f, shouldCreateTable){
    ctx.strokeStyle = "#010101"
    let copyOfF;
    let tableContent = "<button onclick=\"document.querySelector('table button span.riugfsagfjds').innerText = 'Stop clicking this button it does absolutely nothing.'\">hide <span class=\"riugfsagfjds\"></span></button><br/><tr><td onclick=\"someOtherRandomFunctionThatIsCalledBeforeButInitializedAfterThatWeirdEvent()\">x</td><td>y</td></tr>";
    ctx.moveTo(0,midY());
    for(x = 0; x < canvasData.width; x++){
        copyOfF = f;
        copyOfF = copyOfF.replaceAll("x", "(" + (x-midX()) + ")");
        let y = math.evaluate(copyOfF)
        ctx.lineTo(x, canvasData.height - (y + midY()));
        if(shouldCreateTable)
            tableContent += `<tr><td>${x-midX()}</td><td>${y}</td></tr>`
    }
    if(shouldCreateTable)
        document.querySelector("section#table table").innerHTML = tableContent;

    ctx.stroke()
}

function someFunctionThatMakesAWeirdAnimationStopByPressingXOnTheKeyboard(evt){
    if(evt.code == 'KeyX'){
        document.querySelector("body").removeAttribute("weird")
        document.removeEventListener("keyup", someFunctionThatMakesAWeirdAnimationStopByPressingXOnTheKeyboard);
    }
}