import { useState } from "react";
import "./index.css";
import words from "./words.json";

function App() {
  // console.log(words);
  const [filterData, setFilterData] = useState([]);
  const [resultExample, setResultExample] = useState([]);
  const [resultInfo, setResultInfo] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const handleFilter = (e) => {
    e.preventDefault();
    setShow1(true);
    const searchInput = e.target.value;
    const newFilter = words.filter((word) => {
      return word.toLowerCase().startsWith(searchInput);
    });
    setFilterData(newFilter);
  };

  // const handleWord = (word) => {
  //   console.log(word);
  // };

  const handleWord = async (word) => {
    await setFilterWord(word);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const fetchResult = await fetch(url).then((data) => {
      return data.json();
    });

    let tempResult;
    tempResult = fetchResult[0].meanings.map((e) =>
      e.definitions.map((a) => {
        return a.example;
      })
    );
    let resultExampleX = [...tempResult[0], ...tempResult[1]];
    console.log(resultExampleX);
    resultExampleX = resultExampleX.filter((e) => e !== undefined);
    await setResultExample(resultExampleX);

    tempResult = fetchResult[0].meanings.map((e) =>
      e.definitions.map((a) => {
        return a.definition;
      })
    );
    const resultInfoX = [...tempResult[0], ...tempResult[1]];
    await setResultInfo(
      `The word ${word} has origin of ${fetchResult[0].origin} And have definitions which are ${resultInfoX}`
    );
    // console.log(resultInfoX);
  };

  const EmptyDiv = () => {
    console.log("huhu");
    return (
      <div className="w-80 bg-white border border-gray-300 rounded-md mt-2 h-80" />
    );
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex h-screen items-center justify-center flex-col">
      <label className="relative block mb-4">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            width="24"
            height="24"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 15.5L19 19"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 11C5 14.3137 7.68629 17 11 17C12.6597 17 14.1621 16.3261 15.2483 15.237C16.3308 14.1517 17 12.654 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11Z"
              stroke="#9ca3af"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-gray-400 block w-80 border border-gray-300 rounded-md py-2 pl-12 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-lg"
          placeholder="Ketik huruf..."
          type="text"
          name="search"
          autoComplete="off"
          onChange={handleFilter}
        />
      </label>
      <div className="flex gap-6">
        {show1 ? (
          <div className="w-80 bg-white border border-gray-300 rounded-md mt-2">
            <div className="flex flex-col max-h-80 overflow-x-hidden overflow-y-visible w-full">
              {filterData.map((word, index) => {
                return (
                  <span
                    className="py-2 pl-12 hover:bg-gray-300 cursor-pointer active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300"
                    key={index}
                    onClick={() => handleWord(word)}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <EmptyDiv />
        )}
        {show2 || resultExample.length !== 0 ? (
          <div className="w-80 bg-white border border-gray-300 rounded-md mt-2 py-6 px-12 max-h-80 overflow-x-hidden overflow-y-visible">
            {/* <span className="py-2 cursor-pointer">{filterWord}</span> */}
            {resultExample.length !== 0 && (
              <div>
                <div className="">
                  <ul className="list-disc pb-5">
                    {resultExample.map((re, index) => {
                      return re !== "" ? <li key={index}>{re}</li> : null;
                    })}
                  </ul>
                  {/* <h2 className="text-lg font-semibold">Informations</h2>
                  <p>{resultInfo}</p> */}
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyDiv />
        )}
      </div>
    </div>
  );
}

export default App;
