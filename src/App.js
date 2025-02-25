import Directory from "./components/directory/directory.component";

const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
      imageUrl: "/images/hats.png"
    },
    {
      id: 2,
      title: 'Jackets',
      imageUrl: "/images/jackets.jpg"
    },
    {
      id: 3,
      title: 'Sneakers',
      imageUrl: "/images/sneakers.png"
    },
    {
      id: 4,
      title: 'Mens',
      imageUrl: "/images/mens.jpg"
    },
    {
      id: 5,
      title: 'Women',
      imageUrl: "/images/women.jpg"
    },
  ]
  return (
    <div className="App">
      <Directory categories={categories}/>
    </div>
  );
}

export default App;
