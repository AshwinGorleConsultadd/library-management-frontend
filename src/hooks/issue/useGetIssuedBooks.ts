// hooks/issue/useGetIssuedBooks.ts
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getIssuedBooks } from "@/redux/services/issueReturnService"
import { RootState,AppDispatch } from "@/redux/store"
const useGetIssuedBooks = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useSelector(
    (state: RootState) => state.issueReturn.getIssuedBooks
  )
  
  useEffect(() => {
    dispatch(getIssuedBooks())
  }, [dispatch])

  useEffect(()=>{
    if(status == "pending"){
        setLoading(true);
    }else{
        setLoading(false)
    }
  },[dispatch, status])

  return {
    data,
    loading,
    error,
  }
}

export default useGetIssuedBooks
