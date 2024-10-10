# 使用 Node.js 的官方映像
FROM node:18

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製專案檔案
COPY . .

# 建立專案
RUN npm run build

# 指定要運行的端口
EXPOSE 3000

# 定義啟動命令
CMD ["npm", "start"]
