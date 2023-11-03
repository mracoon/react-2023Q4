import { IconType } from 'react-icons/lib';

export interface IResponsiveButtonProps {
  classes?: string;
  text: string;
  icon: IconType;
  onClickHandler: () => void;
}
