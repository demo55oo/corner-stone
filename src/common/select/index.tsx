import { SelectProps } from "@mui/material";
import { StyledSelect, StyledOption } from "./styles";

export type StyledSelectProps = {
  label: string;
  value: string;
  id?: string;
};

export interface StyledSelectArrayProps extends SelectProps {
  list: Array<StyledSelectProps>;
}

const SimpleSelect = ({
  list,
  onChange,
  value,
  ...props
}: StyledSelectArrayProps) => {
  return (
    <StyledSelect
      sx={props.sx}
      value={value}
      onChange={onChange}
      displayEmpty
      size="small"
    >
      <StyledOption value="" disabled>
        <em>{props.label}</em>
      </StyledOption>
      {list.map((val) => (
        <StyledOption sx={{ width: "100%" }} key={val.id} value={val.value}>
          {val.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default SimpleSelect;
