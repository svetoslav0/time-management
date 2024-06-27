#!/bin/bash

export PORT=3000
export MONGODB_URI=mongodb://localhost:27017/time-management
export JWT_SECRET=aNpUdKbd4REvtmZuH1XDnZ5XVnDPwOsr

cd Server
ls -sail

pm2 restart api
