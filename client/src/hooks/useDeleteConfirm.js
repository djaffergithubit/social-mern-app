import { useEffect, useState } from "react"

export const useDeleteConfirm = () => {
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(true)

    useEffect(() => {
        console.log('delete confirm', openDeleteConfirm);
    }, [openDeleteConfirm])

    return [openDeleteConfirm, setOpenDeleteConfirm]
}