import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../../utils/schema";
import toast from "react-hot-toast";
import { Box, FormHelperText, IconButton, InputAdornment } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { RHFTextField } from "../common/RHFTextField";
import { authApi } from "../../service/auth-api";
import { useLocation, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo(
    () => ({
      username: "",
      password: "",
    }),
    []
  );
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(loginValidationSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (value) => {
    let from;
    try {
      const res = await authApi.login(value.username, value.password);
      if (res.isSuccess === 1) {
        from = location.state?.from?.pathName || "/movie";
        navigate(from, { replace: true });
        toast.success("Login Success");
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
            Login
          </LoadingButton>
        </Box>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
