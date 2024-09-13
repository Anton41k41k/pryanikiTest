
export interface AuthorizationData {
  username: string,
  password: string
}

export interface AuthResponse {
data: {token: string},
error_code: number,
error_message: string,
profiling: string,
timings: null
}

export interface DocumentData {
companySigDate?:string,
companySignatureName?:string,
documentName?:string,
documentStatus?:string,
documentType?:string,
employeeNumber?:string,
employeeSigDate?:string,
employeeSignatureName?: string,
id?:string,
}

export interface FetchDataResponse {
data: DocumentData[],
error_code: number,
error_message: string,
profiling: string,
timings: null
}
export interface FetchPostResponse {
data: DocumentData,
error_code: number,
error_message: string,
profiling: string,
timings: null
}
