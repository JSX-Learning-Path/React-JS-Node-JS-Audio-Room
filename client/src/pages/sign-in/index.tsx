import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  username: string;
  name: string;
}

function SignIn() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .matches(/^[a-zA-Z0-9]+$/, "Invalid Username"),
    name: yup.string().required("Name is required"),
  });

  const onSubmit: SubmitHandler<FormValues> = (data, e) => {
    e.preventDefault();
    const { username, name } = data;
    console.log(username, name);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-200 text-gray-900">
      <h1 className="text-3xl text-center font-bold mb-5  bg-gradient-to-l from-taupe-700/80 to-gray-700 bg-clip-text text-transparent md:text-4xl ">
        Welcome to my Sign In Page
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 mt-6"
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            {...register("username")}
            id="username"
            name="username"
            required
            className="border border-gray-800 rounded px-2 py-1 w-full "
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            {...register("name")}
            id="name"
            name="name"
            required
            className="border border-gray-800 rounded px-2 py-1 w-full "
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-taupe-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-taupe-600 transition-colors duration-300 mt-2"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
