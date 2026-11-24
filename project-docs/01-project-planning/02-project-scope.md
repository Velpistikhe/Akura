# Project Scope — Akura

| Metadata | Value |
|---|---|
| Project | Akura — Full-Stack Web Application |
| Document | Project Scope |
| Version | 0.1 |
| Status | Draft — menunggu review dan persetujuan |
| Baseline | Project Charter versi 0.8, disetujui 22 November 2026 |
| Target kesiapan aplikasi | Maksimal 30 Juni 2027 |
| Lokasi proyek | `C:\Users\Ve\Desktop\Akura` |

## 1. Tujuan Dokumen

Dokumen ini menetapkan batas pekerjaan tingkat tinggi untuk aplikasi Akura: kemampuan yang termasuk, batas yang tidak termasuk dalam baseline saat ini, dan hal yang masih menunggu keputusan. Dokumen ini diturunkan dari Project Charter yang telah disetujui.

Dokumen ini bukan spesifikasi rinci requirement, desain UI/UX, arsitektur, atau rencana implementasi. Detail tersebut akan disusun pada tahap dokumentasi berikutnya setelah Project Scope disetujui.

## 2. Pernyataan Cakupan

Akura akan menyediakan aplikasi untuk mengadministrasikan data internal perusahaan, kontrak pelanggan, service, item, dan harga; membuat serta mengelola quotation, work order/SPK, dan invoice; mendukung pelaksanaan serta penyelesaian work order oleh Field Service; dan memantau pembayaran serta bukti bayar invoice.

Aplikasi mencakup perhitungan pajak berbasis persentase yang tersimpan di database, dengan tarif historis tersimpan pada dokumen lama. Migrasi data dari Excel dibatasi pada service, item, dan harga global/umum. Tidak ada integrasi dengan sistem lain pada baseline saat ini.

## 3. Dalam Cakupan

### 3.1 Data dan katalog

- Administrasi data perusahaan internal Akura.
- Administrasi kontrak yang terkait dengan pelanggan.
- Katalog service dan item yang digunakan bersama.
- Pengelolaan harga umum untuk seluruh pelanggan dan harga khusus yang tercantum dalam kontrak.
- Migrasi data dari Excel untuk service, item, dan harga global/umum.

### 3.2 Dokumen dan alur bisnis

- Pembuatan dan pengelolaan quotation, work order/SPK, dan invoice.
- Work order yang dibuat berdasarkan quotation berstatus **approved**.
- Penggunaan dokumen sumber berdasarkan status berikut:

| Dokumen sumber | Status sumber yang disyaratkan | Dokumen yang dapat dibuat dari sumber |
|---|---|---|
| Quotation | `approved` | Work order dan invoice |
| Work order | `completed` | Quotation dan invoice |
| Invoice | `paid` | Quotation dan work order |

- Persetujuan dokumen oleh admin pada section masing-masing. Rincian izin per fitur/modul/endpoint belum termasuk spesifikasi scope ini dan akan dibahas pada tahap Requirements.

### 3.3 Pelaksanaan dan penyelesaian work order

- Unggah daily report dengan tanggal; daily report tidak wajib untuk setiap hari kalender, tetapi minimal satu daily report diperlukan untuk menyelesaikan work order.
- Unggah berita acara dan summary sebagai dokumen penyelesaian.
- Status unggahan daily report dicatat untuk tanggal terkait. Berita acara dan summary masing-masing memiliki status belum/sudah diunggah.
- Setelah minimal satu daily report, berita acara, dan summary diunggah, status work order berubah dari **on progress** menjadi **job done** dan work order dapat dikirim ke Marketing.
- File yang sudah diunggah dapat diganti selama work order belum dikirim.
- Template/desain daily report, berita acara, dan summary tidak disediakan/ditentukan oleh aplikasi dalam cakupan yang diketahui; prosesnya menggunakan unggah file.

### 3.4 Pajak dan invoice

- Perhitungan pajak pada quotation dan invoice menggunakan persentase yang tersimpan di database.
- Pajak ditambahkan ke jumlah harga untuk memperoleh total akhir; tidak ada pembulatan pada hasil perhitungan.
- Hanya role **app manager** yang berwenang mengubah persentase pajak dengan memperbarui data di database; perubahan tidak memerlukan perubahan kode aplikasi.
- Perubahan persentase berlaku untuk dokumen baru. Dokumen lama mempertahankan snapshot persentase pajak saat dibuat.
- Finance dapat membuat invoice, memantau pembayaran, dan menyimpan bukti bayar.

### 3.5 Pengguna dan penerimaan

- Pengguna operasional berasal dari Marketing, Field Service, dan Finance.
- Modul autentikasi dan app manager termasuk dalam rangkaian pengujian/UAT; fungsi rinci lain pada modul app manager selain kewenangan pajak belum ditetapkan dalam dokumen ini.
- Seluruh modul aplikasi harus diuji. UAT autentikasi dan app manager dilakukan pemilik proyek; UAT modul lain dilakukan pengguna Akura. Persetujuan akhir UAT diberikan pimpinan Akura.
- Target maksimal aplikasi tersedia dan siap digunakan adalah **30 Juni 2027**.

## 4. Tidak Termasuk dalam Baseline Saat Ini

- Integrasi dengan sistem eksternal atau sistem lain, termasuk integrasi dengan sistem perpajakan.
- Migrasi data dari Excel selain service, item, dan harga global/umum.

