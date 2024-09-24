function SpotifyPage() {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">
        Currently Listening
      </h1>

      <p className="text-xl text-gray-700 leading-relaxed text-center mb-6">
        Check out what I’m listening to on Spotify!
      </p>

      {/* Spotify Follow Button */}
      <a
        href="https://open.spotify.com/user/iamthewill42"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-4 py-2 rounded-full text-xl"
      >
        Follow me on Spotify
      </a>
    </div>
  );
}

export default SpotifyPage;
