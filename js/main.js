const playButton = document.querySelector("#play-btn");
const resetButton = document.querySelector("#reset-btn");
const pauseButton = document.querySelector("#pause-btn");
const slider = document.querySelector("#audioSlider");

const dropZones = document.querySelectorAll(".drop-square");
const instruments = document.querySelectorAll(".instruments")

let draggedItem = null;
const draggedAudio = [];


instruments.forEach(e => { 
    e.addEventListener("dragstart",(d) => 
    {
        draggedItem = d.currentTarget;
    });
});

dropZones.forEach(e => { 
    e.addEventListener("dragover",(d) => {
        d.preventDefault();
    });

    e.addEventListener("drop",(d) => {
        const acceptedType = e.dataset.accepts;
        instruments.forEach(i => {
            if (i.dataset.type === acceptedType && draggedItem.dataset.type === acceptedType)
            {
                e.appendChild(i);
                const audio = e.querySelector("audio"); 
                if (audio)
                {
                    draggedAudio.push(audio);
                    audio.currentTime=0;
                    audio.loop = true;
                    audio.play();
                
                }
            }
        })
    })
});


playButton.addEventListener("click", (d) =>{
    draggedAudio.forEach(a => {
        a.play();
        a.loop = true;
    })
}) 

pauseButton.addEventListener("click", (d) =>{
    draggedAudio.forEach(a => {
        a.pause();
    })
}) 

resetButton.addEventListener("click", (d) =>{
    window.location.reload();
}) 

slider.addEventListener("input", (d) =>{
    draggedAudio.forEach(a => {
        a.volume=slider.value/100;
    })
}) 
