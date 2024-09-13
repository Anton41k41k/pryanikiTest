import EditIcon from "@mui/icons-material/Edit";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  CircularProgress,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Fragment, useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import useAuthToken from "../hooks/useAuthToken";
import { DocumentData, FetchPostResponse } from "../types/types";
import postFetch, { PostData } from "../features/postFetch";
import { PATHS } from "../api/urls";
import { useAppDispatch } from "../hooks/reduxHooks";
import { documentsSlice } from "../store/reducers/documentsSlice";

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

export default function EditButton({
  companySigDate,
  companySignatureName,
  documentName,
  documentStatus,
  documentType,
  employeeNumber,
  employeeSigDate,
  employeeSignatureName,
  id,
}: DocumentData) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { changeDocument } = documentsSlice.actions;
  function handleOpenModal() {
    setOpen(true);
  }
  function handleCloseModal() {
    setOpen(false);
  }
  const { handleSubmit, control, reset } = useForm<DocumentData>({
    defaultValues: {
      companySignatureName,
      documentName,
      documentStatus,
      documentType,
      employeeNumber,
      employeeSignatureName,
    },
  });
  const [token] = useAuthToken();
  const mutation = useMutation<FetchPostResponse, AxiosError, PostData>({
    mutationFn: postFetch,
    onSuccess: (response) => {
      if (response.error_message !== "OK") {
        throw new Error("Ошибка отправки, попробуйте ещё раз");
      }
      dispatch(changeDocument(response.data));
      reset();
      handleCloseModal();
    },
  });

  const onSubmit: SubmitHandler<DocumentData> = (documentData) => {
    const path = PATHS.set + id;
    documentData.companySigDate = companySigDate;
    documentData.employeeSigDate = employeeSigDate;
    mutation.mutate({ path, token, documentData });
  };
  return (
    <Fragment>
      <IconButton onClick={handleOpenModal}>
        <EditIcon fontSize="large" />
      </IconButton>
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
            <Typography variant="h5">Редактировать</Typography>
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
              name="companySignatureName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="companySignatureName"
                />
              )}
            />
            <Controller
              name="documentName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="documentName"
                />
              )}
            />
            <Controller
              name="documentStatus"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="documentStatus"
                />
              )}
            />
            <Controller
              name="documentType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="documentType"
                />
              )}
            />
            <Controller
              name="employeeNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="employeeNumber"
                />
              )}
            />
            <Controller
              name="employeeSignatureName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ ":focus": { color: "white", borderColor: "white" } }}
                  required
                  fullWidth
                  size="small"
                  label="employeeSignatureName"
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
