import { FieldError } from 'react-hook-form';

type FormErrorTextProps = {
  field?: FieldError;
  text?: string;
};

const FormErrorText = ({ field, text }: FormErrorTextProps) => {
  return field ? (
    <div className="text-red-500 mt-1 text-sm whitespace-nowrap">
      {field?.message || text || 'This field is required'}
    </div>
  ) : null;
};

export default FormErrorText;
