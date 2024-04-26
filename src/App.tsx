import { useAnime, useGenres, useStudios, useUserAnime } from "./api/query";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import { useMemo } from "react";
import { Anime } from "./api/api";
import { MainMenu } from "./components/main-menu";
import { Anchor } from "@mantine/core";
import { getIsLoggedIn } from "./utils";

export default function App() {
  const { data: anime, isLoading: isAnimeLoading } = useAnime();
  const { data: genres, isLoading: isGenresLoading } = useGenres();
  const { data: studios, isLoading: isStudiosLoading } = useStudios();

  const isLoggedIn = getIsLoggedIn();

  const { data: userAnime, isLoading: isUserAnimeLoading } =
    useUserAnime(isLoggedIn);

  console.log(isUserAnimeLoading, userAnime);

  const userColumns = useMemo<MRT_ColumnDef<Anime>[]>(() => {
    if (!isLoggedIn) {
      return [];
    }

    if (isUserAnimeLoading) {
      return [];
    }

    if (!userAnime) {
      return [];
    }

    return [
      {
        id: "user_score",
        header: "User score",
        sortingFn: "basic",
        sortUndefined: -1,
        accessorFn: (row) => {
          const myAnime = userAnime[row.id];
          return myAnime?.score;
        },
      },
      {
        id: "user_finish_date",
        header: "Finish date",
        accessorFn: (row) => {
          const myAnime = userAnime[row.id];
          return myAnime?.finish_date;
        },
      },
      {
        id: "user_status",
        header: "User status",
        accessorFn: (row) => {
          const myAnime = userAnime[row.id];
          return myAnime?.status;
        },
      },
      {
        id: "user_num_episodes_watched",
        header: "Episodes watched",
        sortingFn: "basic",
        sortUndefined: -1,
        accessorFn: (row) => {
          const myAnime = userAnime[row.id];
          return myAnime?.num_episodes_watched;
        },
      },
      {
        id: "user_score_diff",
        header: "Score diff",
        sortingFn: "basic",
        sortUndefined: -1,
        accessorFn: (row) => {
          const myAnime = userAnime[row.id];
          if (!myAnime) {
            return undefined;
          }

          if (!myAnime.score) {
            return undefined;
          }

          if (row.mean === 0) {
            return undefined;
          }

          return +(myAnime.score - row.mean).toFixed(2);
        },
      },
    ];
  }, [isLoggedIn, userAnime, isUserAnimeLoading]);

  const columns = useMemo<MRT_ColumnDef<Anime>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 400,
        Cell: ({ renderedCellValue, row }) => (
          <Anchor
            fz="sm"
            href={`https://myanimelist.net/anime/${row.original.id}`}
            target="_blank"
          >
            {renderedCellValue}
          </Anchor>
        ),
      },
      {
        accessorKey: "titleJa",
        header: "Title (JA)",
        size: 400,
      },
      {
        accessorKey: "titleEn",
        header: "Title (EN)",
        size: 400,
      },
      {
        accessorKey: "image",
        header: "Image",
        Cell: ({ row }) =>
          row.original.image ? (
            <img
              style={{ width: 50, height: 50, objectFit: "cover" }}
              src={`https://cdn.myanimelist.net/images/anime/${row.original.image}.jpg`}
            />
          ) : null,
        enableColumnFilter: false,
      },
      {
        accessorKey: "mean",
        header: "Mean",
        filterVariant: "range",
      },
      {
        accessorKey: "rank",
        header: "Rank",
      },
      {
        accessorKey: "num_list_users",
        header: "Num list users",
        filterVariant: "range",
      },
      {
        accessorKey: "num_scoring_users",
        header: "Num scoring users",
        filterVariant: "range",
      },
      {
        accessorKey: "num_episodes",
        header: "Num episodes",
        filterVariant: "range",
      },
      {
        id: "start_date",
        header: "Start date",
        accessorFn: (row) => {
          return new Date(row.start_date);
        },
        filterVariant: "date-range",
        sortingFn: "datetime",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        accessorKey: "end_date",
        header: "End date",
        accessorFn: (row) => {
          return new Date(row.end_date || "2999");
        },
        filterVariant: "date-range",
        sortingFn: "datetime",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        accessorKey: "media_type",
        header: "Media type",
        filterVariant: "multi-select",
      },
      {
        accessorKey: "status",
        header: "Status",
        filterVariant: "multi-select",
      },
      {
        accessorKey: "rating",
        header: "Rating",
        filterVariant: "multi-select",
        filterFn: "arrIncludes",
      },
      {
        accessorKey: "average_episode_duration",
        header: "Average episode duration",
        Cell: ({ renderedCellValue }) => {
          const duration_minutes = Number(renderedCellValue);
          return `${Math.floor(duration_minutes / 60)}:${String(
            duration_minutes % 60,
          ).padStart(2, "0")}`;
        },
      },
      {
        header: "Genres",
        accessorFn: (row) =>
          (
            row.genres?.map(
              (genreId) =>
                genres?.find((genre) => genre.id === genreId)?.name ?? "",
            ) ?? []
          ).join(";"),
        Cell: ({ row }) => {
          return row.original.genres
            .map(
              (genreId) => genres?.find((genre) => genre.id === genreId)?.name,
            )
            .join(", ");
        },
        size: 500,
      },
      {
        id: "studios",
        accessorFn: (row) =>
          (
            row.studios?.map(
              (studioId) =>
                studios?.find((studio) => studio.id === studioId)?.name ?? "",
            ) ?? []
          ).join(", "),
        header: "Studios",
        filterFn: "contains",
        size: 500,
        Cell: ({ row }) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.5rem",
              }}
            >
              {row.original.studios.map((studioId, index) => {
                const studio = studios?.find(
                  (studio) => studio.id === studioId,
                );
                if (!studio) {
                  return null;
                }
                return (
                  <Anchor
                    fz="sm"
                    href={`https://myanimelist.net/anime/producer/${studio.id}`}
                    target="_blank"
                    key={studioId}
                  >
                    {studio.name}
                  </Anchor>
                );
              })}
            </div>
          );
        },
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      ...userColumns,
    ],
    [studios, genres, userColumns],
  );

  const table = useMantineReactTable({
    data: anime ?? [],
    columns,
    state: {
      isLoading:
        isAnimeLoading ||
        isGenresLoading ||
        isStudiosLoading ||
        (isLoggedIn ? isUserAnimeLoading : false),
      density: "xs",
    },
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: window.innerWidth < 768 ? [] : ["title"],
      },
    },
    positionGlobalFilter: "left",
    enableDensityToggle: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableFullScreenToggle: false,

    enableRowVirtualization: true,
    enableStickyHeader: true,
    enableColumnDragging: true,
    enableColumnOrdering: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableColumnFilterModes: true,
    enableGlobalFilterModes: true,
    enableGrouping: true,

    mantinePaperProps: {
      withBorder: false,
      style: {
        height: "100vh",
      },
    },
    mantineTableContainerProps: {
      style: {
        height: "100%",
      },
    },

    renderTopToolbarCustomActions: () => <MainMenu />,
  });

  return (
    <main>
      <MantineReactTable table={table}></MantineReactTable>
    </main>
  );
}
