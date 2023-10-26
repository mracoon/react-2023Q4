import { IconType } from 'react-icons/lib';

interface IRespBtnProps {
  classes?: string;
  text: string;
  icon: IconType;
  onClickHandler: () => void;
}

const ResponsiveBtn = (props: IRespBtnProps) => {
  return (
    <button
      className={`btn ${props.classes ?? ''}`}
      onClick={props.onClickHandler}
    >
      {<props.icon className="block sm:hidden" />}
      <span className="hidden sm:block">{props.text}</span>
    </button>
  );
};

export default ResponsiveBtn;
