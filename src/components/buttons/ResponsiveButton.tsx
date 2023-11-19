import { IResponsiveButtonProps } from './buttonTypes';

const ResponsiveBtn = (props: IResponsiveButtonProps) => {
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
