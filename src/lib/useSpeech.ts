import { useCallback, useEffect, useState } from "react";
import { createSpeechEngine, PlayingState, SpeechEngine } from "./speech";

const useSpeech = (sentences: Array<string>) => {
  const [activeSentence, setActiveSentence] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);

  const onBoundary = (e: SpeechSynthesisEvent) => {
    setCurrentWordIndex((prevIndex) => prevIndex + 1);
  };

  const onEnd = (e: SpeechSynthesisEvent) => {
    // setActiveSentence(activeSentence + 1)
  };

  const onStateUpdate = (state: PlayingState) => {
    if (state === "ended" && activeSentence < sentences.length) {
      setActiveSentence(activeSentence + 1);
      setCurrentWordIndex(-1);
    }
  };

  const { state, play, pause, cancel, load } = createSpeechEngine({
    onBoundary,
    onEnd,
    onStateUpdate,
  });

  useEffect(() => {
    setActiveSentence(0);
  }, [sentences]);

  useEffect(() => {
    if (sentences?.length) {
      load(sentences[activeSentence]);
    }
  }, [sentences, activeSentence]);

  useEffect(() => {
    if (state.utterance) {
      play();
    }
  }, [state]);

  return {
    currentWord: currentWordIndex,
    setCurrentWord: setCurrentWordIndex,
    setCurrentSentence: setActiveSentence,
    currentSentence: activeSentence,
    controls: {
      state,
      play,
      pause,
      cancel,
      load,
    },
  };
};

export { useSpeech };
