var {app, Tray, ipcMain, BrowserWindow} = require('electron');
var path = require('path');
var url = require('url');


var win;
var tray = null;


function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        width: 450,
        height: 600,
        minWidth: 400,
        minHeight:500,
        backgroundColor: '#f03e3e'
    });

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'www/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // open dev tools
    //win.webContents.openDevTools();

    // Tray
    tray = new Tray(path.join(__dirname, 'app_icons/tray-icon.png'));
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    app.quit();
})

// Receive messages from the web-page
ipcMain.on('update-duration', (event, arg) => {

    tray.setTitle(arg);
})


