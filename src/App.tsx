import { useEffect, useState } from "react";
import "./App.css";
import { Controls } from "./components/Controls";
import { CurrentlyReading } from "./components/CurrentlyReading";
import { fetchContent, parseContentIntoSentences } from "./lib/content";
import { useSpeech } from "./lib/useSpeech";

function App() {
  const [sentences, setSentences] = useState<string[]>([]);
  const [fetchNumber, setFetchNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { currentWord, setCurrentWord, currentSentence, controls } =
    useSpeech(sentences);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const ssml = await fetchContent();
        setSentences(parseContentIntoSentences(ssml));
      } catch (e) {
        console.error("Error in fetching ssml: ", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchNumber]);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {sentences?.[currentSentence] && (
            <CurrentlyReading
              activeSentence={sentences?.[currentSentence]}
              activeWord={currentWord}
            />
          )}
          {!!sentences.length && (
            <p>
              {sentences
                .map((sentence) =>
                  sentence[sentence.length - 1] === "."
                    ? sentence
                    : sentence + "."
                )
                .join(" ")}
            </p>
          )}
          <div>
            <Controls
              managePause={() => {
                controls.pause();
              }}
              managePlay={() => {
                controls.load(sentences[currentSentence]);
                setCurrentWord(-1);
                controls.play();
              }}
              manageFetchNewContent={() => setFetchNumber(fetchNumber + 1)}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
