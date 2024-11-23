export interface ICategory {
  id?: string;
  type: string;
  name: string;
}

export interface ICategoryForm {
  type: string;
  name: string;
}

export interface ICategoryApi {
  [category: string]: ICategory;
}


export interface ITransaction {
  id?: string;
  time: string;
  categoryName: string;
  amount: number;
  type: 'income' | 'expense';
}