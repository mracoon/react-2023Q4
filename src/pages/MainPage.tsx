import TilesList from '../components/Tiles/TilesList';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <h1>Main Page</h1>
      <TilesList />
    </div>
  );
};

export default MainPage;
