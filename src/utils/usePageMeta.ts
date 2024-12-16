import { useEffect } from "react";

const usePageMeta = (title : string, description:string) => {
  useEffect(() => {
    // 타이틀 설정
    if (title) {
      document.title = title;
    }

    // 메타 태그 설정
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.name = "description";
        newMeta.content = description;
        document.head.appendChild(newMeta);
      }
    }
  }, [title, description]);
};

export default usePageMeta;
