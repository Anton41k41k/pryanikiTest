import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DocumentData } from "../../types/types";

const initialState: DocumentData[] = []

export const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
      initialApp(_state, action: PayloadAction<DocumentData[]>){
        return action.payload
      },
      addDocument(state, action: PayloadAction<DocumentData>){
        state.push(action.payload)
      },
      deleteDocument(state, action: PayloadAction<string>){
        return state.filter(document => document.id !== action.payload)
      },
      changeDocument(state, action: PayloadAction<DocumentData>){
        return state.map(document => document.id === action.payload.id ? {...action.payload} : document)
      },
      

  }
})

export default documentsSlice.reducer;