import {Link} from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <Link to="/help" className="hover:text-gray-900">Help</Link>
            <Link to="/status" className="hover:text-gray-900">Status</Link>
            <Link to="/about" className="hover:text-gray-900">About</Link>
            <Link to="/careers" className="hover:text-gray-900">Careers</Link>
            <Link to="/press" className="hover:text-gray-900">Press</Link>
            <Link to="/blog" className="hover:text-gray-900">Blog</Link>
            <Link to="/privacy" className="hover:text-gray-900">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-900">Terms</Link>
            <Link to="/text-to-speech" className="hover:text-gray-900">Text to speech</Link>
            <Link to="/teams" className="hover:text-gray-900">Teams</Link>
          </nav>
        </div>
      </footer>
  )
}

