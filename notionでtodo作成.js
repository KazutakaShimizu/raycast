#!/usr/bin/env node

// Required parameters:
// @raycast.schemaVersion 1
// @raycast.title NotionでTODO作成
// @raycast.mode compact

// Optional parameters:
// @raycast.icon 🗒️
// @raycast.argument1 { "type": "text", "placeholder": "TODO作成" }

// Documentation:
// @raycast.author s_kazutaka55555
// @raycast.authorURL https://raycast.com/s_kazutaka55555
const https = require('https');
const args = process.argv.slice(2);
const MY_NOTION_TOKEN = '';
const DATABASE_ID = '';

const title = args[0];
const data = JSON.stringify({
  parent: {
    database_id: DATABASE_ID,
  },
  properties: {
    タイトル: {
      title: [
        {
          text: {
            content: title,
          },
        },
      ],
    },
    優先度: {
      select: {
        name: '中',
      },
    },
    ステータス: {
      select: {
        name: 'TODO',
      },
    },
    Date: {
      date: {
        start: new Date(),
      },
    },
  },
});

const options = {
  hostname: 'api.notion.com',
  path: '/v1/pages',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${MY_NOTION_TOKEN}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2021-05-13',
  },
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(responseData);
  });
});

req.on('error', (error) => {
  console.error('Error creating Notion page:', error);
});

req.write(data);
req.end();
