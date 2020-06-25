export interface MiscellaneousProps {
  date: Date;
  onUpdate: (date: Date) => any;
  children?: React.ReactNode;
}

export interface ClassElement {
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  id: string;
  professorCode: string;
  professorName: string;
}
