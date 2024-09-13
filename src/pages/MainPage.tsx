import useAuthToken from "../hooks/useAuthToken";
import { useQuery } from "@tanstack/react-query";
import dataFetch from "../features/dataFetch";
import { FetchDataResponse } from "../types/types";
import { AxiosError } from "axios";
import { PATHS } from "../api/urls";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import Document from "../components/Document";
import { useAppDispatch } from "../hooks/reduxHooks";
import { documentsSlice } from "../store/reducers/documentsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";

export default function MainPage() {
  const path = PATHS.get;
  const { initialApp } = documentsSlice.actions;
  const dispatch = useAppDispatch();
  const documents = useSelector((state: RootState) => state.documents);
  const [token] = useAuthToken();
  const { data, isSuccess, isPending, isError } = useQuery<
    FetchDataResponse,
    AxiosError
  >({
    queryKey: ["fetchData"],
    queryFn: () => dataFetch({ path, token }),
    enabled: !!token,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(initialApp(data?.data));
    }
  }, [isSuccess, dispatch, data, initialApp]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ height: "100%" }}>
          <TableHead>
            <TableRow sx={{ "& *": { padding: "8px" } }}>
              <TableCell>companySigDate</TableCell>
              <TableCell>companySignatureName</TableCell>
              <TableCell>documentName</TableCell>
              <TableCell>documentStatus</TableCell>
              <TableCell>documentType</TableCell>
              <TableCell>employeeNumber</TableCell>
              <TableCell>employeeSigDate</TableCell>
              <TableCell>employeeSignatureName</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isSuccess &&
              documents.map((document) => (
                <Document key={document.id} {...document} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          mt: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {isPending && <CircularProgress />}
        {isError && (
          <Fragment>
            <Typography variant="h5">Что-то пошло не так...</Typography>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
}
