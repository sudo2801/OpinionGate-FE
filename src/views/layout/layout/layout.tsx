import { FC, memo } from "react";
import { Header } from "./header";
import { CToast } from "@/views/components/shared/toast";
import { useLocation } from "react-router-dom";
interface LayoutProps {}

export const Layout: FC<LayoutProps> = memo(({ children }) => {
  const {pathname} = useLocation() 

  return (
    <div className="w-screen h-screen bg-black">
      {(pathname !== "/" && pathname !== "/register") && <Header />}
      <CToast />
      {children}
    </div>
  );
});
