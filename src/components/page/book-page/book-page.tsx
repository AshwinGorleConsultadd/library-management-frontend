import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import CreateBookDialog from "./create-book-dialog"
import useGetBooks from "@/hooks/book/useGetBooks"
import Spinner from "@/components/spinner"
import { Delete, Edit2 } from "lucide-react"
import UpdateBookDialog from "./update-book-dialog"
import DeleteBookDialog from "./delete-book-dialog"

interface Book {
  title: string;
  author: string;
  isbn: string;
  total_copies: number;
  available_copies: number;
  borrowed_copies: number;
}

export default function BookPage() {
 
  const {data,loading} = useGetBooks();
  const [book, setBook] = useState({});
  const [open, setOpen] = useState(false);
  const [openDeleteDiaglog, setOpenDeleteDialog] = useState(false);
  const [deleteBook , setDeleteBook] = useState({});

  const handleUpdateBook = (book)=>{
    setBook(book);
    setOpen(true);
  }
   
  const handleDeleteBook = (book) => {
    setDeleteBook(book);
    setOpenDeleteDialog(true);
  }

   return (
    <div className="p-6 max-w-6xl mx-auto">
      <CreateBookDialog/>
      <UpdateBookDialog book={book} open={open} setOpen={setOpen} />
      <DeleteBookDialog book={deleteBook} open={openDeleteDiaglog} onClose={setOpenDeleteDialog} />
      <Card className="p-4">
        { loading ? <Spinner/> :
        <table className="w-full table-auto text-sm text-left">
          <thead className="">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">ISBN</th>
              <th className="p-2">Total</th>
              <th className="p-2">Available</th>
              <th className="p-2">Borrowed</th>
              <th className="p-2" >Edit</th>
              <th className="p-2" >Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((book, idx) => (
              <tr key={idx} className="border-b">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">{book.isbn}</td>
                <td className="p-2">{book.total_copies}</td>
                <td className="p-2">{book.available_copies}</td>
                <td className="p-2">{book.borrowed_copies}</td>
                <td className="p-2"><Button variant="outline" onClick={()=>handleUpdateBook(book)}><Edit2 size={18}/></Button> </td>
                <td className="p-2"><Button variant="outline" onClick={()=>handleDeleteBook(book)}><Delete size={18}/></Button> </td>
              </tr>
            ))}
          </tbody>
        </table> 
}
      </Card>
    </div>
  )
}
