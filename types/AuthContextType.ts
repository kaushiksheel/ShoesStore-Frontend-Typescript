import { UserType } from "./UserType"

export type AuthContextType={
currentUser?:UserType|null,
setCurrentUser:(currentUser:UserType|null)=>void
}