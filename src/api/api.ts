import { parse } from 'papaparse';

export interface AnimeCsv {
  id: string;
  title: string;
  titleJa: string;
  titleEn: string;
  image: string;
  mean: string;
  num_list_users: string;
  num_scoring_users: string;
  num_episodes: string;
  start_date: string;
  end_date: string;
  media_type: string;
  status: string;
  rating: string;
  average_episode_duration: string;
  genres: string;
  studios: string;
}

export async function getAnime() {
  const res = await fetch(
    'https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/anime.csv',
  );
  const text = await res.text();
  return parse<AnimeCsv>(text, { header: true, skipEmptyLines: true }).data;
}

export interface GenreCsv {
  id: string;
  name: string;
}

export async function getGenres() {
  const res = await fetch(
    'https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/genres.csv',
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
    'https://raw.githubusercontent.com/meesvandongen/anime-dataset/main/data/studios.csv',
  );
  const text = await res.text();
  return parse<StudioCsv>(text, { header: true, skipEmptyLines: true }).data;
}
