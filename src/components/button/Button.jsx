function Button({ children, styles, width, ...attributes }) {
  return (
    <button
      type="button"
      className={`btn btn-primary text-white ${width == 100 ? "w-100" : ""}`}
      style={{
        borderRadius: "30px",
        transition: "all 0.3s ease",
        ...styles,
      }}
      {...attributes}
    >
      {children}
    </button>
  );
}

export default Button;
