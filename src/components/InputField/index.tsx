import React from 'react';
import { FieldInputProps, FieldMetaProps, useField } from 'formik';

interface InputFieldProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  options?: Array<{ value: string; label: string }>;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  value?: string;
  formik?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  options,
  onChange,
  value: externalValue,
  formik = true,
  ...props
}) => {
  let field: FieldInputProps<any> | null = null;
  let meta: FieldMetaProps<any> | null = null;

  if (formik) {
    [field, meta] = useField(props);
  }

  const inputClasses = `form-input w-full px-4 py-2 border rounded-md text-black ${
    meta && meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
  }`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (field) {
      field.onChange(e);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const inputProps = field || {
    name: props.name,
    onChange: handleChange,
    value: externalValue !== undefined ? externalValue : '',
  };

  return (
    <div className='mb-4'>
      <label className='block text-gray-700 font-semibold mb-1'>{label}</label>
      {props.type === 'select' ? (
        <select {...inputProps} {...props} className={inputClasses}>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...inputProps} {...props} className={inputClasses} />
      )}
      {meta && meta.touched && meta.error && (
        <p className='text-red-500 text-sm mt-1'>{meta.error}</p>
      )}
    </div>
  );
};

export default InputField;
