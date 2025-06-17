import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useCreateBook from "@/hooks/book/useCreateBook"
import { Label } from "@radix-ui/react-label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  isbn: z.string().min(1, { message: "ISBN is required" }),
  total_copies: z.coerce.number().min(1, { message: "Must be at least 1" }),
  borrowed_copies: z.coerce
    .number()
    .min(0, { message: "Cannot be negative" })
    .refine((val, ctx) => {
      const total = ctx?.parent?.total_copies || 0
      return val <= total
    }, {
      message: "Borrowed copies must not exceed total copies"
    }),
})

const CreateBookDialog = () => {
  const { loading, handleCreateBook } = useCreateBook()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      total_copies: 1,
      borrowed_copies: 0,
    },
  })

  const onSubmit = (values: {
    title: string
    author: string
    isbn: string
    total_copies: number
    borrowed_copies: number
  }) => {
    handleCreateBook(values)
    form.reset()
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Books</h1>
      <Dialog>
        <DialogTrigger  asChild>
          <Button className="bg-black text-white">Create Book</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a new book</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl><Input placeholder="Enter book title" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl><Input placeholder="Enter author name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl><Input placeholder="Enter ISBN number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total_copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Copies</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="borrowed_copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Borrowed Copies</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="bg-black text-white" disabled={loading}>
                  {loading ? "Adding..." : "Add Book"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateBookDialog
