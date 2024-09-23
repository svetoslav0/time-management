echo "Deleting backend logs"
true > /var/lib/jenkins/.pm2/logs/api-error.log
true > /var/lib/jenkins/.pm2/logs/api-out.log

echo "Deleting frontend logs"
true > /var/lib/jenkins/.pm2/logs/client-error.log
true > /var/lib/jenkins/.pm2/logs/client-out.log

echo "Building backend . . ."
cd Server
ls -sail

touch .env
echo "ENV=$ENV" >> .env
echo "DEV_ADDRESS=$DEV_ADDRESS" >> .env
echo "PORT=$PORT" >> .env
echo "MONGODB_URI=$MONGODB_URI" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env
echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env
echo "SMTP_USER=$SMTP_USER" >> .env
echo "SMTP_PASS=$SMTP_PASS" >> .env

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

echo "Finished building the backend."

cd ..

echo "Building frontend . . ."

cd Client

npm install

echo "mkdir -p environment"
mkdir -p environment

cd environment
touch .env.stage
echo "VITE_API_BASE_URL=$VITE_API_BASE_URL" >> .env.stage
echo "VITE_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env.stage
echo "VITE_ENV=$ENV" >> .env.stage

cd ../ssl

cat /etc/ssl/certs/test-opshero.site.key >> private.key
cat /etc/ssl/certs/test-opshero_site.crt >> cert.crt

cd ..

echo "vite build --mode stage"
vite build --mode stage


if pm2 list | grep client; then
    echo "The PM2 process for client exists. Restarting client service . . ."
    pm2 restart client
else
    echo "No PM2 process for client found. Starting . . ."
    pm2 start "vite preview --debug --host --port 443 --mode stage" --name client
fi

sleep 10

pm2 ls
pm2 show client
cat /var/lib/jenkins/.pm2/logs/client-error.log
cat /var/lib/jenkins/.pm2/logs/client-out.log


echo "Finished building frontend."
echo "Deployment completed."