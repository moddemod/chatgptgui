const {ipcRenderer} = require('electron')

ipcRenderer.on('message', (evt, arg) => {
    // 这里就可以操作dom
    const text = arg
    document.querySelector('textarea.GrowingTextArea_textArea__eadlu').value = text

})

ipcRenderer.on('trigger-button-click', () => {
    let textarea = document.getElementById('prompt-textarea')
    let btn_send = textarea.nextSibling
    btn_send.click()
})

let count = 0;
window.addEventListener('DOMContentLoaded', () => {
    // window.alert('hello')
    if (count) {
        return;
    }
    setTimeout(() => {
       // document.querySelector('aside.PageWithSidebarLayout_leftSidebar__Y6XQo').remove()
       // document.querySelector('.PageWithSidebarLayout_headerWrapper__V_ep_').remove()
       // // document.querySelector('section.ChatMessageSuggestedReplies_suggestedRepliesContainer__JgW12').remove()
       // document.body.style.backgroundColor = 'lightblue'
    }, 1000);
    count++;

})