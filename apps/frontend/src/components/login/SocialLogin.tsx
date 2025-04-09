import { FacebookIcon } from '@/assets/icons/FacebookIcon'
import { GoogleIcon } from '@/assets/icons/GoogleIcon'
import { Button } from '@/components/shadcn/button'
import type { SocialLoginProps } from '@/types/Components'
import type { FC } from 'react'

export const SocialLogin: FC<SocialLoginProps> = ({
  handleGoogleLogin,
  handleFacebookLogin,
  facebookProviderEnabled,
  googleProviderEnabled,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {googleProviderEnabled && (
        <Button variant="outline" onClick={handleGoogleLogin} className="gap-3 w-full">
          <GoogleIcon className="w-4 h-4" />
          Google
        </Button>
      )}
      {facebookProviderEnabled && (
        <Button variant="outline" onClick={handleFacebookLogin} className="gap-3 w-full ">
          <FacebookIcon className="w-4 h-4 " />
          Facebook
        </Button>
      )}
    </div>
  )
}
