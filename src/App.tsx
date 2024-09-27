import { useDispatch, useSelector } from "react-redux";
import { Banner, Navbar, SearchBar, Menu, ModalManager, Basket } from "@/components";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchRestaurantDetails, fetchRestaurantMenu } from "@/store/restaurantSlice";
import { useMediaQuery } from "@/hooks/useMediaQuery";
function App () {
  const dispatch = useDispatch<AppDispatch>();
  const lg = useMediaQuery("(min-width: 1024px)");
  const { detail, detailStatus, error } = useSelector.withTypes<RootState>()((state: RootState) => state.restaurant);
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

  if (detailStatus === "idle" || detailStatus === "pending") return <></>;
  if (error) return <div>Error: {error}</div>;

  return (

    <>
      <Navbar />
      <Banner />
      <div className="container">
        <div className="py-2">
          <SearchBar />

        </div>
        <div className="content">
          <Menu />
          {lg &&
            <div><Basket /></div>
          }


        </div>
      </div>
      <ModalManager />
    </>
  );
}

export default App
