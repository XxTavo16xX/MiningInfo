const { createCanvas } = require('canvas')
const fs = require('fs')

function generateImage(textToSet, textState) {

    const width = 2000
    const height = 2000

    const canvas = createCanvas(width, height)
    const context = canvas.getContext('2d')

    context.fillStyle = '#ffffff00'
    context.fillRect(0, 0, width, height)

    context.font = 'normal 1700px Sans'
    context.textAlign = 'center'

    switch (textState) {

        case 'green':
            context.fillStyle = '#0cf063'
            break;
        case 'yellow':
            context.fillStyle = '#fbc241'
            break;
        case 'red':
            context.fillStyle = '#bb1313'
            break;


    }

    context.fillText(textToSet, 1000, 1600)

    imageName = 'iconTray' + textToSet

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./source/' + imageName + '.png', buffer)

}

for(let i = 1; i < 101; i++){

    gpuTemperature = i

    let gpuTemperatureState = 'green'

    if (gpuTemperature > 75) { gpuTemperatureState = 'yellow' }
    if (gpuTemperature > 85) { gpuTemperatureState = 'red' }

    generateImage(gpuTemperature,gpuTemperatureState)

}

module.exports = {
    generateImage: generateImage
}