echo "Deleting error logs"
true > /var/lib/jenkins/.pm2/logs/api-error.log

cd Server
ls -sail

echo "Running npm install . . ."
npm install
npm install dotenv

pm2 ls

if pm2 list | grep api; then
    echo "The PM2 process for api exists. Restarting API service . . ."
    pm2 restart api
else
    echo "No PM2 process for api found. Starting . . ."
    pm2 start index.js --name api
fi


sleep 10

pm2 ls
pm2 show api
cat /var/lib/jenkins/.pm2/logs/api-error.log