Pengecualian migrasi hanya berlaku pada kegiatan migrasi data; hal ini **tidak** mengecualikan administrasi pelanggan, kontrak, atau harga kontrak di dalam aplikasi.

## 5. Belum Diputuskan / Didefer

Hal berikut belum dapat dianggap masuk atau dikecualikan sampai ada keputusan:

- Pembayaran online, e-invoice, dan tanda tangan elektronik.
- Mata uang, penomoran dokumen, retensi dokumen, dan format quotation/invoice.
- Hak akses rinci per fitur/modul/endpoint.
- Anggaran dan milestone antara menuju target kesiapan 30 Juni 2027.
- Kriteria kelulusan, skenario, dan bukti UAT; akan ditetapkan dalam dokumentasi Testing.
- Detail perilaku pajak yang belum disebutkan, selain aturan persentase, snapshot historis, penambahan ke jumlah harga, dan tanpa pembulatan.
- Detail fungsi modul autentikasi dan app manager selain kewenangan perubahan persentase pajak yang telah disebutkan.

## 6. Asumsi dan Kendala

### Asumsi yang bersumber dari Project Charter

- Katalog service dan item dipakai bersama.
- Data perusahaan yang dimaksud adalah data internal Akura; kontrak dibuat dengan pelanggan.
- Status sumber dokumen dan alur pada Bagian 3.2 mengikuti keputusan pemilik proyek.
- Fitur quotation dan work order berdasarkan quotation telah tersedia dalam proyek yang masih dikembangkan; kondisi teknis aktual belum diverifikasi.

### Kendala yang diketahui

- Tidak ada integrasi sistem lain pada baseline saat ini.
- Batas kesiapan aplikasi adalah 30 Juni 2027.
- Migrasi data dibatasi pada tiga kelompok data yang disebutkan pada Bagian 3.1.
- Anggaran dan jadwal milestone antara belum ditetapkan.

## 7. Ketergantungan

- Kesiapan dan kualitas file Excel yang berisi service, item, dan harga global/umum.
- Keputusan rinci dari Marketing, Field Service, dan Finance pada tahap Requirements.
- Keterlibatan pemilik proyek, pengguna Akura, serta pimpinan Akura untuk kegiatan UAT dan persetujuan akhir.

## 8. Kriteria Batas Cakupan

Project Scope ini dianggap menggambarkan batas baseline apabila:

1. Fitur dan data yang tercantum pada Bagian 3 menjadi batas pekerjaan tingkat tinggi.
2. Batas migrasi dan ketiadaan integrasi eksternal pada Bagian 4 dipatuhi, kecuali diubah melalui keputusan terdokumentasi.
3. Hal pada Bagian 5 tidak diperlakukan sebagai kebutuhan yang telah disetujui sebelum ada keputusan.
4. Perubahan batas cakupan dicatat dan disetujui sebelum dimasukkan ke dokumen requirements atau rencana kerja.

Kriteria di atas menetapkan tata kelola batas scope; kriteria uji penerimaan produk akan ditentukan dalam dokumentasi Testing.

## 9. Keputusan dan Pertanyaan Terbuka

### Keputusan yang menjadi dasar scope

| ID | Keputusan | Sumber |
|---|---|---|
| S-01 | Migrasi Excel mencakup service, item, dan harga global/umum saja. | Project Charter D-09 |
| S-02 | Tidak ada integrasi dengan sistem lain dalam baseline saat ini. | Project Charter D-10 |
| S-03 | Pajak dihitung dari persentase database, ditambahkan ke jumlah harga tanpa pembulatan; hanya app manager dapat mengubah data persentase; dokumen lama menyimpan snapshot. | Project Charter D-07 dan klarifikasi pemilik proyek |
| S-04 | Work order menjadi job done setelah minimal satu daily report, berita acara, dan summary diunggah; file dapat diganti sebelum work order dikirim. | Klarifikasi pemilik proyek |
| S-05 | Target kesiapan aplikasi adalah 30 Juni 2027; persetujuan akhir UAT oleh pimpinan Akura. | Project Charter D-11 |

### Pertanyaan terbuka untuk tahap berikutnya

- Apa aturan validasi rinci pada sumber dokumen, termasuk keterkaitan data dan kondisi perubahan setelah dokumen turunan dibuat?
- Apa struktur dan field untuk data perusahaan, pelanggan, kontrak, service, item, harga, dan tiap dokumen?
- Apa matriks hak akses per fitur/modul/endpoint?
- Bagaimana format, penomoran, mata uang, penyimpanan, dan retensi dokumen ditetapkan?
- Apa kualitas, format kolom, dan aturan validasi untuk data Excel yang dimigrasikan?
- Apa kriteria dan skenario UAT? Detailnya akan dibuat pada dokumentasi Testing.
- Apakah pembayaran online, e-invoice, atau tanda tangan elektronik diperlukan pada rilis ini?

Pertanyaan terbuka bukan persetujuan untuk menambahkan fitur; jawaban dan perubahan scope harus dicatat sebelum dimasukkan ke baseline.

## 10. Persetujuan

Dokumen ini adalah **draft untuk review**. Project Scope belum disetujui.

| Pihak | Nama | Keputusan | Tanggal |
|---|---|---|---|
| Pemberi persetujuan | Belum dicantumkan | Menunggu review | — |

**Langkah berikutnya:** mohon tinjau dan setujui Project Scope ini, atau berikan revisi. Dokumentasi Requirements belum dibuat dan menunggu persetujuan scope.