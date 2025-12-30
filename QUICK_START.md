# Quick Start Guide - Kas Organisasi

## Langkah Cepat Setup & Running

### 1. Setup Database (3 menit)
```bash
# 1. Buat database
mysql -u root -p -e "CREATE DATABASE kas_organisasi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Import schema
mysql -u root -p kas_organisasi < database_ddl.sql

# 3. Import seed data
mysql -u root -p kas_organisasi < database_seed.sql

# 4. Update password hash (karena seed punya placeholder)
cd backend
npm install
node seed-helper.js
# Copy SQL Update dari output, jalankan ke MySQL
```

### 2. Setup Backend (2 menit)
```bash
cd backend

# Install
npm install

# Config .env (sudah ada, cek DB_PASSWORD)
# Edit .env jika perlu sesuaikan DB_USER dan DB_PASSWORD

# Run
npm run dev

# Server running di http://localhost:5000
```

### 3. Setup Frontend (2 menit)
```bash
cd frontend

# Install
npm install

# Run
npm run dev

# App running di http://localhost:5173
```
