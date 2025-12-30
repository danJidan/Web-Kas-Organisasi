# Kas Organisasi Frontend (Vue 3)

Antarmuka pengguna untuk aplikasi **Kas Organisasi**. Dibangun dengan Vue 3 + Vite, fokus pada manajemen kas berbasis budgets, categories, dan transaksi dengan dukungan proteksi rute dan otorisasi berbasis peran.

## 🚀 Fitur Utama
- Dashboard ringkasan real-time (total income, expense, balance, dan transaksi terbaru)
- CRUD Budgets, Categories, Transactions dengan modal form responsif
- Routing terproteksi berbasis token JWT + role guard admin/member
- Interceptor Axios otomatis menempelkan token dan meng-handle sesi kedaluwarsa
- Tabel transaksi dengan filter tipe dan rentang tanggal serta pagination server-side
- Detail transaksi lengkap termasuk meta JSON (untuk data fleksibel seperti bukti transfer)

## 🧰 Prasyarat
- Node.js v16+ dan npm
- Backend `kas-organisasi` berjalan di `http://localhost:5000` (atau sesuaikan)

## ⚙️ Konfigurasi Lingkungan
Buat file `.env` pada folder `frontend/` bila perlu mengganti base URL backend.

```
VITE_API_URL=http://localhost:5000
```

Tanpa `.env`, aplikasi otomatis fallback ke `http://localhost:5000`.

## 🏃‍♂️ Cara Menjalankan
```bash
cd frontend
npm install
npm run dev
```
Buka `http://localhost:5173` lalu login dengan kredensial demo dari backend seed (`admin@demo.com / Admin123!`).

## 📦 Skrip npm
| Perintah        | Fungsi                                 |
| --------------- | -------------------------------------- |
| `npm run dev`   | Menjalankan server Vite (hot module)   |
| `npm run build` | Build produksi ke folder `dist/`       |
| `npm run preview` | Menjalankan preview dari hasil build |

## 🗂️ Struktur Direktori
```
frontend/
├── src/
│   ├── api/axios.js        # Instance Axios + interceptor token
│   ├── components/Navbar.vue
│   ├── router/index.js     # Definisi rute + navigation guard
│   ├── views/              # Halaman utama (Login, Dashboard, dll)
│   ├── App.vue
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
└── README.md (file ini)
```

## 🧭 Pemetaan Rute & Hak Akses
| Path | Nama | Komponen | Proteksi |
| --- | --- | --- | --- |
| `/login` | Login | Login.vue | Publik, redirect ke dashboard bila sudah login |
| `/` | Root | Redirect | Mengarah ke `/dashboard` |
| `/dashboard` | Dashboard | Dashboard.vue | Auth wajib |
| `/budgets` | Budgets | Budgets.vue | Auth wajib |
| `/categories` | Categories | Categories.vue | Auth + role `admin` |
| `/transactions` | Transactions | Transactions.vue | Auth wajib |
| `/transactions/new` | TransactionNew | TransactionForm.vue | Auth wajib |
| `/transactions/:id` | TransactionDetail | TransactionDetail.vue | Auth wajib |
| `/transactions/:id/edit` | TransactionEdit | TransactionForm.vue | Auth + role `admin` |

## 🌐 Tabel Konsumsi API Frontend
| Halaman/Komponen | Method | Endpoint | Keterangan |
| --- | --- | --- | --- |
| Login | POST | `/auth/login` | Kirim kredensial, simpan token + data user saat sukses |
| Dashboard | GET | `/summary` | Ambil ringkasan total pemasukan/pengeluaran, saldo, jumlah transaksi, dan 5 transaksi terbaru |
| Budgets | GET | `/budgets` | Daftar seluruh budget aktif untuk tabel dan form select |
| Budgets | POST | `/budgets` | Tambah budget baru (khusus admin) |
| Budgets | PUT | `/budgets/:id` | Perbarui budget (khusus admin) |
| Budgets | DELETE | `/budgets/:id` | Hapus budget (khusus admin) |
| Categories | GET | `/categories` | Daftar kategori untuk tabel dan form select |
| Categories | POST | `/categories` | Tambah kategori baru (admin) |
| Categories | PUT | `/categories/:id` | Edit kategori (admin) |
| Categories | DELETE | `/categories/:id` | Hapus kategori (admin) |
| Transactions list | GET | `/transactions` + query `page`, `limit`, `trx_type`, `date_from`, `date_to` | Ambil daftar transaksi dengan filter & pagination |
| Transactions list | DELETE | `/transactions/:id` | Hapus transaksi (admin) |
| Transactions list | POST | `/transactions/:id/request-delete` | Member minta admin menghapus transaksi |
| Transactions admin | POST | `/transactions/:id/confirm-delete` | Admin menyetujui permintaan hapus dan menghapus transaksi |
| Transaction form | GET | `/transactions/:id` | Ambil detail transaksi saat mode edit |
| Transaction form | POST | `/transactions` | Buat transaksi baru |
| Transaction form | PUT | `/transactions/:id` | Update transaksi |
| Transaction detail | GET | `/transactions/:id` | Tampilkan detail lengkap transaksi |

**Catatan:** Semua request melewati `src/api/axios.js`, otomatis memasang header `Authorization: Bearer <token>` dan memaksa logout saat menerima respons 401.

## 🔐 Alur Autentikasi Frontend
1. User login melalui `/login` → kirim email & password ke `/auth/login`.
2. Token + data user disimpan di `localStorage` (`token`, `user`).
3. Navigation guard (`router/index.js`) mengecek token & role tiap perpindahan rute.
4. Jika akses rute admin oleh member atau tanpa token, pengguna diarahkan ke halaman yang sesuai (`/dashboard` atau `/login`).
5. Saat backend merespons 401 (token invalid/expired), interceptor melakukan cleanup storage dan redirect ke `/login`.

## 🧪 Checklist Manual Testing (Frontend)
- Login sukses/gagal (validasi pesan error)
- Proteksi halaman (akses `/dashboard` tanpa token → redirect ke `/login`)
- CRUD budgets/categories/transactions (termasuk modal close/cancel)
- Filter transaksi berdasarkan tipe & tanggal
- Role-based UI (member tidak melihat tombol edit/delete transactions)
- Penampilan meta JSON di detail transaksi

## 📸 Dokumentasi & Demo
Gunakan folder `screenshots/` di root repo untuk menyimpan bukti tampilan UI maupun hasil uji Postman sesuai kebutuhan laporan/penilaian.

---
Butuh bantuan tambahan? Silakan cek README utama di root repo atau hubungi maintainer. Selamat ngoding! 🎉
