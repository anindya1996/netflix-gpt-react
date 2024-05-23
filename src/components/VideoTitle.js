const VideoTitle = ({ title, overview }) => {
  return (
    <div className="pt-[16%] md:px-24 px-12 absolute text-white bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="md:text-6xl text-2xl font-bold">{title}</h1>
      <p className="py-4 md:text-lg text-sm hidden md:inline-block md:w-[80%]">
        {overview}
      </p>
      <div className="my-4 md:m-0">
        <button className="bg-white p-[1px] pt-0  pb-[5px] text-black m-1 text-m rounded-lg w-28  font-semibold hover:bg-opacity-80 transition-all ">
          <span className="text-2xl"> ‣ </span> Play
        </button>
        <button className="bg-gray-600  p-[5px]  m-1 rounded-lg w-32 font-semibold bg-opacity-60 hover:bg-opacity-100 transition-all">
          <span className="text-lg p-[2px] ">ⓘ</span> More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
