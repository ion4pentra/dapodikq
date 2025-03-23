import React, { ReactNode } from "react";
import { Card } from "../ui/card";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  logoUrl?: string;
  backgroundImageUrl?: string;
}

const AuthLayout = ({
  children,
  title = "Aplikasi Pendataan Sekolah",
  subtitle = "Masuk untuk mengelola data sekolah Anda",
  logoUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=school",
  backgroundImageUrl = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80",
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side - Background image with overlay */}
      <div className="hidden md:block md:w-1/2 relative bg-blue-600">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img
              src={logoUrl}
              alt="School Logo"
              className="w-24 h-24 mx-auto mb-6"
            />
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-80 max-w-md mx-auto">
              Sistem manajemen data sekolah yang komprehensif untuk membantu
              pengelolaan data siswa, guru, staf, dan fasilitas dengan efisien.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-sm opacity-70">
              Terintegrasi dengan sistem pendidikan nasional
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">Dapodik</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">EMIS</span>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">PIP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Auth content */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-white">
        <Card className="w-full max-w-md p-8 shadow-lg border-0">
          <div className="md:hidden mb-8 text-center">
            <img
              src={logoUrl}
              alt="School Logo"
              className="w-16 h-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-left">
              {subtitle}
            </h2>
            <p className="mt-2 text-gray-600 md:text-left">
              Masukkan kredensial Anda untuk mengakses sistem
            </p>
          </div>

          {children}

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Aplikasi Pendataan Sekolah</p>
            <p className="mt-1">Versi 1.0.0</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
