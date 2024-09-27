import { RestaurantState } from "@/store/restaurantSlice";
import { useState } from "react";

type LazyimageProps = {
  src: string | undefined;
  status: RestaurantState["detailStatus"];
}

export function Lazyimage ({ src, status }: LazyimageProps) {
  const [Isloading, setIsLoading] = useState(true);
  console.time();
  if (status === "idle" || status === "pending") {
    return "Loading..."
  }

  if (status === "rejected") {
    return "Error loading image"
  }


  return <>
    <p style={Isloading ? { display: "block" } : { display: "none" }}>Loading...</p>

    <img
      src={src}
      alt=""
      onLoad={() => setTimeout(() => setIsLoading(false), 1000)}
      style={Isloading ? { display: "none" } : { display: "block" }} />
  </>
}