import { PortfolioData } from './types';
import yogisAvatar from './assets/images/profile-removebg-preview.png';
import fitkanApp from './assets/images/projects_fitkan.png';
import grahaMuktiIndah from './assets/images/projects_gmi.png';
import sidasiApp from './assets/images/projects_sidasi.png';

export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Yogis Maulana",
    title: "Mahasiswa Sistem Informasi, UI/UX & Web Developer",
    subTitle: "Menggabungkan keahlian desain interaktif dan logika web fungsional untuk menghasilkan solusi bisnis digital yang bernilai kompetitif.",
    avatarUrl: yogisAvatar,
    bio: "Saya adalah seorang mahasiswa jurusan Sistem Informasi dengan minat yang besar pada pembuatan desain UI/UX yang intuitif serta pengembangan web yang responsif. Saya suka menyelaraskan keindahan desain dengan keandalan kode untuk menghadirkan pengalaman digital terbaik yang mendukung pertumbuhan bisnis.",
    tagline: "Desain yang memikat, Kode yang andal, Bisnis yang terarah.",
    stats: [
      { label: "Jurusan Kuliah", value: "Sistem Informasi" },
      { label: "Spesialisasi", value: "UI/UX & Web" },
      { label: "Keahlian Analis", value: "Ms Excel & Data" },
      { label: "Fokus Solusi", value: "Bisnis Digital" }
    ],
    status: "open",
    resumeUrl: "#"
  },
  socials: {
    github: "#",
    linkedin: "#",
    email: "yogisartuje@gmail.com",
    instagram: "#",
    twitter: "#"
  },
  skillCategories: [
    {
      name: "Web Development & UI/UX",
      skills: [
        { name: "UI/UX Design", level: 92, iconName: "Sparkles" },
        { name: "HTML", level: 95, iconName: "Code" },
        { name: "CSS", level: 90, iconName: "Palette" },
        { name: "React", level: 85, iconName: "Cpu" },
        { name: "JavaScript", level: 88, iconName: "Zap" }
      ]
    },
    {
      name: "Microsoft Excel",
      skills: [
        { name: "VLOOKUP", level: 96, iconName: "Layers" },
        { name: "Pivot Table", level: 94, iconName: "Database" }
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "UI/UX Aplikasi Kebugaran Fitkan",
      description: "Desain prototipe aplikasi mobile fitness tracker interaktif. Dirancang dengan penuh ketelitian mulai dari alur pengguna (user flow), splash screen modern, visualisasi target berat badan ideal, hingga tata letak layar personal harian.",
      category: "design",
      tags: ["UI/UX Design", "Figma", "Fitness Tracker", "Mobile Prototype"],
      imageUrl: fitkanApp,
      imageAlt: "Preview UI/UX Aplikasi Kebugaran Fitkan",
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      highlights: [
        "Mendesain rancangan UI/UX berpusat pada kepraktisan aktivitas olahraga pengguna sehari-hari",
        "Menyertakan bagan representasi grafis berat badan ideal yang mudah dimengerti",
        "Splash screen dan skema warna biru dongker yang elegan dan memotivasi energi olahraga"
      ]
    },
    {
      id: "proj-2",
      title: "Website Informasi \"Graha Mukti Indah\"",
      description: "Website portal informasi modern yang melayani profil, layanan administrasi warga, promosi properti komersial, dan rincian fasilitas di lingkungan hunian Graha Mukti Indah.",
      category: "frontend",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Web"],
      imageUrl: grahaMuktiIndah,
      imageAlt: "Preview Website Graha Mukti Indah",
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      highlights: [
        "Desain antarmuka perumahan modern dengan navigasi kontak dan menu promo terintegrasi",
        "Layout responsif yang rapi dan cepat diakses di perangkat seluler maupun komputer",
        "Galeri portofolio tipe unit rumah yang interaktif dengan skema warna yang senada"
      ]
    },
    {
      id: "proj-3",
      title: "Sidasi - Sistem Data dan Informasi",
      description: "Aplikasi web fungsional yang menggabungkan toko e-commerce produk ritel untuk pembeli dan dashboard admin komprehensif bagi pemilik toko dalam memantau stok barang, melacak pesanan, s.d. pencatatan pelanggan.",
      category: "fullstack",
      tags: ["React", "JavaScript", "Database", "E-commerce", "Admin Dashboard"],
      imageUrl: sidasiApp,
      imageAlt: "Preview Sidasi E-commerce Admin",
      githubUrl: "#",
      liveUrl: "#",
      featured: true,
      highlights: [
        "Fitur belanja interaktif untuk pembeli dan modul manajemen stok produk terpusat",
        "Dasbor admin cerdas dengan visualisasi total laba bersih pendapatan, pesanan baru, dan jumlah pelanggan",
        "Toleransi data yang andal untuk kelancaran administrasi UMKM Asri Raya secara simultan"
      ]
    }
  ],
  timeline: [
    {
      id: "time-1",
      role: "Mahasiswa Sistem Informasi",
      company: "Jurusan Sistem Informasi / Fakultas Ilmu Komputer",
      period: "2023 - Sekarang",
      description: "Mempelajari analisis proses bisnis, struktur data, kebutuhan perangkat lunak, sistem manajemen database, serta implementasi solusi digital bagi keunggulan kompetitif bisnis korporat.",
      achievements: [
        "Mendalami integrasi desain UI/UX dengan fungsionalitas logika web developer",
        "Menerapkan keahlian pemecahan masalah bisnis terstruktur berasaskan data Excel tepercaya"
      ],
      type: "education"
    },
    {
      id: "time-2",
      role: "Eksplorasi Mandiri UI/UX & Web Development",
      company: "Portofolio Independen",
      period: "2024 - Sekarang",
      description: "Mengembangkan prototipe interaktif (Figma), menyusun halaman web fungsional (HTML, CSS, JS, React), dan mendalami formula analitis Microsoft Excel.",
      achievements: [
        "Menciptakan desain aplikasi kebugaran Fitkan dan portal Graha Mukti Indah",
        "Mengembangkan platform admin dashboard komprehensif 'Sidasi' berbasis e-commerce"
      ],
      type: "work"
    }
  ]
};
