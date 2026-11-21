import {
  Camera,
  Video,
  Cast,
  Earth,
  UserGroup,
  type LucideIcon
} from "lucide-react";

export type AboutListItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
};

export const useGetAboutList = (): AboutListItem[] => {
  return [
    {
      title: "Мировой уровень",
      subtitle: "Работа в ряде европейских стран",
      icon: Earth,
    },
    {
      title: "Команда",
      subtitle: "Лучшее оборудование и первоклассные специалисты",
      icon: UserGroup,
    },
    {
      title: "Фотосъёмка",
      subtitle: "Лучшие моменты в фото",
      icon: Camera,
    },
    {
      title: "Видеосъёмка",
      subtitle: "Ролики для соцсетей различного формата",
      icon: Video,
    },
    {
      title: "Трансляции",
      subtitle: "Трансляции высокого качества",
      icon: Cast,
    },
  ];
};
