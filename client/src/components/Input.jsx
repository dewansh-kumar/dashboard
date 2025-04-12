// eslint-disable-next-line react/prop-types
export const Input = ({
  type,
  placeholder,
  className,
  onChange,
  name,
  onFocus,
}) => {
  return (
    <div className="flex align-middle justify-center">
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
      />
    </div>
  );
};
