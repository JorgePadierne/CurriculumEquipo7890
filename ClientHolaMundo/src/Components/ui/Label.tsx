function Label({
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label {...props} className="block text-sm/6 font-medium text-gray-900">
      {children}
    </label>
  );
}

export { Label };
export default Label;
