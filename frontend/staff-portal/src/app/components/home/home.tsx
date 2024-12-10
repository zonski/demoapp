import { Button } from "@repo/web-kit/components/ui/button";
import { useTestData, useTestDataMutate } from "../../api/test.api";

export function Home() {
  const {data, error, isLoading} = useTestData();
  return (
    <div>
      <h1>Test Load</h1>
      <div>
        <div className='mb-4'>LOADING: {isLoading ? "yes" : "no"}</div>
        <div className='mb-4'>RESPONSE: <pre>{JSON.stringify(data)}</pre></div>
        <div>ERROR: <pre>{JSON.stringify(error)}</pre></div>
        <div>ERROR MS: <pre>{error?.message}</pre></div>
      </div>
      <HomeSubmit/>
    </div>
  )
} 

export function HomeSubmit() {
  const {mutate, data, error, isPending} = useTestDataMutate();

  const onSubmit = () => mutate("TEST");

  return (
    <div>
      <h1>Test POST</h1>
      <Button onClick={() => onSubmit()}>Click me</Button>
      <div>
        <div className='mb-4'>PENDING: {isPending ? "yes" : "no"}</div>
        <div className='mb-4'>RESPONSE: <pre>{JSON.stringify(data)}</pre></div>
        <div>ERROR: <pre>{JSON.stringify(error)}</pre></div>
        <div>ERROR MS: <pre>{error?.message}</pre></div>
      </div>
    </div>
  )
} 