export type TDate = {
  intervals: number;
  interval: number;
  name: string;
  value: number 
};

export interface IDateSwitcher {
  date: TDate[];
  selectDate: (elem: TDate) => void;
  selectedDate: TDate;
}
