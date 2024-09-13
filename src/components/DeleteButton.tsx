import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { DocumentData, FetchPostResponse } from "../types/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import postFetch, { PostData } from "../features/postFetch";
import useAuthToken from "../hooks/useAuthToken";
import { PATHS } from "../api/urls";
import { useAppDispatch } from "../hooks/reduxHooks";
import { documentsSlice } from "../store/reducers/documentsSlice";
import { Fragment } from "react/jsx-runtime";
export default function DeleteButton({
  id,
}: Pick<DocumentData, "id"> & undefined) {
  const dispatch = useAppDispatch();
  const { deleteDocument } = documentsSlice.actions;
  const [token] = useAuthToken();
  const { mutate, isIdle, isPending } = useMutation<
    FetchPostResponse,
    AxiosError,
    PostData
  >({
    mutationFn: postFetch,
    onSuccess: (response) => {
      if (response.error_message !== "OK") {
        throw new Error("Не удалось удалить документ");
      }

      dispatch(deleteDocument(id));
    },
    onError: (error) => alert(error.message),
  });
  function handleDeleteDocument() {
    const path = PATHS.delete + id;
    mutate({ path, token });
  }
  return (
    <Fragment>
      {isIdle && (
        <IconButton onClick={handleDeleteDocument}>
          <DeleteIcon fontSize="large" />
        </IconButton>
      )}
      {isPending && <CircularProgress size="large" />}
    </Fragment>
  );
}
