export interface DataTable {
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  limit: number;
  content:any[];
  totalRecords: number;
  // first:number;
  //status:boolean| string;
}
