const express = require('express');
const app = express();

const fs = require('fs');
const ytdl = require('ytdl-core');
const port = 8080;

app.use('/static', express.static(__dirname + '/files'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/audio', async (req, res) => {
    var filename = "audio.mp3";
    var url = req.query.url;
    if (!url.includes('youtube') && !url.includes('youtu.be')) {
        res.send("URL 오류");
        return;
    }
    try { 
        await ytdl(url, {filter:'audioonly', quality: 'lowest'}).pipe(fs.createWriteStream(__dirname + '/files/' + filename)).on('finish', () => {  
            res.redirect('/static/' + filename);
        });
    }
    catch { res.send('오류. 나중에 다시 시도 해 주세요.'); }
});

app.get('/video', async (req, res) => {
    var filename = "video.mp4";
    var url = req.query.url;
    if (!url.includes('youtube') && !url.includes('youtu.be')) {
        res.send("URL 오류");
        return;
    }
    try { 
        await ytdl(url, {filter:'videoandaudio', quality: 'highestvideo'}).pipe(fs.createWriteStream(__dirname + '/files/' + filename)).on('finish', () => {
            res.redirect('/static/' + filename);
        });
    }
    catch { res.send('오류. 나중에 다시 시도 해 주세요.'); }
});

app.listen(port);
