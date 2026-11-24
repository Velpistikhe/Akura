# Project Charter — Akura

| Metadata | Value |
|---|---|
| Project | Akura — Full-Stack Web Application |
| Document | Project Charter |
| Version | 0.8 |
| Status | Approved — disetujui pengguna melalui chat pada 22 November 2026 |
| Tanggal | 22 November 2026 |
| Lokasi proyek | `C:\Users\Ve\Desktop\Akura` |

## 1. Ringkasan Eksekutif

Akura adalah aplikasi untuk membantu mengadministrasikan data internal perusahaan, kontrak pelanggan, service, item, serta harga item. Aplikasi juga ditujukan untuk memudahkan pembuatan dan pengelolaan quotation, work order/Surat Perintah Kerja (SPK), dan invoice.

Saat ini administrasi dan pembuatan dokumen masih dilakukan secara manual menggunakan Excel dan Word. Proyek Akura diharapkan menyediakan dukungan aplikasi terpusat untuk proses-proses tersebut. Proyek yang ada saat ini masih dalam tahap pengembangan; pembuatan quotation dan work order berdasarkan quotation telah tersedia menurut informasi pemilik proyek.

## 2. Latar Belakang dan Masalah Bisnis

Administrasi perusahaan, kontrak, service, item, harga item, quotation, work order, dan invoice masih dilakukan secara manual dengan Excel dan Word. Belum ada aplikasi yang mendukung keseluruhan proses tersebut.

Dampak bisnis spesifik, seperti tingkat kesalahan, waktu proses, atau biaya administrasi, belum diukur dan perlu dikonfirmasi sebelum dijadikan target proyek.

## 3. Tujuan Proyek

Tujuan awal yang disepakati:

1. Menyediakan sarana aplikasi untuk mengadministrasikan data perusahaan internal, kontrak pelanggan, service, item, dan harga item.
2. Memudahkan pembuatan dan pengelolaan quotation, work order/SPK, serta invoice.
3. Mendukung pelaksanaan work order oleh Field Service, termasuk daily report, berita acara, dan summary penyelesaian.
4. Mendukung pemantauan pembayaran invoice dan penyimpanan bukti pembayaran.

Ukuran keberhasilan awal yang disepakati adalah seluruh modul aplikasi berhasil melalui pengujian, dengan tahap final berupa UAT. UAT untuk modul autentikasi dan app manager dilakukan oleh pemilik proyek; UAT untuk seluruh modul lain dilakukan oleh pengguna Akura. Persetujuan akhir UAT diberikan oleh pimpinan Akura. Kriteria kelulusan akan ditetapkan dalam dokumentasi Testing. Target maksimal agar seluruh aplikasi tersedia dan siap digunakan adalah **30 Juni 2027**.

## 4. Pengguna dan Pemangku Kepentingan

| Kelompok pengguna | Tanggung jawab yang diinformasikan |
|---|---|
| Marketing | Administrasi kontrak dan harga; pembuatan quotation dan work order |
| Field Service | Pelaksanaan work order; unggah daily report; penyusunan berita acara dan summary penyelesaian; pembaruan/penutupan status work order |
| Finance | Pembuatan invoice; pemantauan pembayaran; penyimpanan bukti bayar |
| Admin pada masing-masing section | Memberikan persetujuan untuk proses/dokumen pada section masing-masing |

Peran lain, termasuk administrator sistem lintas section, belum dikonfirmasi. Rincian peran dan izin akan dibahas per fitur/modul serta endpoint; belum menjadi keputusan rinci pada Charter ini.

## 5. Cakupan Tingkat Tinggi

### Termasuk dalam arah proyek

- Administrasi data perusahaan internal.
- Administrasi kontrak yang terkait dengan pelanggan.
- Katalog service dan item bersama.
- Pengelolaan harga dengan dua jenis: harga untuk seluruh pelanggan dan harga yang ditetapkan dalam kontrak.
- Pembuatan dan pengelolaan quotation, work order/SPK, dan invoice.
- Dukungan proses work order oleh Field Service: daily report diunggah dengan tanggal dan mengubah status tanggal terkait dari belum diunggah menjadi sudah diunggah; laporan tidak wajib untuk setiap hari kalender, tetapi minimal satu daily report diperlukan. Berita acara dan summary masing-masing mengubah status unggahan pada work order dari belum menjadi sudah diunggah. Setelah minimal satu daily report, berita acara, dan summary telah diunggah, status work order berubah dari **on progress** menjadi **job done** dan dapat dikirimkan ke Marketing. File yang sudah diunggah dapat diganti selama work order belum dikirim. Template/desain file tidak ditentukan aplikasi saat ini.
- Pemantauan pembayaran serta penyimpanan bukti pembayaran invoice.
- Pajak ditambahkan ke jumlah harga berdasarkan persentase yang tersimpan di database, tanpa pembulatan pada hasil perhitungan. Hanya role **app manager** yang berwenang mengubah persentase dengan memperbarui data database tanpa perubahan kode. Perubahan tarif berlaku untuk dokumen baru; dokumen lama menyimpan snapshot persentase saat dibuat. Tidak ada integrasi dengan sistem perpajakan saat ini.
- Persetujuan oleh admin pada masing-masing section.
- Migrasi data dari Excel terbatas pada service, item, dan harga global/umum.

