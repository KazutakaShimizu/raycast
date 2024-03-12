#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title togglを開始
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🤖

// Documentation:
// @raycast.author s_kazutaka55555
// @raycast.authorURL https://raycast.com/s_kazutaka55555

const https = require('https');

const API_TOKEN = '';
const TZ = '+09:00';
const WORKSPACE_ID = '';

// 現在の日時をISO 8601形式で取得する関数
function getCurrentTime() {
  const now = new Date();
  const isoString = now.toISOString();
  const tzOffset = (now.getTimezoneOffset() / 60) * -1; // 時間オフセットを取得して符号を反転させる
  const offsetString =
    (tzOffset >= 0 ? '+' : '-') +
    Math.abs(tzOffset).toString().padStart(2, '0') +
    ':00'; // オフセット文字列を作成する
  return isoString.slice(0, 19) + offsetString; // 時間オフセットを追加して返す
}

// Togglのタイマーを開始する関数
function startTogglTimer(description) {
  const current_time = new Date();

  const data = JSON.stringify({
    start: current_time,
    created_with: 'YourAppNameHere',
    wid: WORKSPACE_ID,
    duration: -1,
  });

  const options = {
    hostname: 'api.track.toggl.com',
    port: 443,
    path: '/api/v9/time_entries',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(API_TOKEN + ':api_token').toString(
        'base64'
      )}`,
    },
  };

  const req = https.request(options, (res) => {
    let responseBody = '';
    res.on('data', (chunk) => {
      responseBody += chunk;
    });
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('Toggl timer started successfully.');
      } else {
        console.error(`Error! Status code: ${res.statusCode}\n${responseBody}`);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error starting Toggl timer:', error);
  });

  req.write(data);
  req.end();
}

// 新しいタイマーを開始するための説明を指定して関数を呼び出す
startTogglTimer('Task description here');
