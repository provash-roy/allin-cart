import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

export default function Page() {
  return (
    <SignIn
      appearance={{
        theme: dark,
      }}
    />
  );
}
