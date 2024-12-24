export type TExperience = {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  technologies?: string[];
  isActive: boolean;
};
