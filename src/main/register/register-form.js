import { yupResolver } from "@hookform/resolvers/yup";
import { Box, FormHelperText, IconButton, InputAdornment } from "@mui/material";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../../service/auth-api";
import { registerValidationSchema } from "../../utils/schema";
import { RHFTextField } from "../common/RHFTextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo(
    () => ({
      email: "",
      username: "",
      password: "",
    }),
    []
  );
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(registerValidationSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (value) => {
    let from;
    try {
      const res = await authApi.register(
        value.email,
        value.username,
        value.password
      );
      if (res.isSuccess === 1) {
        from = location.state?.from?.pathName || "/";
        navigate(from, { replace: true });
      }
      setError("loginError", {
        type: "manual",
        message: res.message,
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          autoFocus
          fullWidth
          label="Email"
          margin="normal"
          name="email"
        />
        <RHFTextField
          autoFocus
          fullWidth
          label="Username"
          margin="normal"
          name="username"
        />
        <RHFTextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          InputProps={{
            type: showPassword ? "text" : "password",
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityIcon fontSize="medium" />
                  ) : (
                    <VisibilityOff fontSize="medium" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.loginError && (
          <Box sx={{ mt: 1.5 }}>
            <FormHelperText error>{errors.loginError.message}</FormHelperText>
          </Box>
        )}
        <Box sx={{ mt: 2 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Box>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
