import { CustomInput } from './CustomInput';

const AcceptTC = ({
  errorMessage,
  inputRef,
}: {
  errorMessage?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="flex flex-col items-start justify-start w-full form-item">
      <CustomInput
        lableText="Accept T&C"
        inputType="checkbox"
        name="tc"
        inputId="tc"
        inputRef={inputRef}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default AcceptTC;
