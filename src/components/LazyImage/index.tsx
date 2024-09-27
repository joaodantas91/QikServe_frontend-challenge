import { RestaurantState } from "@/store/restaurantSlice";

type LazyimageProps = {
  src?: string;
  status: RestaurantState["status"];
}

export function Lazyimage ({ src, status }: LazyimageProps) {


  if (status === "idle" || status === "pending") {
    return "Loading..."
  }

  if (status === "rejected" || !src) {
    return "Error loading image"
  }


  return <img src={src} alt="" />
}