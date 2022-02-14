const express = require('express');
const app = express();

const fs = require('fs');
const ytdl = require('ytdl-core');
const path = require('path');
const  mime = require('mime');
const port = 80;

app.use('/static', express.static('files'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/audio', async (req, res) => {
    var url = req.query.url;
    try { 
        await ytdl(url, {filter:'audioonly', quality: 'highestaudio'}).pipe(fs.createWriteStream('files/audio.mp3')).on('finish', () => {
            res.redirect('/static/audio.mp3');
        });
    }
    catch { res.send('오류, 나중에 다시 시도 해 주세요.'); }
})

app.get('/video', async (req, res) => {
    var url = req.query.url;
    try { 
        await ytdl(url, {filter:'videoandaudio', quality: 'highestvideo'}).pipe(fs.createWriteStream('files/video.mp4')).on('finish', () => {
            res.redirect('/static/video.mp4');
        });
    }
    catch { res.send('오류, 나중에 다시 시도 해 주세요.'); }
})

app.listen(port);