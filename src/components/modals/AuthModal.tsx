import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AuthorizationData, AuthResponse } from "../../types/types";
import { useMutation } from "@tanstack/react-query";
import authFetch from "../../features/authFetch";
import { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { Fragment, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "white",
};

export default function AuthModal() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  function handleOpenModal() {
    setOpen(true);
  }
  function handleCloseModal() {
    setOpen(false);
  }
  const { handleSubmit, control, reset } = useForm<AuthorizationData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [, setCookie] = useCookies();
  const mutation = useMutation<AuthResponse, AxiosError, AuthorizationData>({
    mutationFn: authFetch,
    onSuccess: (response) => {
      if (response.error_message !== "OK") {
        throw new Error("Неправильно введен логин или пароль");
      } else {
        const token = response.data.token;
        setCookie("x-auth", token);
        reset();
        handleCloseModal();
        navigate("/");
      }
    },
  });

  const onSubmit: SubmitHandler<AuthorizationData> = (userData) => {
    mutation.mutate(userData);
  };
  return (
    <Fragment>
      <Button
        role="button"
        aria-pressed="false"
        onClick={handleOpenModal}
        sx={{ color: "white", ":hover": { backgroundColor: "transparent" } }}
      >
        LogIn
      </Button>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Авторизация</Typography>
            <IconButton onClick={handleCloseModal}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="Логин"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  type="password"
                  size="small"
                  label="Пароль"
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 2,
              }}
            >
              {mutation.isError && (
                <div style={{ color: "red" }}>
                  Error: {mutation.error.message}
                </div>
              )}
              {mutation.isPending && <CircularProgress size={25} />}
              <IconButton
                sx={{ width: "fit-content", alignSelf: "flex-end" }}
                type="submit"
                disabled={mutation.isPending}
              >
                <ArrowForwardIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Fragment>
  );
}
