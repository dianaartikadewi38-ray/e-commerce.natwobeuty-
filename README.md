# 🌸 Business Overview — NATWO BEAUTY E-Commerce

## 1. Identitas Brand & Value Proposition
* **Nama Bisnis:** NATWO BEAUTY
* **Slogan:** *"Temukan Makeup Impianmu dengan Sentuhan Pink Elegant"*
* **Value Proposition (Nilai Jual Utama):** Natwo Beauty menghadirkan jajaran kosmetik berkualitas tinggi dengan kemasan premium estetis berwarna pastel/soft pink yang dirancang khusus untuk memenuhi gaya hidup elegan dan feminin perempuan muda. Produk kami dijamin aman digunakan sehari-hari, *cruelty-free*, tersertifikasi, namun tetap dipasarkan dengan harga yang terjangkau agar inklusif untuk semua kalangan pelajar hingga pekerja muda.

## 2. Target Market & Segmentasi Pelanggan
* **Demografis:** Perempuan, rentang usia 15 – 30 tahun (Remaja, Mahasiswi, dan *First Jobber*).
* **Psikografis:** Menyukai kosmetik dengan visual yang estetik (*Instagrammable*), mengikuti tren *Korean/Japanese/Natural clean look*, dan aktif di media sosial (TikTok & Instagram).
* **Geografis:** Berfokus di area urban dan sub-urban seluruh Indonesia yang terjangkau oleh jaringan logistik ekspedisi digital.

## 3. Analisis Pasar & Kompetitor
* **Potensi Pasar:** Industri kecantikan lokal saat ini mengalami pertumbuhan yang masif karena pergeseran loyalitas konsumen dari produk luar negeri ke produk lokal yang adaptif terhadap warna kulit tropis.
* **Kompetitor Utama:** Somethinc, Rose All Day, BLP Beauty, dan Rare Beauty (pasar global).
* **Keunggulan Natwo:** Fokus konsisten pada identitas visual yang ultra-feminin (*girly aesthetic*), harga yang berada di bawah rata-rata kompetitor sekelas, dan kemudahan transaksi pelanggan lewat integrasi katalog terpusat.

## 4. Strategi Harga & Promosi (Marketing Strategy)
* **Strategi Harga:** Penetrasi pasar dengan rentang harga Rp 69.000 s.d Rp 240.000.
* **Promosi & Diskon:** * Sistem kupon interaktif pada website (Contoh kode promo: `NATWO10` untuk klaim potongan langsung 10%).
    * *Cross-channel marketing* mengarahkan trafik dari Instagram & TikTok Ads menuju website resmi atau toko resmi Shopee.

## 5. Alur Transaksi & Simulasi Payment Gateway
Sistem web checkout dikonfigurasikan siap integrasi dengan **Midtrans / Xendit API Sandbox**.
1. Pelanggan memilih produk -> masuk ke *localStorage-backed cart*.
2. Memasukkan kupon jika ada -> sistem mengalkulasi harga total otomatis.
3. Form Checkout melampirkan isian data pengiriman & metode pembayaran pilihan (QRIS/Transfer Bank Virtual Account).
4. Ketika tombol "Bayar" diklik, sistem menyimulasikan pemotongan stok otomatis secara *real-time* di sisi database internal agar tidak terjadi *overselling*.

## 6. Integrasi Analytics & Metrik Utama (KPI)
Melalui skrip dummy Google Analytics yang tertanam, tim manajemen Natwo Beauty memantau matriks penting berikut demi performa keputusan bisnis:
* **Conversion Rate (Tingkat Konversi):** Persentase pengunjung yang berujung melakukan transaksi pembelian dibanding jumlah pengunjung total.
* **Bounce Rate (Rasio Pantulan):** Memastikan persentase user keluar instan di bawah 40%, menandakan UI/UX halaman beranda sudah cukup menarik bagi target audiens perempuan muda.
* **Average Order Value (AOV):** Rata-rata nilai struk per belanja untuk mengukur keberhasilan program bundling produk.