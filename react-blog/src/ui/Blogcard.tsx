import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/ui/Card'

const SERVER_URL = import.meta.env.VITE_PUBLIC_SERVER_URL
type BlogPost = {
  _id: string;
  image: string;
  title: string;
  username: string;
  createdAt: Date | string;
  description: string;
};

const Blogcard = ({ post }: { post: BlogPost }) => {
  const dateStr = post.createdAt
  const date = new Date(dateStr);
  const formattedDate = date.toLocaleString();

  const navigate = useNavigate()

  const handleClick = async ()=>{
    navigate(`/blog/${post._id}`);
  }

  return (
    <div className='w-3/4 ml-24' style={{cursor:"pointer"}} onClick={handleClick}>

      <Card className="mb-6 overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start p-6">
          <CardContent className="p-0 flex-grow pr-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Published by {post.username}</span>
                <span className="text-xs text-muted-foreground">
                  published on {formattedDate}
                </span>
              </div>
            </div>

              <h2 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                {post.title}
              </h2>

            <p className="text-muted-foreground line-clamp-2">
              {post.description.length > 150
                ? `${post.description.substring(0, 150)}...`
                : post.description}
            </p>
          </CardContent>
          <div className="flex-shrink-0">
            <img
              src={`${SERVER_URL}/public/Images/${post.image}`}
              alt={post.title}
              className="rounded-md object-cover w-32 h-32"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Blogcard