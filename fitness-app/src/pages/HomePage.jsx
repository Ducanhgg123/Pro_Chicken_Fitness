import { useSelector } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return <div>HomePage</div>;
}

export default HomePage;
