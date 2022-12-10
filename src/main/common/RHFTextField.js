import { Box, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const RHFTextField = (props) => {
  const { name, ...rest } = props;
  const { control } = useFormContext();
  return (
    <Box
      sx={{
        display: "flex",
        mt: 2,
        alignItems: "center",
      }}
    >
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <TextField
              value={value}
              error={Boolean(error)}
              helperText={error?.message}
              onChange={onChange}
              fullWidth
              {...rest}
            />
          );
        }}
      />
    </Box>
  );
};

export { RHFTextField };
