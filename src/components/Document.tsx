import { TableCell, TableRow } from "@mui/material";
import { DocumentData } from "../types/types";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function Document(document: DocumentData) {
  const {
    companySigDate,
    companySignatureName,
    documentName,
    documentStatus,
    documentType,
    employeeNumber,
    employeeSigDate,
    employeeSignatureName,
    id,
  } = document;
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        "& *": { padding: "8px" },
      }}
    >
      <TableCell>{companySigDate}</TableCell>
      <TableCell>{companySignatureName}</TableCell>
      <TableCell>{documentName}</TableCell>
      <TableCell>{documentStatus}</TableCell>
      <TableCell>{documentType}</TableCell>
      <TableCell>{employeeNumber}</TableCell>
      <TableCell>{employeeSigDate}</TableCell>
      <TableCell>{employeeSignatureName}</TableCell>
      <TableCell>
        <EditButton {...document} />
      </TableCell>
      <TableCell>
        <DeleteButton id={id} />
      </TableCell>
    </TableRow>
  );
}
