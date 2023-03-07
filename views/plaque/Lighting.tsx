export default function Lighting() {
  return (
    <>
      <pointLight
        color={0xffffff}
        position={[0, 40, 80]}
        power={14}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        color={0xffffff}
        position={[0, 40, -80]}
        power={14}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        color={0xffffff}
        intensity={0.25}
        castShadow
        shadow-camera-top={180}
        shadow-camera-right={120}
        shadow-camera-bottom={-100}
        shadow-camera-left={-120}
        position={[0, 240, 100]}
      />
    </>
  );
}
