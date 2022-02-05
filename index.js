/*

-- DataSync
-- @Author: Armando Peralta
-- @Version: Beta 6.0
-- @Date: 29/12/2021
-- @Last Modification Date: 22/01/2022
-- @Description: This is the main file that will load and init the function for the program
-- @URL: none
-- @Programming Language: Javascript

*/

const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron')
const fs = require('fs')
const si = require('systeminformation')
const path =  require('path')

// Window

let mainScreen, appTray

function createMainScreen() {

    mainScreen = new BrowserWindow({

        width: 1280,
        height: 720,
        resizable: false,
        icon: './source/views/css/resources/icons/favicon/favicon.ico',
        transparent: true,
        frame: false,

    })

    mainScreen.removeMenu()
    mainScreen.webContents.openDevTools()
    mainScreen.loadFile('./views/mainScreen.html')

}

async function createAppTray() {

    // This function will get the GPU Temperature and create the tray of the app then will be updated .5 later
    
    const gpuData = await si.graphics()
    const gpuTemperature = gpuData.controllers[0].temperatureGpu

    let iconToSet = 'iconTray' + gpuTemperature + '.png'
      
    const icon = nativeImage.createFromPath(path.join(__dirname, 'source/app/src/icons/' + iconToSet))
    appTray = new Tray(icon)

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Cerrar Mining Info', click: () => QuitApp() }
    ])

    appTray.setContextMenu(contextMenu)
    
    appTray.setToolTip('Mining Info')

    updateTrayIcon()

}

async function updateTrayIcon(){

    let gpuTemperatureState = 'green'

    const gpuData = await si.graphics()
    const gpuTemperature = gpuData.controllers[0].temperatureGpu
    
    let iconToSet = 'iconTray' + gpuTemperature + '.png'
      
    const icon = nativeImage.createFromPath(path.join(__dirname, 'source/app/src/icons/' + iconToSet))
    appTray.setImage(icon);

    updateTrayIcon()

}

app.whenReady().then(() => {

    createAppTray()
    //createMainScreen()
})

function QuitApp(){

    console.log('askjdalksjd')
    app.exit()

}