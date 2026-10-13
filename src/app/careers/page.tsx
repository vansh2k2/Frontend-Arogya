import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import ServerSeoSchema from "@/components/ServerSeoSchema";
import { buildPageMetadata } from "@/lib/fetchCmsSeo";
import CareersClientContent from "./CareersClientContent";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/careers", {
    title: "Careers | Join Arogya Sangoshthi Team",
    description:
      "Explore career opportunities at Arogya Sangoshthi and join our dynamic team driving the healthcare and wellness movement.",
  });
}

export default async function CareerPage() {
  return (
    <Layout>
      <ServerSeoSchema pagePath="/careers" />
      <CareersClientContent />
    </Layout>
  );
}
