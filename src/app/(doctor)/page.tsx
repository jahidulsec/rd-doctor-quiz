import HomeContainer from "@/features/home/components/home-container";
import { verifyAutuser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function Home() {
  const authUser = await verifyAutuser();

  if (!authUser) return redirect("/login");

  if (authUser.role === "admin") return redirect("/dashboard");

  return <HomeContainer />
}
