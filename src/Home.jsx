import Quran from "./pages/Quran";
import AsmaUlHusna from "./pages/AsmaulHusna";
import HadithOfTheDay from "./pages/HadithoftheDay";
import IslamicQA from "./pages/IslamicQA";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <main className="home-main">
        <section className="home-section">
          <h2 className="home-section-title">Islamic Q&A</h2>
          <p className="home-section-description">
            Ask questions and get answers about Islam.
          </p>
          <IslamicQA />
        </section>
        <section className="home-section">
          <h2 className="home-section-title">Quran</h2>
          <p className="home-section-description">
            Read and reflect on verses from the Quran.
          </p>
          <Quran />
        </section>
        <section className="home-section">
          <h2 className="home-section-title">Daily Dua</h2>
          <p className="home-section-description">
            Learn a new supplication every day.
          </p>
          <AsmaUlHusna />
        </section>
        <section className="home-section">
          <h2 className="home-section-title">Hadith of the Day</h2>
          <p className="home-section-description">
            Discover a new Hadith every day.
          </p>
          <HadithOfTheDay />
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2025 Islamic AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
