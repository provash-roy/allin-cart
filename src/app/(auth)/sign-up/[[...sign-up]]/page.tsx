import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";

export default function Page() {
  return (
    <SignUp
      appearance={{
        theme: dark,
      }}
    />
  );
}
