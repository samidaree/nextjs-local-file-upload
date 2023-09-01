import Image from 'next/image'
import { Inter } from 'next/font/google'
import File from '@/components/file'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <File />
  )
}
