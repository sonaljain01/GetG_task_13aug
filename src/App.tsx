import React, { useEffect , useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import './App.css';

// Define the Zod schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords must match',
  path: ['confirmPassword']
});

// Define the TypeScript type based on the schema
type FormData = z.infer<typeof schema>;

const App: React.FC = () => {

  const count2Ref = useRef(0);


  useEffect(() => {
  
    alert("Welcome to my Website")

  }, [])


  // Initialize the form with Zod resolver
  const { register, handleSubmit, formState: { errors } , reset } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = data => {
    console.log(data);
    count2Ref.current++;
    reset();
  

  };

  return (
    <div className="App">
      <h1>Register Here</h1>
      <div className='container'>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <label>Enter Your Name : </label>
          <input
            {...register('name')}
            type="text"
            className="large-input"
            placeholder='Your Name'
          />
          {errors.name && <p>{errors.name.message}</p>}

          <label>Enter Your Email : </label>
          <input
            {...register('email')}
            type='email'
            className="large-input"
            placeholder='Your Email'
          />
          {errors.email && <p>{errors.email.message}</p>}

          <label>Enter Your Password : </label>
          <input
            {...register('password')}
            type="password"
            className="large-input"
            placeholder='Enter your Password'
          />
          {errors.password && <p>{errors.password.message}</p>}

          <label>Confirm Your Password : </label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="large-input"
            placeholder='Confirm your Password'
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

          <button className='button'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;