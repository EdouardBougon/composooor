// import CardComposooor from "./components/cardComposooor";
import CardComposooor from "./components/cardComposooor";
import CardSnap from "./components/cardSnap";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="z-10 inset-center flex gap-20">
        <CardComposooor />
        <CardSnap />
      </div>
      <div className="gradient"></div>
    </>
  );
}

export default App;
