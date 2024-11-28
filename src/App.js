// fake APIs 
// https://jsonplaceholder.typicode.com/todos
//https://jsonplaceholder.typicode.com/posts

import './App.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function App() {
  // ! [1] first part is fetching the Data
  // TODO we have to create a query key with unique key to distinguish it in all queries.
  // TODO querykey is an array because we can pass multiple keys 
  // ? React Query handles every thing after getting the data like errors and loading ... Not fetching Data   
  // TODO there a many of things that we can get from useQuery like isLoading, data,isFetching ,error  

  // const { data, error,isLoading,isFetching } = useQuery({
  //   queryKey: ['todo'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/todos')
  //       .then((res) => res.json()),
  // })
  // console.log(data)
  // console.log("error",error)
  // console.log("isFetching",isFetching)
  // console.log("isLoading",isLoading)


  // ! [2] mutation Data
  // TODO with mutation data (add new data) we have to pass the newData into the post funcion
  // TODO we have to pass three argument into the fetch, API, and this object { method (POST), body(stringify the newData) } 
  // TODO useMutation provides many of things like mutate funcion , isSuccess, isError, isPending === isLoading

  // const { data, isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
  // })

  // console.log("isLoading",isLoading)

  // const { mutate } = useMutation({
  //   mutationFn: (newPost) =>
  //     fetch('https://jsonplaceholder.typicode.com/posts', {
  //       method: 'POST',
  //       body: JSON.stringify(newPost),
  //       headers:{"content-type":"application/json; cahrset=UTF-8"}
  //     })
  //       .then(res => res.json()),
  // })

  //! caching 

  // const queryClient= useQueryClient()
  // const { data, isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
  // })

  // console.log("isLoading",isLoading)

  // const { mutate } = useMutation({
  //   mutationFn: (newPost) =>
  //     fetch('https://jsonplaceholder.typicode.com/posts', {
  //       method: 'POST',
  //       body: JSON.stringify(newPost),
  //       headers:{"content-type":"application/json; cahrset=UTF-8"}
  //     })
  //       .then(res => res.json()),
  //       onSuccess:(newPost)=>{
  // TODO this is will just refetch the data without display them in page  
  // queryClient.invalidateQueries({queryKey:'posts'})
  // TODO this is will refech and display the data on the page 
  // TODO the 'oldPosts' is the current state and the callback function will return the old posts with the new one. 
  // TODO this way will edit the query cache manually 
  //         queryClient.setQueryData(['posts'],(oldPosts)=>[...oldPosts,newPost ])
  //       },
  // })
  // ! stale time & refetchInterval & gcTime
  // this is the way to handle the
  // TODO stale time is in milliseconds and it the length of the time you are accepting that query to be as it is.
  // TODO stale queries will refetched automatically (after the Time elapses) when: 
  //? [1] new instance on the query is mounted 
  //? [2] the window is refocused after switching taps (nav to another tap and back to the app tap)
  //? [3] the network is reconnected 
  //? [4] the query is optoinally configured  
  // TODO refetchInterval will refetch the data after the Time elapses (after 4s) in milliseconds 
  // TODO gcTime stands for garbage collection time and this is the way to delete unnecessary data from in our cache
  // TODO the best practice for these commands is set them in index.js file as a defaultOptions 

  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json()),

  // TODO we putted them as a defaultOptions 
    // staleTime: 6000,
    // refetchInterval:1000,
    // gcTime:5*60*1000,  // 5 minutes 

  })

  console.log("isLoading", isLoading)

  const { mutate } = useMutation({
    mutationFn: (newPost) =>
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { "content-type": "application/json; cahrset=UTF-8" }
      })
        .then(res => res.json()),
    onSuccess: (newPost) => {
      // TODO this is will just refetch the data without display them in page  
      // queryClient.invalidateQueries({queryKey:'posts'})
      // TODO this is will refech and display the data on the page 
      // TODO the 'oldPosts' is the current state and the callback function will return the old posts with the new one. 
      // TODO this way will edit the query cache manually 
      queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
    },
  })



  //! dependent queries (first query depends on the second one)

  // const queryClient = useQueryClient()
  // const { data , isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
  //   refetchInterval: 1000,
  // })
  // const id = data.id;
  // const { myData } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
  //   refetchInterval: 1000,
  // TODO this command means the query will only execute as long as the id is true and not null or false 
  // TODO !!id => id != false && id != null
  //   enabled: !!id,
  // })

  // const { mutate } = useMutation({
  //   mutationFn: (newPost) =>
  //     fetch('https://jsonplaceholder.typicode.com/posts', {
  //       method: 'POST',
  //       body: JSON.stringify(newPost),
  //       headers: { "content-type": "application/json; cahrset=UTF-8" }
  //     })
  //       .then(res => res.json()),
  //   onSuccess: (newPost) => {
  //     // TODO this is will just refetch the data without display them in page  
  //     // queryClient.invalidateQueries({queryKey:'posts'})
  //     // TODO this is will refech and display the data on the page 
  //     // TODO the 'oldPosts' is the current state and the callback function will return the old posts with the new one. 
  //     // TODO this way will edit the query cache manually 
  //     queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
  //   },
  // })



  //! an idea to disable refetching when window is refocused 
  // const { data, isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
  // TODO that means after 6 second and window is refocused, refetch the data
  //   staleTime: 6000,
  // TODO to prevent this action we can use refetchOnWindowFocus or refetchOnReconnect ...etc
  //   refetchOnWindowFocus: false,


  //! retry 

  // TODO we use it to reattempt number of attemps fetching data if it failured.  
  // const { data, isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () =>
  //     fetch('https://jsonplaceholder.typicode.com/posts')
  //       .then((res) => res.json()),
        // TODO it means retry 10 times before get an failure error 
  //   retry:10,

  // })

  //! best practices 
  // TODO define the Query functions outside the query to be in the future maintainable
  return (
    <div className="App">
      {isLoading && <div>data is loading ...</div>}
      <button onClick={() => mutate({
        "userId": 5000,
        "id": 5000,
        "title": "Hey I'm Osama",
        "body": 'this '
      })}>add post</button>
      {data?.map(todo =>
        <div key={todo.id}>
          <h4>{todo.id}</h4>
          <h4>{todo.title}</h4>
          <p>{todo.body}</p>
        </div>)}
    </div>
  );
}

export default App;
