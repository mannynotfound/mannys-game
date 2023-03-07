export default function QuestMode() {
  return (
    <div
      id="frogger-game"
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="relative w-[480px] h-[640px]">
        <canvas
          id="frogger-canvas"
          className="absolute top-0 left-0 z-10 w-[480px] h-[640px]"
          height={1280}
          width={960}
        />
        <canvas
          id="frogger-background-canvas"
          className="absolute top-0 left-0 z-0 w-[480px] h-[640px]"
          height={1280}
          width={960}
        />
        <div className="absolute left-0 w-full text-center opacity-50 text-white bottom-[-30px]">
          Use Arrow Keys or WASD to Move.
        </div>
      </div>
    </div>
  );
}
