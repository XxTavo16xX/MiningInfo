
let minimizeButton = document.getElementById('hideWindow')
let GPUTCouner = document.getElementById('GPUTemperature')
let CPUTCouner = document.getElementById('CPUTemperature')

minimizeButton.addEventListener('click', () => {

    window.API.minimizeWindow()

})

async function loadGPUData(){

    let gpuTemperatureINT = await window.API.getGPUTemperature()

    GPUTCouner.innerText = gpuTemperatureINT.toString()

    loadGPUData()

}


loadGPUData()