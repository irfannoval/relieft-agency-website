RELIEFT AGENCY - WEBSITE COMPANY PROFILE

CARA MELIHAT
Buka index.html di browser (klik dua kali). Semua halaman ada di index.html
dan berpindah lewat link #beranda, #layanan, #portofolio, #drone, #tentang, #kontak.

STRUKTUR FOLDER
index.html          Isi semua halaman
css/style.css       Seluruh tampilan dan animasi
js/main.js          Perpindahan halaman, animasi scroll, filter portofolio, pemutar video
assets/img/         Poster video dan logo asli
assets/video/       Video portofolio (versi 480p, ~20 detik)

YANG PERLU DIGANTI
1. Nomor WhatsApp : js/main.js, cari  var NUM="6280000000000"
2. Email dan nomor di halaman Kontak : index.html, cari "halo@relieft.id" dan "0800-0000-0000"
3. Harga paket dan tarif drone : index.html (halaman Layanan dan Sewa Drone)
4. Portofolio : index.html, cari  class="tile"  lalu tambah data-v dan file video di assets/video
5. Testimoni dan cerita agensi : index.html (cari "Ganti dengan")
6. Font memakai Google Fonts, jadi butuh internet saat dibuka.

SAAT DI-UPLOAD KE HOSTING
Upload seluruh isi folder ini ke folder utama hosting (public_html). Pastikan
folder css, js, dan assets ikut terupload dengan struktur yang sama.
