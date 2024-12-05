import { handleOAuthSuccess } from '@@/server/utils/oauth'

interface GoogleOAuthUser {
  sub: string
  given_name: string
  family_name: string
  picture: string
  email: string
}

const mapGoogleUser = (user: GoogleOAuthUser) => ({
  email: user.email,
  name: `${user.given_name} ${user.family_name}`.trim(),
  avatarUrl: user.picture,
  provider: 'google' as const,
  providerUserId: user.sub,
})

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    try {
      await handleOAuthSuccess(event, mapGoogleUser(user))
    } catch (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Authentication failed',
      })
    }
  },
})
