import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button
        type="submit"
        className="w-full flex items-center gap-2 justify-center"
      >
        <GoogleLogo size={32} weight="bold" />
        Sign in
      </Button>
    </form>
  );
}
