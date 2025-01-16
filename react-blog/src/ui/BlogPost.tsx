import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from './Navbar'


type BlogPost = {
    _id: string
    title: string
    description: string
    image: string
    createdAt: string
    updatedAt: string
    createdBy: string
    username: string
}


const SERVER_URL = import.meta.env.VITE_PUBLIC_SERVER_URL

const BlogPostDisplay = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [blogData, setBlogData] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId")
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/auth/blog/${id}`, { withCredentials: true });

                setBlogData(response.data.blog);

            } catch (err) {
                console.error("Error fetching blog data:", err);
                toast.error('Failed to fetch blog data.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogData();
    }, [id]);

    const handleDelete = async () => {
        const confirmation = window.confirm('Are you sure you want to delete this blog?');
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.delete(`${SERVER_URL}/auth/deleteblog/${id}`, {
                withCredentials: true,
            });

            if (response.status === 200) {
                toast.success("Blog deleted successfully!");
                navigate("/homepage");
            } else {
                toast.error("Failed to delete the blog. Please try again.");
            }
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                toast.error("You are not authorized to delete this blog.");
            } else if (err.response && err.response.status === 404) {
                toast.error("Blog not found.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
            console.error("Error deleting blog:", err);
        }
    };

    const handleEdit =async ()=>{
        try {
            navigate(`/editblog/${id}`);
        } catch (error) {
            console.error("Error fetching blog data:", error);
            toast.error('Failed to fetch blog data.');
        }
    }


    if (!blogData) {
        return (
            <div>
                <Navbar />
                <p className="text-center text-red-500">Blog post not found.</p>
            </div>
        );
    }
    const dateStr = blogData.createdAt
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleString();


    return (
        <div>
            <Navbar />
            <Card className="max-w-5xl mx-auto my-8">
                <CardHeader>
                    <div className="relative w-full h-96 mb-4">
                        <img
                            src={`${SERVER_URL}/public/Images/${blogData.image}`}
                            alt={blogData.title}
                            className="object-cover w-full h-full"

                        />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{blogData.title}</h1>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>By {blogData.username}</span>
                        <span>Published on {formattedDate}</span>
                    </div>
                    {userId === blogData.createdBy && (
                        <div className="flex gap-4 mt-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleEdit}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="prose max-w-none">
                        {blogData.description.split(/\r?\n/).map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogPostDisplay

