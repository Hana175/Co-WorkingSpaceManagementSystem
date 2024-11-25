#nodeJS image
FROM node:18

#main directory
WORKDIR /usr/src/app

#copy package.json and install dependencies 
COPY package*.json ./
#install dependencies
RUN npm install

# copy application code
COPY . .

#application port
EXPOSE 3001

# start the app
CMD ["node", "app.js"]
