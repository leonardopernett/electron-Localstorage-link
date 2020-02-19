const {app, BrowserWindow, Menu} = require('electron');
const url = require('url')
const path = require('path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });

let main = null;

app.on('ready',()=>{
  main = new BrowserWindow({
       width:500,
       height:400,
       title:"task LocalStorage",
       webPreferences:{
           nodeIntegration:true
       }
   })

   main.loadURL(url.format({
      pathname:path.join(__dirname,'index.html'),
      slashes:true,
      protocol:'file'
   }))

    //start menu
     const principal =  Menu.buildFromTemplate(template)
     Menu.setApplicationMenu(principal)

     main.on('closed',()=>{
         app.quit()
     })

})


const template = [
    {
        label:'file',
        submenu:[
            {
                label:'new product',
                accelerator:'Ctrl + N',
                click(){

                }
            }
        ]
    }
]

if(process.env.NODE_ENV !='production'){
     template.push({
         label:'devTools',
         submenu:[
             {
                 label:'hide/show devTools',
                 accelerator:'Ctrl + p',
                 click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                }
             }
         ]
     })
}