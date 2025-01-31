export interface IIdentity {
  user_id: string
  provider: string
  isSocial: boolean
  connection: string
}

export interface IUserProfile {
  name: string
  picture: string
  updated_at: string
  email: string
  created_at: string
  username: string
  user_id: string
  email_verified: boolean
  nickname: string
  identities: IIdentity[]
  last_login: string
  last_ip: string
  logins_count: number
}
