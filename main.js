const fs = require('fs');
const fetch = require('node-fetch');

const url = "https://impact.fidfimpact.org:2096/Documents/AppPicture/"

async function download(img_name) {
    const response = await fetch(url+img_name);
    if(!response.ok){
        return;
    }
    const buffer = await response.buffer();
    fs.writeFile(`./`+img_name, buffer, () =>
        console.log(img_name+' downloaded!'));
}
for(let img_id=1; img_id<100000; img_id++){
    setTimeout(()=>{download(img_id.toString()+".jpg")},(img_id)*120)
}
