import Link from 'next/link';
import React from 'react'

export default function MembersPage() {
  return (
    <>
        <h3 className='text-3xl'>This will be the members page.</h3>
        <Link href='/'>Go back home</Link>
    </>
  )
}
