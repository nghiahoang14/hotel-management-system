import { Header } from "@/src/components/admin/Header/Header";

import "../globals.css"
import { Sidebar } from "@/src/components/admin/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/src/context/AuthContext";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <html lang="en">
    <body className="!bg-[#121212] text-white">
      <AuthProvider>
      <div className="flex h-screen overflow-hidden">
         <Sidebar/>
        <div className="flex flex-col flex-1 overflow-auto">
          
          <div className="max-w-7xl mx-auto w-full">
           
            <Header/>
           
            <main>{children}</main>
          
          </div>
        </div>
        </div>      
<Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />
        </AuthProvider>
    </body>
  </html>
  );
}
