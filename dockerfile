# 1. Build 단계
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 빌드 시점에 환경변수 주입
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# 빌드 시 환경변수 확인
RUN echo "Building with API URL: ${VITE_API_URL}"
RUN echo "Current working directory: $(pwd)"
RUN echo "Listing files in current directory:"
RUN ls -la

# Vite 설정 파일 확인
RUN echo "Contents of vite.config.ts:"
RUN cat vite.config.ts

RUN npm run build

# 빌드 후 dist 디렉토리 확인
RUN echo "Contents of dist directory:"
RUN ls -la dist

# 2. Production 단계
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]