Cakupan ini masih berupa batas arah proyek, bukan spesifikasi rinci. Project Scope akan disusun sebagai dokumen berikutnya hanya setelah Charter ini disetujui.

### Belum ditetapkan atau belum termasuk berdasarkan keputusan saat ini

- Migrasi data kontrak, pelanggan, dan harga khusus kontrak belum ditetapkan sebagai bagian migrasi; keputusan migrasi saat ini hanya mencakup service, item, dan harga global/umum dari Excel.
- Belum ada integrasi dengan sistem lain yang ditetapkan saat ini. Integrasi perpajakan secara khusus tidak tersedia.
- Pembayaran online, penerbitan e-invoice, dan kebutuhan tanda tangan elektronik belum diputuskan.
- Detail kebijakan pajak, mata uang, penomoran dokumen, dan retensi dokumen masih perlu dirinci.
- Anggaran, jadwal milestone, serta kriteria penerimaan UAT masih perlu ditetapkan.

## 6. Alur Bisnis dan Syarat Sumber Dokumen

Urutan alur yang disebutkan sebelumnya adalah:

1. Quotation → Work Order → Invoice
2. Quotation → Invoice → Work Order
3. Work Order → Quotation → Invoice

Aturan status sumber yang telah diperjelas oleh pemilik proyek:

| Dokumen sumber | Status yang memenuhi syarat | Dokumen yang dapat dibuat berdasarkan sumber tersebut |
|---|---|---|
| Quotation | Approved | Work Order dan invoice |
| Work Order | Completed | Quotation dan invoice |
| Invoice | Paid | Quotation dan work order |

Syarat ini berlaku untuk semua jenis dokumen sesuai pemetaan di atas. Dengan klarifikasi terbaru, quotation berstatus approved dapat menjadi dasar work order dan invoice; hal ini menyelaraskan aturan bisnis dengan alur quotation → work order yang telah disebutkan sebelumnya dan fungsi yang tersedia saat ini.

## 7. Kapabilitas dan Kondisi Proyek Saat Ini

- Proyek telah memiliki bagian frontend dan backend.
- Seluruh proyek yang ada masih dalam tahap pengembangan.
- Pembuatan quotation dan work order berdasarkan quotation sudah tersedia menurut pemilik proyek.
- Status kesiapan, kelengkapan, dan batas fungsi yang sudah tersedia belum diverifikasi melalui pemeriksaan proyek; informasi di bagian ini bersumber dari pemilik proyek.

## 8. Asumsi, Batasan, dan Ketergantungan

### Asumsi kerja dan keputusan yang menjadi dasar

- Nama proyek adalah Akura.
- Katalog service dan item digunakan bersama.
- Harga dapat menggunakan harga umum untuk seluruh pelanggan atau harga khusus yang tercantum dalam kontrak.
- Persentase pajak pada quotation dan invoice disimpan di database; hanya role app manager yang dapat mengubahnya. Nilai pajak dihitung dari jumlah harga tanpa pembulatan lalu ditambahkan ke total akhir. Perubahan tarif berlaku untuk dokumen baru; dokumen lama menyimpan snapshot tarif saat dibuat. Aplikasi tidak terintegrasi dengan sistem perpajakan saat ini.
- Data migrasi dari Excel saat ini dibatasi pada service, item, dan harga global/umum.
- Target maksimal seluruh aplikasi tersedia dan siap digunakan adalah 30 Juni 2027.

### Batasan

- Belum ada integrasi dengan sistem lain yang ditetapkan saat ini.
- Detail anggaran, jadwal milestone, serta kebijakan retensi dokumen belum dikonfirmasi.

### Ketergantungan

- Definisi kebijakan bisnis dari Marketing, Field Service, dan Finance.
- Keputusan pemilik proyek mengenai pemetaan status dan transisi dokumen, kriteria UAT, serta hak akses per fitur/modul.
- Kesiapan data service, item, dan harga global/umum untuk migrasi.

## 9. Risiko Awal

| Risiko | Dampak potensial | Tindakan awal |
|---|---|---|
| Alur sumber dokumen memiliki beberapa cabang dan prasyarat status | Pengguna dapat memilih sumber atau status yang tidak memenuhi aturan bisnis | Tegaskan validasi status dan hubungan antar dokumen dalam requirements serta pengujian |
| Cakupan migrasi terbatas pada service, item, dan harga global/umum | Data kontrak dan harga khusus mungkin perlu dikelola di luar migrasi awal | Validasi keputusan cakupan dan kualitas sumber data Excel |
| Kriteria lulus, modul yang diuji, dan bukti UAT belum dirinci meskipun pembagian penanggung jawab UAT dan target kesiapan sudah ditetapkan | Penerimaan aplikasi dapat ditafsirkan berbeda dan mengancam kesiapan pada 30 Juni 2027 | Tetapkan matriks pengujian dan kriteria UAT bersama pemilik proyek dan pengguna Akura |

