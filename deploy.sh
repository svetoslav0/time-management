echo "Deleting backend logs"
true > /var/lib/jenkins/.pm2/logs/api-error.log
true > /var/lib/jenkins/.pm2/logs/api-out.log

echo "Building backend . . ."
cd Server
ls -sail

touch .env
echo "ENV=$ENV" >> .env
echo "DEV_ADDRESS=$DEV_ADDRESS" >> .env
echo "PORT=$PORT" >> .env
echo "MONGODB_URI=$MONGODB_URI" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env

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

cd ..

ls -sail
pwd

echo "vite build"
vite build

echo "vite preview --host --port 5173 --mode stage &"
vite preview --host --port 5173 --mode stage &

echo "Finished building frontend."