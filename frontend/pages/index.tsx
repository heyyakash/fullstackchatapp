import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import Create from '@/components/Create'



export default function Home() {
  return(
    <Create />
  )
}
