import { FC, memo } from "react";
import { Header } from "./header";
import { CToast } from "@/views/components/shared/toast";
interface LayoutProps {}

export const Layout: FC<LayoutProps> = memo(({children}) => {
  return (
    <div className="w-screen h-screen bg-black">
      <Header />
      <CToast />
      {children}
    </div>
  );
});
