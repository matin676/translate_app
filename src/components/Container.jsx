import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  expandDown,
  horizontalTopLeft,
  soundMaxFill,
  sortAlfa,
  copy,
} from "../assets";

export default function Container() {
  const [inputText, setInputText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [charCount, setCharCount] = useState(inputText.length);
  const [targetLanguageLeft, setTargetLanguageLeft] = useState("en");
  const [targetLanguageRight, setTargetLanguageRight] = useState("fr");

  useEffect(() => {
    handleTranslate();
  }, [inputText, targetLanguageRight]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setCharCount(text.length);
  };

  const handleLanguageChangeLeft = (language) => {
    setTargetLanguageLeft(language);
  };

  const handleLanguageChangeRight = (language) => {
    setTargetLanguageRight(language);
  };

  const handleTranslate = async () => {
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${targetLanguageLeft}|${targetLanguageRight}`
      );
      setTranslatedText(response.data.responseData.translatedText);
    } catch (error) {
      console.error("Error translating text:", error);
      alert("Error translating text");
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(translatedText)
      .then(() => {
        alert("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the text: ", err);
      });
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSwap = () => {
    setInputText(translatedText);
    setTranslatedText(inputText);
    setTargetLanguageLeft(targetLanguageRight);
    setTargetLanguageRight(targetLanguageLeft);
    setCharCount(translatedText.length);
  };

  return (
    <div className="text-white flex justify-center items-center relative -mt-80 max-xl:-mt-40 max-lg:-mt-32 max-md:-mt-20 h-auto max-xl:flex-col">
      {/* Left Container --> Write to translate */}
      <div className="bg-smokyGray text-white w-full max-xl:w-880 max-lg:w-656 max-md:w-460 m-5 ml-32 max-xl:ml-5 border-[0.3px] border-trout rounded-2xl p-5">
        <ul className="flex text-trout font-semibold">
          <li className="p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg">
            Detect language
          </li>
          <li
            onClick={() => handleLanguageChangeLeft("en")}
            className={`p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
              targetLanguageLeft === "en" ? "bg-trout text-white" : ""
            }`}
          >
            English
          </li>
          <li
            onClick={() => handleLanguageChangeLeft("fr")}
            className={`p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
              targetLanguageLeft === "fr" ? "bg-trout text-white" : ""
            }`}
          >
            French
          </li>
          <li
            onClick={() => handleLanguageChangeLeft("es")}
            className={`flex p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
              targetLanguageLeft === "es" ? "bg-trout text-white" : ""
            }`}
          >
            <span className="pr-1">Spanish</span>
            <img src={expandDown} alt="down arrow" />
          </li>
        </ul>
        <hr className="mt-4 border-brightGray" />
        <div className="mt-4 relative">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            rows={8}
            maxLength={500}
            className="bg-transparent outline-none border-none placeholder:text-white resize-none w-full"
          ></textarea>
          <p className="absolute right-0 mb-2 text-xs text-trout font-semibold">
            {charCount}/500
          </p>
          <div className="flex justify-between mt-8">
            <div className="flex">
              <img
                onClick={() => handleSpeak(inputText)}
                src={soundMaxFill}
                alt="sound img"
                className="p-1 cursor-pointer border-2 border-trout rounded-xl mr-1 hover:border-geyser"
              />
              <img
                onClick={handleCopy}
                src={copy}
                alt="copy img"
                className="p-1 cursor-pointer border-2 border-trout rounded-xl ml-1 hover:border-geyser"
              />
            </div>
            <button
              onClick={handleTranslate}
              className="flex bg-royalBlue border-[0.5px] border-jordyBlue p-2 pl-4 pr-4 rounded-xl"
            >
              <img src={sortAlfa} alt="sort img" /> Translate
            </button>
          </div>
        </div>
      </div>

      {/* Right Container --> Translates here */}

      <div className="bg-midnightSmoke text-white w-full max-xl:w-880 max-lg:w-656 max-md:w-460 m-5 mr-32 max-xl:mr-5 border-[0.3px] border-trout rounded-2xl p-5">
        <ul className="flex justify-between text-trout font-semibold">
          <div className="flex">
            <li
              onClick={() => handleLanguageChangeRight("en")}
              className={`p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
                targetLanguageRight === "en" ? "bg-trout text-white" : ""
              }`}
            >
              English
            </li>
            <li
              onClick={() => handleLanguageChangeRight("fr")}
              className={`p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
                targetLanguageRight === "fr" ? "bg-trout text-white" : ""
              }`}
            >
              French
            </li>
            <li
              onClick={() => handleLanguageChangeRight("es")}
              className={`flex p-4 pt-1 pb-1 cursor-pointer hover:bg-trout hover:text-white rounded-lg ${
                targetLanguageRight === "es" ? "bg-trout text-white" : ""
              }`}
            >
              <span className="pr-1">Spanish</span>
              <img src={expandDown} alt="down arrow" />
            </li>
          </div>
          <div
            onClick={handleSwap}
            className="p-1 cursor-pointer border-2 border-trout rounded-lg hover:border-geyser"
          >
            <img src={horizontalTopLeft} alt="horizontal top left" />
          </div>
        </ul>
        <hr className="mt-4 border-brightGray" />
        <div className="mt-4 relative">
          <textarea
            value={translatedText}
            readOnly
            rows={8}
            maxLength={500}
            className="bg-transparent outline-none border-none placeholder:text-white resize-none w-full"
          ></textarea>
          <div className="flex mt-8">
            <img
              onClick={() => handleSpeak(translatedText)}
              src={soundMaxFill}
              alt="sound img"
              className="p-1 cursor-pointer border-2 border-trout rounded-xl mr-1 w-10 hover:border-geyser"
            />
            <img
              onClick={handleCopy}
              src={copy}
              alt="copy img"
              className="p-1 cursor-pointer border-2 border-trout rounded-xl ml-1 w-10 hover:border-geyser"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
