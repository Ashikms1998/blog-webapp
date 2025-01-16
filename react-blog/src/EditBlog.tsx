import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
const url = import.meta.env.VITE_PUBLIC_SERVER_URL as string

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

export default function EditBlog() {
  const navigate = useNavigate()
  const { id } = useParams();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [previewImage,setPreviewImage] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [blog,setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`${url}/auth/blog/${id}`, { withCredentials: true });
            setBlog(response.data.blog);

        } catch (err) {
            console.error("Error fetching blog data:", err);
            toast.error('Failed to fetch blog data.');
        }
    };

    fetchBlogData();
}, [id]);

useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setPreviewImage(blog.image);
    }
  }, [blog]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData();
      formData.append('id', id||"");
      formData.append('title', title);
      formData.append('description', description);
      if(image){
        formData.append('image', image);
      } else if (blog?.image) {
        formData.append('image', blog.image);
      }
     const response = await axios.put(`${url}/auth/updateblog`,formData,{
      headers: { 'Content-Type': 'multipart/form-data' },
       withCredentials:true
    })
    if (response.status === 200) {
        toast.success('Blog updated successfully!');
        navigate(`/blog/${id}`);
      }

    } catch (error:any) {
      console.error('Error submitting form:', error)
      toast.error(error.response?.data?.error || 'Failed to update blog');
    } finally {
      setIsLoading(false)
    }
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-50">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Update Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">{blog.title}</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{blog.description}</Label>
                <Textarea
                  id="description"
                  placeholder="Write your post description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[150px] w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Add Image</Label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                      className="w-full"
                    >
                      <ImagePlus className="w-4 h-4 mr-2" />
                      Choose Image
                    </Button>
                  </div>

                  {previewImage && (
                    <div className="relative aspect-video w-full">

                      <img
                        src={previewImage}
                        alt="Preview"
                        className={"object-cover rounded-lg"}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Update Post'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

