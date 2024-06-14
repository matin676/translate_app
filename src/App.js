import { heroImg, logo } from "./assets";
import Container from "./components/Container";

function App() {
  return (
    <div className="w-full relative">
      <img
        src={logo}
        alt="logo"
        className="w-40 absolute m-auto justify-center inset-0 mt-20"
      />
      <img src={heroImg} alt="background img" className="w-full" />
      <Container />
    </div>
  );
}

export default App;
