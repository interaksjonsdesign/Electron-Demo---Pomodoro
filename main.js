var {app, BrowserWindow} = require('electron');
var path = require('path');
var url = require('url');

var win;


function createWindow() {

    // Create the browser window.
    win = new BrowserWindow({
        width: 450,
        height: 600,
        backgroundColor: '#f03e3e',
        minWidth: 400,
        minHeight:500
    });

    // Load the index.html into the window.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'www/index.html'),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {

    app.quit()
})

