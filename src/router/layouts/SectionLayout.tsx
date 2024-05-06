import { SectionsApisConfigProvider } from "@/lib/contexts/SectionApisConfig.context";
import { Outlet } from "react-router";
import { useParams, Navigate } from "react-router-dom";

export default function SectionLayout() {
  const sectionParam = useParams().section;

  if (
    sectionParam !== "games" &&
    sectionParam !== "movies" &&
    sectionParam !== "books"
  )
    return <Navigate to="/" replace={true} />;

  return (
    <SectionsApisConfigProvider section={sectionParam}>
      <div id={sectionParam}>
        <Outlet />
      </div>
    </SectionsApisConfigProvider>
  );
}
