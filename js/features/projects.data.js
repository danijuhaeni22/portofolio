export const PROJECTS = {
  tirc: {
    title: "Daily Transaction Charts Monitoring",
    subtitle: "Operational realtime monitoring (4-hour sliding window).",
    role: "Full-stack Engineer (Internal Monitoring System)",
    problem:
      "Tim operasional membutuhkan visibilitas near real-time terhadap transaksi yang baru terjadi untuk mendeteksi anomali, lonjakan RC tertentu, atau indikasi gangguan sistem sebelum berdampak lebih luas.",
    solution:
      "Saya merancang pipeline ingest log yang memfilter dan mengagregasi data transaksi menggunakan 4-hour sliding window, lalu menyajikannya dalam dashboard realtime dengan auto-refresh untuk mendukung respons operasional cepat.",
    impact: [
      { num: "4-Hour Window", label: "Sliding monitoring scope" },
      { num: "Auto Refresh", label: "Near real-time update" },
      { num: "Faster Response", label: "Early anomaly detection" },
    ],
    features: [
      "Log parsing per bank dengan normalisasi struktur transaksi",
      "4-hour sliding window aggregation (rolling timeframe)",
      "Auto-refresh dashboard tanpa full page reload",
      "RC breakdown untuk identifikasi cepat pola error",
      "Optimized query & incremental update untuk performa stabil",
    ],
    stack: [
      "Node.js",
      "Express",
      "Chart.js",
      "Log ingestion",
      "Incremental aggregation",
    ],
    demo: "#",
    repo: "https://github.com/danijuhaeni22/web-dashboard-iso-8583",
    shots: [
      "./assets/img/projects/tirc-1.jpg",
      "./assets/img/projects/tirc-2.jpg",
      "./assets/img/projects/tirc-3.jpg",
    ],
    arch: "./assets/img/projects/tirc-arch.png",
    archCaption:
      "Architecture: raw logs → parser → rolling filter → aggregation → REST API → realtime dashboard.",
  },

  compare: {
    title: "Compare Dashboard",
    subtitle:
      "Analytical dashboard untuk membaca gap performa transaksi harian & mingguan (trend baseline).",

    role: "Full-stack Engineer (Analytics Dashboard)",

    problem:
      "Tim membutuhkan cara cepat untuk memahami apakah performa transaksi hari ini berada di atas atau di bawah tren normal. Membaca log manual itu lambat, dan refresh dengan full data fetch berpotensi boros serta menurunkan respons UI.",

    solution:
      "Saya membangun dashboard analitik yang menghitung baseline (rata-rata 7 hari) sebagai referensi tren, lalu membandingkan performa hari ini terhadap kemarin dan baseline mingguan. Untuk menjaga performa, saya menerapkan pengambilan data yang lebih efisien (incremental/rolling) sehingga update tetap cepat tanpa memuat ulang seluruh dataset.",

    impact: [
      { num: "7-Day Baseline", label: "Trend reference" },
      { num: "Clear Gap View", label: "Visual comparison" },
      { num: "Efficient Updates", label: "Faster refresh" },
    ],

    features: [
      "Perbandingan today vs yesterday",
      "Overlay baseline rata-rata 7 hari untuk membaca gap",
      "Ringkasan RC dominan + perubahan signifikan",
      "Date picker untuk analisa historical",
      "Optimized data fetch (incremental/rolling) untuk menjaga respon cepat",
    ],

    stack: ["Node.js", "Charts", "Aggregation", "RC Analytics"],

    demo: "#",
    repo: "https://github.com/danijuhaeni22/compare",

    shots: [
      "./assets/img/projects/compare-1.jpg",
      "./assets/img/projects/compare-2.jpg",
      "./assets/img/projects/compare-3.jpg",
    ],

    arch: "./assets/img/projects/compare-arch.png",
    archCaption:
      "Architecture: transaction data → processing → baseline calculation → comparison logic → dashboard visualization (optimized incremental fetch).",
  },

  priority: {
    title: "Dashboard Penilaian Prioritas",
    subtitle:
      "Skoring otomatis untuk menentukan prioritas issue & tindak lanjut.",
    role: "Developer (Ops Enablement)",
    problem:
      "Issue operasional sering menumpuk dan prioritasnya bias. Dibutuhkan sistem penilaian yang konsisten berdasarkan dampak, frekuensi, dan urgensi.",
    solution:
      "Saya membangun dashboard scoring dengan aturan yang transparan, kategori prioritas, serta tampilan ringkas untuk membantu tim menentukan fokus penanganan.",
    impact: [
      { num: "Objective Score", label: "Prioritas lebih konsisten" },
      { num: "Clear Queue", label: "Antrian lebih terstruktur" },
      { num: "Reporting", label: "Lebih mudah evaluasi" },
    ],
    features: [
      "Aturan scoring (impact × frequency × urgency)",
      "Kategori prioritas (P1/P2/P3) + SLA hint",
      "Queue issue + filter/sort (bank/RC/level)",
      "Ringkasan harian untuk standup/brief",
      "Export ringkas (opsional untuk next iteration)",
    ],
    stack: ["Dashboard", "Scoring", "Workflow", "Reporting"],
    demo: "#",
    repo: "https://github.com/",
    shots: [
      "./assets/img/projects/priority-1.jpg",
      "./assets/img/projects/priority-2.jpg",
      "./assets/img/projects/priority-3.jpg",
    ],
    arch: "./assets/img/projects/priority-arch.jpg",
    archCaption:
      "Flow: issue signals → scoring rules → priority bucket → queue UI → reporting/export.",
  },

  pos: {
    title: "POS & Inventory",
    subtitle: "Sistem stok & transaksi dengan audit dan movement multi-lokasi.",
    role: "Frontend-heavy + Data modeling",
    problem:
      "Pencatatan stok manual rawan selisih dan sulit ditelusuri saat terjadi perbedaan antara stok fisik vs sistem.",
    solution:
      "Membangun POS & inventory dengan movement log, audit trail, dan alur purchase/sales yang konsisten.",
    impact: [
      { num: "Audit log", label: "Jejak perubahan" },
      { num: "Multi lokasi", label: "Kontrol stok" },
      { num: "Lebih rapi", label: "Flow transaksi" },
    ],
    features: [
      "CRUD item + kategori",
      "Movement (in/out/adjust) + audit trail",
      "Sales/purchase flow terstruktur",
      "Ringkasan stok & histori per item",
    ],
    stack: ["Next.js", "MongoDB", "Mongoose", "UI Components"],
    demo: "#",
    repo: "https://github.com/",
    shots: [
      "./assets/img/projects/pos-1.jpg",
      "./assets/img/projects/pos-2.jpg",
      "./assets/img/projects/pos-3.jpg",
    ],
    arch: "./assets/img/projects/pos-arch.jpg",
    archCaption: "Flow: POS order → stock movement → audit log → reporting.",
  },

  expense: {
    title: "Expense Tracker",
    subtitle: "Pencatatan pengeluaran dengan ringkasan mingguan/bulanan.",
    role: "Personal project",
    problem:
      "Butuh cara cepat mencatat pengeluaran tanpa ribet agar kebiasaan tracking bisa konsisten.",
    solution:
      "Buat dashboard sederhana dengan input rupiah, visual ringkasan, dan penyimpanan lokal.",
    impact: [
      { num: "Lebih konsisten", label: "Tracking harian" },
      { num: "Ringkas", label: "Dashboard cepat" },
      { num: "Local", label: "Tanpa login" },
    ],
    features: [
      "Input transaksi cepat",
      "Ringkasan mingguan/bulanan",
      "Chart visual untuk kategori",
      "Export sederhana (opsional dikembangkan)",
    ],
    stack: ["Vanilla JS", "Charts", "LocalStorage"],
    demo: "#",
    repo: "https://github.com/danijuhaeni22/catatan-pengeluaran",
    shots: [
      "./assets/img/projects/expense-1.jpg",
      "./assets/img/projects/expense-2.jpg",
      "./assets/img/projects/expense-3.jpg",
    ],
    arch: "./assets/img/projects/expense-arch.jpg",
    archCaption: "Flow: input → local storage → compute summary → charts.",
  },
};
