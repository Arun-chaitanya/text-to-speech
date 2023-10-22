// Implement a component that provides basic UI options such as playing, pausing and loading new content
type ControlsType = {
  managePause: () => void;
  managePlay: () => void;
  manageFetchNewContent: () => void;
};
export const Controls = ({
  managePause,
  managePlay,
  manageFetchNewContent,
}: ControlsType) => {
  return (
    <div>
      <button onClick={managePause}>Pause</button>
      <button onClick={managePlay}>Play</button>
      <button onClick={manageFetchNewContent}>Load new content</button>
    </div>
  );
};
