import Tile from '../components/Tiles/Tile';

const MainPage = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4">
      <h1>MainPage</h1>
      <Tile isRHFTile={true}></Tile>
      <Tile isRHFTile={false}></Tile>
    </div>
  );
};

export default MainPage;
