const { app, BrowserWindow, clipboard, ipcRenderer, session, Menu, globalShortcut } = require('electron')
const path = require('path')
const {exec, spawn} = require('child_process')
// const clipboardWatcher = require('electron-clipboard-watcher')

// 启动v2ray代理
const childProcess = spawn('./v2ray-windows-64/v2ray.exe', { stdio: 'inherit' })
childProcess.on('close', (code) => {
    console.log(`v2ray代理已关闭: ${code}`)
})

let window;
// 当应用程序启动时创建一个新的会话对象
// clipboardWatcher({
//     // (optional) delay in ms between polls
//     watchDelay: 1000,

//     // handler for when image data is copied into the clipboard

//     // handler for when text data is copied into the clipboard
//     onTextChange: function (text) {
//         // console.log(text)
//         const win = BrowserWindow.getFocusedWindow()
//         const webContents = win.webContents

//         // 向渲染进程发送消息
//         webContents.send('message', text)
//     }
// })


// 创建窗口函数
const createWindow = () => {
    window = new BrowserWindow({
        width: 700,
        height: 600,
        // maximizable: false, // 禁用最大化按钮
        // resizable: false, // 不能调整窗口大小 高度和宽度都不能设置
        // 高度能设置 宽度不能设置
        // 设置窗口初始化位置
        x: 0,
        y: 0,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        // frame: false,
    })
    // 窗口置顶
    window.setAlwaysOnTop(true)
    // 加载指定页面
    // window.loadURL('https://poe.com/chatgpt')
    window.loadURL('https://chat.openai.com/')
    // 设置页面加载后的事情
    window.webContents.on('did-finish-load', () => {

    })
    // 设置快捷键实现窗口显示或隐藏
    globalShortcut.register('Home', () => {
        if (window.isVisible()) {
            window.hide()
        } else {
            window.show()
        }
    })
    globalShortcut.register('CmdOrCtrl+Enter', () => {
        window.webContents.send('trigger-button-click')
    })
}


app.whenReady().then(() => {
    createWindow()
    // 取消菜单
    Menu.setApplicationMenu(null)
})

// 取消注册的所有快捷键
app.on('will-quit', () => {
    globalShortcut.unregisterAll()
});

app.commandLine.appendSwitch('proxy-server', 'socks5://127.0.0.1:1080')