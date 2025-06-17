export interface BookType {
  id: number
  title: string
  author: string
  isbn: string
  total_copies: number
  borrowed_copies: number
  available_copies: number
}

export interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
}