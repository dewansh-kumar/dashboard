// eslint-disable-next-line react/prop-types
export const Button = ({ content, className, onClick, disabled }) => {
  return (
    <div className=" flex align-middle justify-center">
      <button className={className} onClick={onClick} disabled={disabled}>
        {content}
      </button>
    </div>
  );
};
