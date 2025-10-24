// Spotify API utilities
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const BASIC_AUTH = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

interface SpotifyTokenResponse {
  access_token: string;
}

interface SpotifyArtist {
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  name: string;
  artist: string;
  artistUrl: string;
  albumArt: string;
  songUrl: string;
  isPlaying: boolean;
  playedAt?: string;
  progressMs?: number;
  durationMs?: number;
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN || "",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export async function getNowPlaying(): Promise<SpotifyTrack | null> {
  try {
    const accessToken = await getAccessToken();

    // Try to get currently playing first
    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (
      nowPlayingResponse.status === 204 ||
      nowPlayingResponse.status === 404
    ) {
      // Nothing playing, get recently played
      const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!recentlyPlayedResponse.ok) {
        return null;
      }

      const recentData = await recentlyPlayedResponse.json();

      if (recentData.items && recentData.items.length > 0) {
        const track = recentData.items[0].track;
        return {
          name: track.name,
          artist: track.artists
            .map((artist: SpotifyArtist) => artist.name)
            .join(", "),
          artistUrl: track.artists[0]?.external_urls?.spotify || "",
          albumArt: track.album.images[0]?.url || "",
          songUrl: track.external_urls.spotify,
          isPlaying: false,
          playedAt: recentData.items[0].played_at,
        };
      }

      return null;
    }

    if (!nowPlayingResponse.ok) {
      return null;
    }

    const data = await nowPlayingResponse.json();

    if (!data.item) {
      return null;
    }

    return {
      name: data.item.name,
      artist: data.item.artists
        .map((artist: SpotifyArtist) => artist.name)
        .join(", "),
      artistUrl: data.item.artists[0]?.external_urls?.spotify || "",
      albumArt: data.item.album.images[0]?.url || "",
      songUrl: data.item.external_urls.spotify,
      isPlaying: data.is_playing,
      progressMs: data.progress_ms,
      durationMs: data.item.duration_ms,
    };
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return null;
  }
}
