import { exec } from 'child_process'
import { join, relative } from 'path'

const postgesqlSchemaPath = relative(process.cwd(), join(__dirname, `../postgresql/schema.prisma`))

const sqliteSchemaPath = relative(process.cwd(), join(__dirname, `../sqlite/schema.prisma`))

type Options = {
  force?: boolean
}

export const executePrismaCommand = (command: string, options?: Options) => {
  const databaseUrl = process.env.DATABASE_URL ?? (options?.force ? 'postgresql://' : 'file:./')

  if (!databaseUrl) {
    console.error('Could not find DATABASE_URL in environment')
    process.exit(1)
  }

  if (databaseUrl?.startsWith('file:')) {
    console.log('Executing for SQLite schema')
    return executeCommand(`${command} --schema ${sqliteSchemaPath}`)
  }

  if (databaseUrl?.startsWith('postgres://') || databaseUrl?.startsWith('postgresql://')) {
    console.log('Executing for PostgreSQL schema')
    return executeCommand(`${command} --schema ${postgesqlSchemaPath}`)
  }

  console.error('Invalid `DATABASE_URL` format, it should start with `postgresql://`, `postgres://` or file:./')
  process.exit(1)
}

const executeCommand = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message)
      return
    }
    if (stderr) {
      console.log(stderr)
      return
    }
    console.log(stdout)
  })
}
