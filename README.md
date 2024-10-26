# Campkit

# Deskripsi Proyek
Campkit adalah aplikasi berbasis web yang bertujuan untuk peminjaman dan pwnyewaan alat camping sesuai kebutuhan pelanggan. Pada aplikasi ini pelanggan dapat melihat alat yang tersedia, meminjamnya, dan melacak riwayat peminjaman. Admin dapat mengelola alat camping, memproses pemesanan, dan mengatur kategori barang. Aplikasi ini mempermudah dan mempercepat proses peminjaman alat camping.

# Fitur
Admin
1. Login
2. Mengelola Produk
3. Mengonfirmasi Pengembalian Barang
4. Mengatur Kategori Produk
5. Melihat Profil

User
1. Register Akun
2. Login Akun
3. Melihat Produk
4. Booking Produk
5. Melihat Riwayat Peminjaman
6. Mengedit Profil
7. Melihat Profile

# Setup Project
## Backend
$env:NODE_ENV="development"; npx sequelize-cli db:migrate
$env:NODE_ENV="development"; npx sequelize-cli db:seed:all

## Frontend
### User
npm install
npm install @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast @shadcn/ui @tanstack/react-query axios class-variance-authority clsx date-fns flowbite-react js-cookie lucide-react react react-dom react-icons react-router-dom tailwind-merge
npm install @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss vite --save-dev
npm install -D tailwindcss postcss autoprefixer

### Admin
npm install
npm install @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast @shadcn/ui @tanstack/react-query axios class-variance-authority clsx date-fns flowbite-react js-cookie lucide-react react react-dom react-icons react-router-dom tailwind-merge
npm install @eslint/js @types/react @types/react-dom @vitejs/plugin-react autoprefixer eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh globals postcss tailwindcss vite --save-dev
npm install -D tailwindcss postcss autoprefixer


# Skema Database
![bnsp](https://github.com/user-attachments/assets/515f9a1d-5575-420b-8059-57061ba515d8)

https://drive.google.com/drive/folders/11BMlZvDXiDjKQiP5TYVrGexqOBFM6cL3?usp=sharing

# Link Video Demo
https://drive.google.com/file/d/1-QXvKM3h4iBUdGINBSZHMMIWNV53n4Xw/view?usp=sharing
