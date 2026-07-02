import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import VendorRegister from "../vendor/vendor-register";
export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white h-16">
      <h2>AlliNCart</h2>
      <div className="flex items-center space-x-4">
        <VendorRegister />
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </Show>
      </div>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
