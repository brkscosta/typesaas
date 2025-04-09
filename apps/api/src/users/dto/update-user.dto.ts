export class UpdateUserDto {
  id: string
  email: string | null
  emailVerified: Date | null
  name: string | null
  image: string | null
}
