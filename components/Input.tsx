// Input.tsx
type InputProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  disabled = false,
}) => (
  <div>
    <label htmlFor={id} className="block text-md font-bold mb-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className={`rounded-md border w-full py-2 px-4 ${disabled ? "bg-gray-200 " : "bg-inherit"}`}
    />
  </div>
);

export default Input;
