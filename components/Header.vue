<template>
  <nav class="flex justify-between bg-gray-200">
    <div>
      <NuxtLink to="/"> Blog </NuxtLink>
      <NuxtLink to="/collections"> Collections </NuxtLink>
      <NuxtLink to="/drafts">Drafts</NuxtLink>
    </div>
    <div>
      <ToggleThemeButton class="mr-4 bg-transparent" />
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Avatar class="border-2 border-black">
            <AvatarImage :src="data.user.image" />
            <AvatarFallback><UserRound /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User class="w-4 h-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings class="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Github class="w-4 h-4 mr-2" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <LifeBuoy class="w-4 h-4 mr-2" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud class="w-4 h-4 mr-2" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem @click="handleLogOut">
            <LogOut class="w-4 h-4 mr-2" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script setup>
  import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
    UserRound,
  } from "lucide-vue-next"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

  // import { ToggleThemeButton } from "@/components"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  const {
    status,
    data,
    token,
    lastRefreshedAt,
    getSession,
    signUp,
    signIn,
    signOut,
  } = useAuth()

  const handleLogOut = async () => {
    useRouter().push("/login")
    await signOut()
  }
</script>

<style scoped>
  nav {
    padding: 1rem 2rem;
    align-items: center;
  }

  .bold {
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #000;
    display: inline-block;
  }

  .left a[data-active="true"] {
    color: gray;
  }

  a + a {
    margin-left: 1rem;
  }

  .right {
    margin-left: auto;
  }

  .right a {
    border: 1px solid black;
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
</style>
