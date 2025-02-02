import Image from "next/image";
import Link from "next/link";
import { CiBookmarkCheck, CiServer, CiViewList } from "react-icons/ci";
import { LogoutButton, SidebarItem } from "@/components";
import { IoCode, IoPersonOutline } from "react-icons/io5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const menuItems = [
  {
    icon: <CiBookmarkCheck />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <CiViewList />,
    title: "Rest Todos",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <CiServer />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCode />,
    title: "Cookiess",
    path: "/dashboard/cookies",
  },
  {
    icon: <CiViewList />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  const avatarUrl = session?.user?.image
    ? session.user.image
    : "https://avatar.iran.liara.run/public/29";

  const userName = session?.user?.name ?? "No Name";

  return (
    <div>
      <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="#" title="home">
              {/* Next/Image */}
              <Image
                src="/images/logoipsum-244.svg"
                alt="tailus logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image
              src={avatarUrl}
              alt=""
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={40}
              height={40}
            />
            <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
              {userName}
            </h5>
            <span className="hidden text-gray-400 lg:block">Admin</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {menuItems.map((item) => (
              <SidebarItem key={item.path} {...item} />
            ))}
          </ul>
        </div>

        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
};
