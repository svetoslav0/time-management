echo "Deleting error logs"
true > /var/lib/jenkins/.pm2/logs/api-error.log

cd Server
ls -sail

echo "Running npm install . . ."
npm install
npm install dotenv

pm2 ls

echo "Restarting API service . . ."
pm2 restart api
# pm2 start index.js --name api

sleep 10

pm2 ls
pm2 show api
cat /var/lib/jenkins/.pm2/logs/api-error.log