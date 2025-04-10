
import React , {Suspense} from 'react'

import { getCollection } from '@/lib/shopify'

export default function page() {

    const bodyCollection = getCollection("body"); 
  return (
    <Suspense fallback={<div>Loading...</div>}>
        
    </Suspense>
  )
}
