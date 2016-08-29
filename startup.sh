cd /opt/domino
sleep 15
/usr/bin/node /opt/domino/app.js 1>/opt/domino/log/app.log &

sleep 3
/usr/bin/google-chrome --kiosk --incognito https://localhost:3000/
