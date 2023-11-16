// Button.tsx

export default function Button({ customClasses, buttonContent, customFunction }: { customClasses?: string, buttonContent?: string, customFunction?: () => void }) {
  return (
    <button className={`bg-btn-background hover:bg-btn-background-hover ${customClasses}`} onClick={customFunction}>
      {buttonContent}
    </button>
  );
}