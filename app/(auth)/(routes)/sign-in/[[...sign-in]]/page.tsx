import { SignIn } from "@clerk/nextjs";

// DEPRECATED: Clerk component, нужно заменить на форму SingIn
export default function Page() {
  return <SignIn />;
}