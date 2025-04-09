import { Body, Container, Head, Heading, Hr, Html, Img, Link, Preview, Text } from '@react-email/components'
import { render } from '@react-email/render'
import { env } from '@typesaas/env'
import type { SendMailOptions } from 'nodemailer'
import type { ComponentProps, JSX } from 'react'
import { sendEmail } from '../helpers/sendEmail'
import { codeStyle, container, footerText, heading, hr, main, paragraph } from './styles'

interface Props {
  url: string
  code: string
}

export const LoginCodeEmail = ({ url, code }: Props): JSX.Element => (
  <Html>
    <Head />
    <Preview>Your login code for TypeSaas</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${env.NEXTAUTH_URL}/images/logo.png`}
          width="32"
          height="32"
          alt="TypeSaas's Logo"
          style={{
            margin: '24px 0',
          }}
        />
        <Heading style={heading}>Your login code for TypeSaas</Heading>
        <code style={codeStyle}>{code}</code>
        <Text style={paragraph}>This code will only be valid for the next 5 minutes.</Text>
        <Text style={paragraph}>
          You can also sign in by <Link href={url}>clicking here</Link>.
        </Text>
        <Hr style={hr} />
        <Text style={footerText}>TypeSaas</Text>
      </Container>
    </Body>
  </Html>
)

LoginCodeEmail.PreviewProps = {
  url: 'https://localhost:3000',
  code: '654778',
} as Props

export default LoginCodeEmail

export const sendLoginCodeEmail = async ({
  to,
  ...props
}: Pick<SendMailOptions, 'to'> & ComponentProps<typeof LoginCodeEmail>): Promise<void> =>
  await sendEmail({
    to,
    subject: 'Sign in to TypeSaas',
    html: await render(<LoginCodeEmail {...props} />),
  })
