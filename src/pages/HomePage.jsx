import Header from "../components/Header";
import NewsFeeds from "../components/NewsFeeds";
import { Navigate } from "react-router-dom";

function HomePage() {
  if (!sessionStorage.getItem("jwt-token"))
    return <Navigate to="/login" replace={true} />;

  return (
    <>
      <Header />
      <NewsFeeds />
    </>
  );
}

export default HomePage;
