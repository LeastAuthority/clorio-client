const {
    app,
    BrowserWindow
} = require('electron')

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // 2. Enable Node.js integration
            nodeIntegration: true
        },
        minWidth:1200,
        minHeight:800
    })
    mainWindow.loadURL(
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../public/index.html'),
            protocol: 'file:',
            slashes: true,
        })
    )

    // Disable inspector
    mainWindow.webContents.on('devtools-opened',() => { 
        mainWindow.webContents.closeDevTools(); 
    });

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})