import React from 'react'
import CardStack from '../components/CardStack'
import CardStackControls from '../components/CardStackControls';

const items = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      content: <p>This is some content for John Doe's card.</p>,
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Product Manager",
      content: <p>This is some content for Jane Smith's card.</p>,
    },
    {
      id: 3,
      name: "Sam Johnson",
      designation: "Designer",
      content: <p>This is some content for Sam Johnson's card.</p>,
    },
    // Add more items as needed
  ];

export default function Home() {
    return (
        <div className="p-10">
          <CardStack items={items} />
          <CardStackControls/>
    

        </div>
      );
}