## 10. Keputusan yang Tercatat

| ID | Keputusan | Alasan yang tercatat | Status |
|---|---|---|---|
| D-01 | Data perusahaan yang dimaksud adalah data internal Akura; kontrak dibuat dengan pelanggan. | Klarifikasi pemilik proyek. | Dikonfirmasi |
| D-02 | Service dan item memakai katalog bersama. | Klarifikasi pemilik proyek. | Dikonfirmasi |
| D-03 | Harga memiliki dua jenis: harga umum untuk seluruh pelanggan dan harga dalam kontrak. | Kedua jenis harga dinyatakan sebagai kebutuhan bisnis; alasan bisnis rinci belum dijelaskan. | Dikonfirmasi |
| D-04 | Dokumen sumber dapat digunakan sesuai pemetaan status di Bagian 6: quotation approved → work order/invoice; work order completed → quotation/invoice; invoice paid → quotation/work order. | Aturan status sumber diperjelas oleh pemilik proyek. | Dikonfirmasi |
| D-05 | Daily report diunggah dengan tanggal dan mengubah status tanggal terkait dari belum diunggah menjadi sudah diunggah; daily report tidak wajib setiap hari kalender dan minimal satu diperlukan. Berita acara dan summary masing-masing mengubah status unggahan pada work order dari belum menjadi sudah diunggah. Setelah minimal satu daily report, berita acara, dan summary diunggah, work order berubah dari on progress menjadi job done dan dapat dikirim ke Marketing. File dapat diganti selama work order belum dikirim. | Aturan alur unggahan dijelaskan oleh pemilik proyek. | Dikonfirmasi |
| D-06 | Admin pada masing-masing section dapat memberikan persetujuan. | Klarifikasi pemilik proyek. | Dikonfirmasi; hak akses per fitur/modul akan dibahas kemudian |
| D-07 | Pajak ditambahkan ke jumlah harga berdasarkan persentase yang tersimpan di database, tanpa pembulatan pada hasil perhitungan. Hanya role app manager yang dapat mengubah persentase dengan memperbarui data database tanpa perubahan kode; perubahan berlaku untuk dokumen baru, sedangkan dokumen lama menyimpan snapshot persentase saat dibuat. Tidak ada integrasi sistem perpajakan. | Aturan pengelolaan pajak ditetapkan oleh pemilik proyek. | Dikonfirmasi |
| D-08 | Finance menggunakan invoice untuk membuat dokumen, memantau pembayaran, dan menyimpan bukti bayar. | Klarifikasi pemilik proyek. | Dikonfirmasi |
| D-09 | Migrasi dari Excel hanya mencakup data service, item, dan harga global/umum. | Batas migrasi ditetapkan oleh pemilik proyek. | Dikonfirmasi |
| D-10 | Belum ada integrasi dengan sistem lain yang ditetapkan saat ini. | Klarifikasi pemilik proyek. | Dikonfirmasi untuk arah saat ini |
| D-11 | Target maksimal agar seluruh aplikasi tersedia dan siap digunakan adalah 30 Juni 2027. UAT autentikasi dan app manager dilakukan pemilik proyek; UAT modul lain dilakukan pengguna Akura; persetujuan akhir diberikan pimpinan Akura. Kriteria kelulusan akan ditetapkan dalam dokumentasi Testing. | Target, penanggung jawab UAT, dan approver akhir ditetapkan oleh pemilik proyek. | Dikonfirmasi; kriteria UAT didefer ke dokumen Testing |
| D-12 | Rincian peran dan izin akan dibahas berdasarkan masing-masing fitur/modul dan endpoint. | Pemilik proyek menyatakan hak akses memerlukan pembahasan lebih detail per fitur/endpoint. | Dikonfirmasi sebagai pendekatan; rincian belum dibuat |

## 11. Hal yang Masih Terbuka

- Kriteria lulus UAT, skenario pengujian, dan bukti penerimaan akan dirinci dalam dokumentasi Testing; persetujuan akhir diberikan pimpinan Akura.
- Rincian peran dan izin per fitur/modul/endpoint.
- Anggaran, jadwal milestone antara, kebijakan retensi dokumen, mata uang, penomoran dokumen, dan format dokumen.
- Integrasi tambahan, jika muncul kebutuhan baru; saat ini belum ada integrasi yang ditetapkan.

## 12. Persetujuan

Dokumen ini disetujui oleh pengguna melalui chat pada 22 November 2026.

| Pihak | Nama | Keputusan | Tanggal |
|---|---|---|---|
| Pemberi persetujuan | Tidak dicantumkan | Disetujui melalui chat | 22 November 2026 |

**Langkah berikutnya:** Project Charter telah disetujui; Project Scope dapat disusun sebagai dokumen berikutnya.
