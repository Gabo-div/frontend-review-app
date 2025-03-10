import UserProfile from "@/components/profile/UserProfile";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function Profile() {
  const [id, setId] = useState<number | null>(null);

  const router = useRouter();
  const params = useLocalSearchParams<{
    id: string;
  }>();

  useEffect(() => {
    const num = Number(params.id);

    if (isNaN(num)) {
      router.replace("/");
    } else {
      setId(num);
    }
  }, [router, params]);

  if (!id) {
    return null;
  }

  return <UserProfile userId={id} />;
}
