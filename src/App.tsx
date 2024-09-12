import { useDispatch, useSelector } from "react-redux";
import { Banner, Navbar, SearchBar } from "@/components";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchRestaurantDetails, fetchRestaurantMenu } from "@/store/restaurantSlice";

function App () {
  const dispatch = useDispatch<AppDispatch>();

  const { detail, status, error } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);
  useEffect(() => {
    dispatch(fetchRestaurantDetails())
    dispatch(fetchRestaurantMenu())
  }, [dispatch]);

  useEffect(() => {
    if (detail) {
      document.documentElement.style.setProperty('--primary-color', detail.webSettings.primaryColour);
      document.documentElement.style.setProperty('--primary-color-hover', detail.webSettings.primaryColourHover);

      document.documentElement.style.setProperty('--nav-background-color', detail.webSettings.backgroundColour);
    }

  }, [detail]);

  useEffect(() => {
    console.log({ status })
  }, [status]);


  if (status === "idle" || status === "pending") return <></>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <Banner />
      <div className="container my-2">
        <SearchBar />
      </div>

      <div className="container my-2">
      </div>


    </>
  );
}

export default App
