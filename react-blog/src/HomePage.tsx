import React, { useEffect, useState } from 'react'
import Navbar from './ui/Navbar'
import axios from 'axios'
import Blogcard from './ui/Blogcard'
import { request } from 'http'
const url = import.meta.env.VITE_PUBLIC_SERVER_URL as string

type Blog = {
  _id: string;
  image: string;
  title: string;
  username: string;
  createdAt: string;
  description: string;
};

const HomePage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    let isMounted = true;

    axios.get(`${url}/auth/fetchblogs`, { withCredentials: true })
      .then(response => {
        if (isMounted) {
          setBlogs(response.data.blogs);
        }
      })
      .catch(error => {
        console.error("Error fetching blogs:", error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  

  return (
    <div>
      <Navbar />
      <div className='my-12'>

        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <Blogcard key={blog._id} post={blog} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
