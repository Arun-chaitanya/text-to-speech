type CurrentlyReadingType = {
  activeSentence?: string;
  activeWord: number;
};

export const CurrentlyReading = ({
  activeSentence,
  activeWord,
}: CurrentlyReadingType) => {
  if (!activeSentence) {
    return null;
  }

  const words = activeSentence.split(" ");

  return (
    <div className="currently-reading">
      <p>
        <b>Active Sentence: </b>
        {words.map((word, index) =>
          index === activeWord ? (
            <span key={index} style={{ color: "red" }}>
              {word}{" "}
            </span>
          ) : (
            `${word} `
          )
        )}
      </p>
    </div>
  );
};
