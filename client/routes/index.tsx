import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3 className="font-bold">Welcome Home!</h3>
      <p className="my-4">Click the buttons below to test the API</p>
      <div className="flex flex-col items-start gap-2">
      </div>
    </div>
  )
}
