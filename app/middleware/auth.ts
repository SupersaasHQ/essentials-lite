import { toast } from 'vue-sonner'
export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession()
  if (!loggedIn.value) {
    toast.error('You must be logged in to access the app')
    return navigateTo('/login')
  }
})
