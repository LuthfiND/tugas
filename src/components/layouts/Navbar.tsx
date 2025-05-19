"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

const NavbarPage = () => {
  const router = useRouter();
  const authState = useAppSelector((state) => state.auth);
  const authenticated = authState?.isAuthenticated || false;
  const fullname = authState?.fullname;

  return (
    <nav className="w-full h-20 border-b border-[#DDDDDE] bg-white flex items-center justify-center">
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="text-[#4F4CEE] font-bold text-2xl whitespace-nowrap">
          KARCIS.COM
        </div>
        <div className="flex items-center gap-4">
          {!authenticated ? (
            <>
              <Button
                variant={"outline"}
                size={"lg"}
                className="px-4 py-2 text-sm md:text-base"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
              <Button
                variant={"main"}
                size={"lg"}
                className="px-4 py-2 text-sm md:text-base"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            </>
          ) : (
            <span className="text-sm md:text-base truncate max-w-[120px] md:max-w-xs">
              Halo, {fullname}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarPage;
