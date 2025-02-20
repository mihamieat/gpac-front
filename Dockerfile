FROM node:20
WORKDIR /code
ENV NEXT_PUBLIC_API_USERNAME="none"
ENV NEXT_PUBLIC_API_URL="none"
ENV NEXT_PUBLIC_API_PASSWORD="none"
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD npm run start
