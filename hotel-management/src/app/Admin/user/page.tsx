
import { UserList } from "@/src/components/admin/User/UserList"
import React from "react"

export default function UserAdminPage(){
    return(
        <>
        <div className="flex-1 overflow-auto relative z-10">
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
           <UserList/>
            </main>
        </div>
        </>
    )
}