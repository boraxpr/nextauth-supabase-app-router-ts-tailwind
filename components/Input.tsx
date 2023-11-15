// Input.tsx
type InputProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Input: React.FC<InputProps> = ({ label, id, type, value, onChange, disabled = false }) => (
  <div>
    <label htmlFor={id} className="block text-md font-bold mb-2">{label}</label>
    {disabled ?
      <input
        id={id}
        type={type}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className="bg-neutral-800 rounded-md bg-inherit border w-full py-2 px-4"
      /> : <input
        id={id}
        type={type}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className="rounded-md bg-inherit border w-full py-2 px-4"
      />}
  </div>
);

export default Input;