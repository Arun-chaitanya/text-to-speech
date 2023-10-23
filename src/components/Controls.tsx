// Implement a component that provides basic UI options such as playing, pausing and loading new content
type ControlsType = {
  isPlaying: boolean;
  managePause: () => void;
  managePlay: () => void;
  manageFetchNewContent: () => void;
};
export const Controls = ({
  isPlaying,
  managePlay,
  manageFetchNewContent,
}: ControlsType) => {
  return (
    <div>
      {/* <button onClick={managePause}>Pause</button> */}
      <button onClick={managePlay}>{isPlaying ? "Pause" : "Play"}</button>
      <button onClick={manageFetchNewContent}>Load new content</button>
    </div>
  );
};
