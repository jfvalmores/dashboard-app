import OptionNode from './OptionNode';

export default interface SelectFieldProps {
  id: string;
  value: string;
  options: Array<OptionNode>;
  disabled?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}