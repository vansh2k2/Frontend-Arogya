import React from "react";
import Layout from "@/components/layout/Layout";
import RegisterNowHero from "@/components/register-now/RegisterNowHero";
import RegisterNowContent from "@/components/register-now/RegisterNowContent";

export const metadata = {
  title: "Register Now | IHWE 2026",
};

export default function RegisterNow() {
  return (
    <Layout>
      <div className="bg-[#fcfdfa] min-h-screen">
        <RegisterNowHero />
        <RegisterNowContent />
      </div>
    </Layout>
  );
}
