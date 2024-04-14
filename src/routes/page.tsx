import { Helmet } from '@modern-js/runtime/head';
import { useAnime, useGenres, useStudios } from '@/api/query';
import { Table } from '@/components/table';
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { AnimeCsv } from '@/api/api';

const columnHelper = createColumnHelper<AnimeCsv>();

export default function Index() {
  const { data: anime } = useAnime();
  const { data: genres } = useGenres();
  const { data: studios } = useStudios();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
      }),
      columnHelper.accessor('title', {
        header: 'Title',
      }),
      columnHelper.accessor('titleJa', {
        header: 'Title (JA)',
      }),
      columnHelper.accessor('titleEn', {
        header: 'Title (EN)',
      }),
      columnHelper.accessor('image', {
        header: 'Image',
        cell: item => (
          <img
            style={{ width: 50, height: 50, objectFit: 'cover' }}
            src={`https://cdn.myanimelist.net/images/anime/${item.getValue()}.jpg`}
          />
        ),
      }),
      columnHelper.accessor('mean', {
        header: 'Mean',
      }),
      columnHelper.accessor('num_list_users', {
        header: 'Num list users',
      }),
      columnHelper.accessor('num_scoring_users', {
        header: 'Num scoring users',
      }),
      columnHelper.accessor('num_episodes', {
        header: 'Num episodes',
      }),
      columnHelper.accessor('start_date', {
        header: 'Start date',
      }),
      columnHelper.accessor('end_date', {
        header: 'End date',
      }),
      columnHelper.accessor('media_type', {
        header: 'Media type',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
      }),
      columnHelper.accessor('rating', {
        header: 'Rating',
      }),
      columnHelper.accessor('average_episode_duration', {
        header: 'Average episode duration',
      }),
      columnHelper.accessor('genres', {
        header: 'Genres',
        cell: item => {
          const genreIds = item.getValue()?.split(',') ?? [];
          return genreIds
            .map(genreId => genres?.find(genre => genre.id === genreId)?.name)
            .join(', ');
        },
      }),
      columnHelper.accessor('studios', {
        header: 'Studios',
        cell: item => {
          const studioIds = item.getValue()?.split(';') ?? [];
          return studioIds
            .map(
              studioId => studios?.find(studio => studio.id === studioId)?.name,
            )
            .join(', ');
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: anime ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="container-box">
      <Helmet>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
        />
        <title>My page title</title>
      </Helmet>
      <main>
        <Table table={table}></Table>
      </main>
    </div>
  );
}
