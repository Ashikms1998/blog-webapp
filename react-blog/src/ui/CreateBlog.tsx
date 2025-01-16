import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ImagePlus, Loader2 } from 'lucide-react'
import Navbar from './Navbar'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const url = import.meta.env.VITE_PUBLIC_SERVER_URL as string

export default function PostForm() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [previewImage,setPreviewImage] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      formData.append('title', title);
      formData.append('description', description);
      if (!image) {
        toast.error('Please select an image');
        setIsLoading(false);
        return;
      }
      if(image){
        formData.append('image', image);
      }
     const response = await axios.post(`${url}/auth/createblog`,formData,{
      headers: { 'Content-Type': 'multipart/form-data' },
       withCredentials:true
    })
    console.log(response)
    if(response.status){
      navigate("/homepage")
    }

    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-50">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
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
                <Label htmlFor="description">Description</Label>
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
                  'Submit Post'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

