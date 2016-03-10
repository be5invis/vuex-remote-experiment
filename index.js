var app = require('app');
var BrowserWindow = require('browser-window');

app.on('window-all-closed', function() {
	app.quit()
});

var storage = require('./storage');
var Syncer = require('./syncer');

var windows = {};
var syncer = new Syncer();
app.storage = storage(syncer);
app.syncer = syncer;

function createWindow(id) {
	var window = new BrowserWindow({ width: 300, height: 200 });
	windows[id] = window;
	window.loadURL('file://' + __dirname + '/test.html');
	window.on('closed', function() {
		window = null;
		windows[id] = null;
	});
};

const ipcMain = require('electron').ipcMain;
ipcMain.on('ping', function(event, arg) { event.returnValue = syncer.attach(event.sender) });
ipcMain.on('window-closed', function(event, id){ syncer.detach(id) });

app.on('ready', function() {
	createWindow('first');
	createWindow('second');
});