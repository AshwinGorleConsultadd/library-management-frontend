import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Delete, Edit2 } from "lucide-react"
import CreateMemberDialog from "./create-member-dialog"
import UpdateMemberDialog from "./update-member-dialog"
import DeleteMemberDialog from "./delete-member-dialog"
import useGetMembers from "@/hooks/member/useGetMember"
import Spinner from "@/components/spinner"

export default function MemberPage() {
  const { data, loading } = useGetMembers()
  const [member, setMember] = useState({})
  const [openUpdate, setOpenUpdate] = useState(false)
  const [deleteMember, setDeleteMember] = useState({})
  const [openDelete, setOpenDelete] = useState(false)

  const handleUpdateMember = (member) => {
    setMember(member)
    setOpenUpdate(true)
  }

  const handleDeleteMember = (member) => {
    setDeleteMember(member)
    setOpenDelete(true)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <CreateMemberDialog />
      <UpdateMemberDialog member={member} open={openUpdate} setOpen={setOpenUpdate} />
      <DeleteMemberDialog member={deleteMember} open={openDelete} onClose={() => setOpenDelete(false)} />

      <Card className="p-4">
        {loading ? (
          <Spinner />
        ) : (
          <table className="w-full table-auto text-sm text-left">
            <thead>
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Edit</th>
                <th className="p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((member, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-2">{member.name}</td>
                  <td className="p-2">{member.email}</td>
                  <td className="p-2">{member.phone}</td>
                  <td className="p-2">
                    <Button variant="outline" onClick={() => handleUpdateMember(member)}>
                      <Edit2 size={18} />
                    </Button>
                  </td>
                  <td className="p-2">
                    <Button variant="outline" onClick={() => handleDeleteMember(member)}>
                      <Delete size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}
