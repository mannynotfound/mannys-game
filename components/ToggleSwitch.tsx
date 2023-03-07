import { twMerge } from 'tailwind-merge';

type Props = {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  disabled: boolean;
};

export default function ToggleSwitch({
  id,
  name,
  checked,
  onChange,
  disabled,
}: Props) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer select-none items-center"
    >
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={twMerge(
            'peer-checked:bg-green transition',
            'block h-[24px] w-[48px] rounded-full bg-[#bbb]'
          )}
        />
        <div
          className={twMerge(
            'peer-checked:translate-x-[24px] transition',
            'dot absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white'
          )}
        />
      </div>
    </label>
  );
}
