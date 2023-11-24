import { FormEvent, useRef } from 'react';

const UncontrolledFormPage = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const submitFormHandler = (event: FormEvent) => {
    event.preventDefault();

    const x = formRef.current?.elements.namedItem('name');
    console.log(formRef.current?.elements);
    if (x instanceof HTMLInputElement) {
      console.log(x.value);
    }
  };

  return (
    <>
      <h1>Uncontrolled Form Page</h1>

      <form
        onSubmit={submitFormHandler}
        ref={formRef}
        className="flex flex-col gap-4 items-start"
        autoComplete="on"
      >
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" autoComplete="username" id="name" />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input type="number" name="age" id="age" autoComplete="bday-year" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" autoComplete="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            id="confirmPassword"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select name="gender" autoComplete="sex" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="tc">Accept T&C:</label>
          <input
            type="checkbox"
            name="tc"
            defaultChecked
            autoComplete="on"
            id="tc"
          />
        </div>
        <div>
          <label htmlFor="image">upload image:</label>
          <input type="file" name="image" autoComplete="photo " id="image" />
        </div>
        <div>
          <label htmlFor="countries">Countries:</label>
          <select name="countries" autoComplete="country" id="countries">
            <option value="ru">Russia</option>
            <option value="by">Belarus</option>
            <option value="usa">USA</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledFormPage;
