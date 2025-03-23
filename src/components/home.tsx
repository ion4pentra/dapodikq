import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import AuthLayout from "./layout/AuthLayout";
import LoginForm from "./auth/LoginForm";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Login - Aplikasi Pendataan Sekolah</title>
        <meta
          name="description"
          content="Login ke Aplikasi Pendataan Sekolah untuk mengelola data siswa, guru, staf, dan fasilitas sekolah"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-50"
      >
        <AuthLayout
          title="Aplikasi Pendataan Sekolah"
          subtitle="Selamat Datang Kembali"
          logoUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=school"
          backgroundImageUrl="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80"
        >
          <LoginForm />
        </AuthLayout>
      </motion.div>
    </>
  );
};

export default HomePage;
