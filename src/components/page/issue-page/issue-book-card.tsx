import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import useGetBooks from "@/hooks/book/useGetBooks"
import useGetMembers from "@/hooks/member/useGetMember"
import useIssueBook from "@/hooks/issue/useIssueBook"
import Spinner from "@/components/spinner"

export default function IssueBookCard() {
  const { data: books, loading: booksLoading } = useGetBooks()
  const { data: members, loading: membersLoading } = useGetMembers()
  const { handleIssueBook, loading: issueLoading } = useIssueBook()

  const [selectedBook, setSelectedBook] = useState("")
  const [selectedMember, setSelectedMember] = useState("")
  const [bookSearch, setBookSearch] = useState("")
  const [memberSearch, setMemberSearch] = useState("")

  const filteredBooks = books?.filter(book =>
    book.title.toLowerCase().includes(bookSearch.toLowerCase())
  )

  const filteredMembers = members?.filter(member =>
    member.name.toLowerCase().includes(memberSearch.toLowerCase())
  )

  const handleIssue = () => {
    if (selectedBook && selectedMember) {
      handleIssueBook({ book_id: selectedBook, user_id: selectedMember })
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto p-6 border border-gray-300 shadow-md rounded-2xl bg-white dark:bg-[#111]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          📚 Issue Book to Member
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Dropdown */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-700 dark:text-gray-200">Select Member</Label>
          <Input
            placeholder="Search member..."
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
          />
          <ScrollArea className="max-h-40 border rounded-md p-2 bg-background">
            {membersLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              filteredMembers?.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`px-3 py-1 cursor-pointer rounded-md text-sm ${
                    selectedMember === member.id
                      ? " bg-slate-300 text-black"
                      : "hover:bg-muted"
                  }`}
                >
                  {member.name}
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Book Dropdown */}
        <div className="flex flex-col gap-2">
          <Label className="text-gray-700 dark:text-gray-200">Select Book</Label>
          <Input
            placeholder="Search book..."
            value={bookSearch}
            onChange={(e) => setBookSearch(e.target.value)}
          />
          <ScrollArea className="max-h-40 border rounded-md p-2 bg-background">
            {booksLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              filteredBooks?.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  className={`px-3 py-1 cursor-pointer rounded-md text-sm ${
                    selectedBook === book.id
                      ? " bg-slate-300 text-black"
                      : "hover:bg-muted"
                  }`}
                >
                  {book.title}
                </div>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <Button
            className="w-full mt-4"
            onClick={handleIssue}
            disabled={!selectedBook || !selectedMember || issueLoading}
          >
            {issueLoading ? <Spinner/> : "Allocate" }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
