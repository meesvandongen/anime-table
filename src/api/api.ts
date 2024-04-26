import { parse } from "papaparse";

export interface AnimeCsv {
  id: string;
  title: string;
  titleJa: string;
  titleEn: string;
  image: string;
  mean: string;
  rank: string;
  num_list_users: string;
  num_scoring_users: string;
  num_episodes: string;
  start_date: string;
  end_date: string | undefined;
  media_type: string;
  status: string;
  rating: string;
  average_episode_duration: string;
  genres: string;
  studios: string;
}

export interface Anime {
  id: string;
  title: string;
  titleJa: string;
  titleEn: string;
  image: string;
  mean: number;
  rank: number;
  num_list_users: number;
  num_scoring_users: number;
  num_episodes: number;
  start_date: string;
  end_date: string | undefined;
  media_type: string;
  status: string;
  rating: string;
  average_episode_duration: number;
  genres: string[];
  studios: string[];
}

export async function getAnime() {
  const res = await fetch(
    "https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime.csv",
  );
  const text = await res.text();
  return parse<AnimeCsv>(text, { header: true, skipEmptyLines: true }).data.map(
    (anime): Anime => ({
      ...anime,
      genres: anime.genres?.split(";") ?? [],
      studios: anime.studios?.split(";") ?? [],
      mean: anime.mean ? Number(anime.mean) : 0,
      num_episodes: Number(anime.num_episodes),
      num_list_users: Number(anime.num_list_users),
      average_episode_duration: Number(anime.average_episode_duration),
      num_scoring_users: Number(anime.num_scoring_users),
      rank: Number(anime.rank || 99_999),
    }),
  );
}

export interface GenreCsv {
  id: string;
  name: string;
}

export async function getGenres() {
  const res = await fetch(
    "https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/genres.csv",
  );
  const text = await res.text();
  return parse<GenreCsv>(text, { header: true, skipEmptyLines: true }).data;
}

export interface StudioCsv {
  id: string;
  name: string;
}

export async function getStudios() {
  const res = await fetch(
    "https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/studios.csv",
  );
  const text = await res.text();
  return parse<StudioCsv>(text, { header: true, skipEmptyLines: true }).data;
}

export interface AnimeListItem {
  node: {
    id: number;
  };
  list_status: {
    status: string;
    score: number;
    num_episodes_watched: number;
    is_rewatching: boolean;
    updated_at: string;
    start_date?: string;
    finish_date?: string;
  };
}

export async function getUserAnime(): Promise<
  Record<string, AnimeListItem["list_status"]>
> {
  const res = await fetch("/api/animelist");
  const json: AnimeListItem[] = await res.json();
  return json.reduce((acc, { node, list_status }) => {
    acc[node.id.toString()] = list_status;
    return acc;
  }, {} as Record<string, AnimeListItem["list_status"]>);
}
