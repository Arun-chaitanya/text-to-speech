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
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    currentWord,
    setCurrentWord,
    setCurrentSentence,
    currentSentence,
    controls,
  } = useSpeech(sentences);

  useEffect(() => {
    setIsLoading(true);
    if (fetchNumber) {
      setIsPlaying(true);
    }
    (async () => {
      try {
        const ssml = await fetchContent();
        setSentences(parseContentIntoSentences(ssml));
        setCurrentWord(-1);
      } catch (e) {
        console.error("Error in fetching ssml: ", e);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchNumber]);

  useEffect(() => {
    if (currentSentence >= sentences.length) {
      setIsPlaying(false);
    }
  }, [currentSentence, sentences]);

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
              isPlaying={isPlaying}
              managePause={() => {
                controls.pause();
              }}
              managePlay={() => {
                setIsPlaying(!isPlaying);
                if (currentSentence >= sentences.length) {
                  setCurrentSentence(0);
                } else {
                  controls.load(
                    currentWord === -1
                      ? sentences[currentSentence]
                      : sentences[currentSentence]
                          .split(" ")
                          .slice(currentWord)
                          .join(" ")
                  );
                  currentWord !== -1 && setCurrentWord(currentWord);
                  controls.play();
                }
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
