const { contextBridge, ipcRenderer } = require('electron')
const si = require('systeminformation')

const API = {

    //TitleBar Options

    minimizeWindow: () => { ipcRenderer.send('app-titleBar', 'minimize') },

    // Global Functions

    getGPUTemperature: async () => {

        const gpuData = await si.graphics()
        const gpuTemperature = gpuData.controllers[0].temperatureGpu

        return gpuTemperature

    }
}

contextBridge.exposeInMainWorld('API', API)