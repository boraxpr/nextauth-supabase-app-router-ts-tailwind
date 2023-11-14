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
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      id={id}
      type={type}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  </div>
);

export default Input;