/*
var express = require('express');
var app = express();
const port=8000;
// use line below if html file is in root directory
app.use(express.static(__dirname));
// use line below if html file is in nested folder
// app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.render('index.html');
});


app.listen(port, ()=> console.log(`Google Drive Api PORT ${port}`) )

*/
// 

const { google } = require('googleapis');

const path = require('path');
const fs = require('fs');
const { async } = require('regenerator-runtime');


const CLIENT_ID = '270888595192-dm3u1eiib7nc4v950goaorphhj72m0oh.apps.googleusercontent.com';
//const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04N1CEZpK42E3CgYIARAAGAQSNwF-L9IrE3hb2zYBKPI1EYkmp5ZCjbmBVSyFOd2cJURgjUpBZhC23ayvkK1RezqGxdRflRtoh8I';


const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN });

//to initialize drive

const drive = google.drive({
    version: 'v3',
    auth: oauth2client
})
const filepath = path.join(__dirname, 'man.jpg')

//to upload a file 

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: ' FirstFile.jpg',
                mineType: 'image/jpg'
            },
            media: {
                mineType: 'image/jpg',
                body: fs.createReadStream(filepath)
            }

        })

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

//uploadFile();

// to delete Files
async function deleteFile() {

    try {
        const response = await drive.files.delete({
            fileId: '1K2v94n9IvVCmvROkJ6KxkcwPKvjdm58a',
        });

        console.log(response.data, response.status);

    } catch (error) {
        console.log(error.message)
    }
}

//deleteFile();

// to generate public url // share
async function generatePublicUrl() {

    try {
        const fileId = '1N_J-M992PhpK_EBr9KUT6a-QhN_gL6b0';
        await drive.permissions.create({

            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink , webContentLink'
        })
        console.log(result.data);

    } catch (error) {

        console.log(error.message)
    }
}

generatePublicUrl();