import { useCallback, Dispatch, SetStateAction } from 'react';
import DatGui, { DatNumber } from 'react-dat-gui';
import { DatData } from '@/hooks/useAccessories';

type Props = {
  datData: DatData;
  setDatData: Dispatch<SetStateAction<DatData>>;
};

export function AccessoryGUI({ datData, setDatData }: Props) {
  const handleUpdate = useCallback((newData: DatData) => {
    setDatData((prev) => ({
      ...prev,
      rotation: {
        x: newData.rotation?.x ?? prev.rotation?.x,
        y: newData.rotation?.y ?? prev.rotation?.y,
        z: newData.rotation?.z ?? prev.rotation?.z,
      },
      position: {
        x: newData.position?.x ?? prev.position?.x,
        y: newData.position?.y ?? prev.position?.y,
        z: newData.position?.z ?? prev.position?.z,
      },
    }));
  }, []);
  return (
    <DatGui
      data={datData}
      onUpdate={handleUpdate}
      className="width-[300px] min-w-[300px] relative"
    >
      <DatNumber
        path="rotation.x"
        label="Rotate X"
        min={-3.14}
        max={3.14}
        step={0.01}
      />
      <DatNumber
        path="rotation.y"
        label="Rotate Y"
        min={-3.14}
        max={3.14}
        step={0.01}
      />
      <DatNumber
        path="rotation.z"
        label="Rotate Z"
        min={-3.14}
        max={3.14}
        step={0.01}
      />
      <DatNumber
        path="position.x"
        label="Position X"
        min={-100}
        max={100}
        step={0.01}
      />
      <DatNumber
        path="position.y"
        label="Position Y"
        min={-100}
        max={100}
        step={0.01}
      />
      <DatNumber
        path="position.z"
        label="Position Z"
        min={-100}
        max={100}
        step={0.01}
      />
    </DatGui>
  );
}
