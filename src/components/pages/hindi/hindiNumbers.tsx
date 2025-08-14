import { useState } from "react";
import { hindiNumbers } from "../../../lib/hindi.constants";

const convertToHindi = (num: number): string => {
  if (hindiNumbers[num as keyof typeof hindiNumbers])
    return hindiNumbers[num as keyof typeof hindiNumbers];

  let result = "";
  if (num > 100 && num < 1000) {
    const hundreds = Math.floor(num / 100) * 100;
    const remainder = num % 100;
    result += hindiNumbers[hundreds as keyof typeof hindiNumbers] || "";
    if (remainder !== 0) {
      result += " " + convertToHindi(remainder);
    }
    return result;
  }

  return num.toString(); // fallback
};

const HindiNumbers = () => {
  const [number, setNumber] = useState(generateRandomNumber());
  //   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000); // 0–999
  }

  //   useEffect(() => {
  //     const loadVoices = () => {
  //       const availableVoices = window.speechSynthesis.getVoices();
  //       setVoices(availableVoices);
  //     };

  //     loadVoices();
  //     window.speechSynthesis.onvoiceschanged = loadVoices;
  //   }, []);

  const handleRead = () => {
    if ("speechSynthesis" in window) {
      console.log("yo");
      const hindiText = convertToHindi(number);
      console.log("Hindi Text:", hindiText);
      const utterance = new SpeechSynthesisUtterance(hindiText);
      utterance.lang = "hi-IN";

      const voices = window.speechSynthesis.getVoices();

      console.log("Available Voices:", voices);

      const hindiVoice = voices.find((v) => v.lang === "hi-IN");

      console.log(hindiVoice);

      if (hindiVoice) {
        console.log("Using Hindi voice:", hindiVoice.name);
        utterance.voice = hindiVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support speech synthesis.");
    }
  };

  return (
    <div
      style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}
    >
      <h1>रैंडम नंबर: {number}</h1>
      <button
        onClick={handleRead}
        style={{ padding: "10px 20px", fontSize: "16px", marginRight: "10px" }}
      >
        पढ़ें
      </button>
      <button
        onClick={() => setNumber(generateRandomNumber())}
        style={{ padding: "10px 20px", fontSize: "16px" }}
      >
        नया नंबर
      </button>
    </div>
  );
};

export default HindiNumbers;
